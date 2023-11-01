<script lang="ts">
	export let label: string = ''
	export let placeholder: string = ''
	export let errorMsg: string = ''
	export let unit: string = ''
	export let dataType: string = ''
	export let datas: string[] = []
	export let value: string = ''

	export let required: boolean = false
	export let isValid: boolean = true

	import { inputIsValid } from '@/routes/customers/utils/validations'

	const handleChange = (e: any) => {
		const input = e.target.value

		isValid = inputIsValid(dataType, input)
	}

	const checkValueOnChange = (value: string) => {
		if (!isValid) {
			isValid = inputIsValid(dataType, value)
		}
	}

	$: checkValueOnChange(value)
</script>

<div class="input-wrapper {dataType} {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label for={dataType} class="label">
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}

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

		&:first-child {
			.label {
				width: 130px;
			}
		}

		.label {
			width: max-content;
		}

		.input {
			height: 32px;
			width: calc(((106 - 10 - 2) / 1366) * 100vw);
			padding-left: 10px;

			&:focus {
				border-color: var(--primary-color);
			}
		}

		.error-msg {
			position: absolute;
			right: 0;
			bottom: -14px;
			color: var(--error);
			font-size: 10px;
			font-weight: 600;
			min-width: 250px;
			text-align: right;
			opacity: 0;
		}
	}

	.error {
		.input {
			transition: border 300ms;
			border: 1.5px solid var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.required-mark {
		color: var(--error);
	}

	@keyframes buzz {
		0% {
			transform: translateX(0px);
		}

		50% {
			transform: translateX(-10px);
		}

		100% {
			transform: translateX(10px);
		}
	}
</style>
