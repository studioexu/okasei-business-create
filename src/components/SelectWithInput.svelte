<script lang="ts">
	import { toCamelCase } from '@/utils/customers/formatter'

	export let label: string = ''
	export let placeholder: string = ''
	export let errorMsg: string = ''
	export let unit: string = ''
	export let name: string = ''
	export let datas: string[] = []
	export let value: string = ''
	export let required: boolean = false
	export let isValid: boolean = true

	import { inputIsValid } from '@/utils/customers/validations'

	const handleChange = (e: any) => {
		const input = e.target.value

		isValid = inputIsValid(toCamelCase(name), input)
	}

	const checkValueOnChange = (value: string) => {
		if (!isValid) {
			isValid = inputIsValid(name, value)
		}
	}

	$: checkValueOnChange(value)
</script>

<div class="input-wrapper {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label for={name} class="label">
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}

	<input
		class="input"
		id={name}
		{name}
		autocomplete="off"
		list="{name}s"
		on:blur={handleChange}
		on:click={() => (value = '')}
		bind:value
		{placeholder}
	/>

	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}

	<datalist id="{name}s" class="datalist">
		{#each datas as data}
			<option class="option" value={data}>{data}</option>
		{/each}
	</datalist>

	<span class="font-error">{errorMsg}</span>
</div>

<style lang="scss">
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
			height: 32px;
			display: flex;
			align-items: center;
		}

		.input {
			width: calc(((103 - 10 - 2) / 1366) * 100vw);
			padding: 8px 0;
			padding-left: 10px;

			&::placeholder {
				color: rgb(206, 205, 205);
			}

			&:focus {
				border-color: var(--primary-color);
			}
		}

		.font-error {
			position: absolute;
			right: 0;
			bottom: -14px;
			font-size: 10px;
			text-align: right;
			opacity: 0;
		}

		.unit {
			display: flex;
			align-items: center;
		}
	}

	.error {
		.input {
			transition: border 300ms;
			border: 1.5px solid var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.font-error {
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
