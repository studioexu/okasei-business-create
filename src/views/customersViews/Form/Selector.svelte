<script lang="ts">
	export let dataType: string = ''
	export let datas: string[] = []
	export let value: string = ''
	export let unit: string = ''
	export let label: string = ''
	export let required: boolean = false
	export let isValid: boolean = true
	export let labelClass: string = ''
	export let placeholder: string = ''
	export let classInput: string = ''
	export let errorMsg: string = ''

	import { inputIsValid } from '@/routes/customers/utils/validations'

	const handleChange = (e: any) => {
		const input = e.target.value

		isValid = inputIsValid(dataType, input)
	}

	const checkValueOnChange = (value: string) => {
		if (!isValid) {
			isValid = inputIsValid(labelClass, value)
		}
	}

	$: checkValueOnChange(value)
</script>

<div class="input-wrapper {dataType} {isValid ? '' : 'error'} {classInput}">
	{#if label !== ''}
		<label for={dataType} class="label {labelClass}">{label}{required ? '*' : ''}</label>
	{/if}

	<div class="input-w">
		<input
			class="input"
			id={dataType}
			name={dataType}
			autocomplete="off"
			list="{dataType}s"
			on:blur={handleChange}
			on:click={() => (value = '')}
			bind:value
			{placeholder}
		/>

		{#if unit !== ''}
			<span class="unit">{unit}</span>
		{/if}

		<datalist id="{dataType}s" class="datalist">
			{#each datas as data}
				<option class="option" value={data}>{data}</option>
			{/each}
		</datalist>

		<span class="error-msg">{errorMsg}</span>
	</div>
</div>

<style lang="scss">
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}
	.input-wrapper {
		display: flex;
		gap: 10px;
		position: relative;
		align-self: center;
		margin-bottom: 20px;
	}

	.mb-0 {
		margin-bottom: 0;
	}
	.input {
		height: 32px;
		@include responsiveInputWidth((114));
		border-radius: 3px;
		padding-left: 10px;
		font-size: 1rem;
		border: 1px solid rgb(206, 205, 205);
		border-radius: 3px;

		&:focus {
			border-color: #2fa8e1;
		}
	}

	.option:hover {
		background-color: lightblue;
	}

	.error {
		.input {
			border: 1.5px solid #f55d3e;
		}
	}

	.label {
		width: max-content;
		font-size: 18px;
		font-weight: 500;

		&-width {
			&--md {
				min-width: 74px;
			}
			&--lg {
				min-width: 130px;
			}
		}
	}

	.error-msg {
		position: absolute;
		right: 0;
		bottom: -14px;
		color: #f55d3e;
		font-size: 10px;
		font-weight: 600;
		min-width: 250px;
		text-align: right;
		opacity: 0;
	}

	.error {
		.input {
			transition: border 300ms;
			border: 1.5px solid #f55d3e;
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.input-w {
		position: relative;
	}
</style>
