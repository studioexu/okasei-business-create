<script lang="ts">
	import { checkIfInputIsNumber } from '@/libs/customerValidations'

	export let placeholder: string = ''
	export let value: number = 0
	export let name: string
	export let label: string = ''
	export let unit: string = ''
	export let isValid: boolean = true
	export let required: boolean = false
	export let disabled: boolean = false

	/**
	 * Check if the value of the input is valid, when the focus is not on the input.
	 * @param e
	 */
	const handleBlurInput = (e: any) => {
		const input = e.target.value

		if (required) {
			isValid = checkIfInputIsNumber(input)
		}
	}
</script>

<div class="input-wrapper {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label class="label" for={name}>
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}
	<input
		type="number"
		class="input"
		id={name}
		min="0"
		{name}
		{disabled}
		{placeholder}
		bind:value
		on:blur={handleBlurInput}
		on:focus={() => (isValid = true)}
	/>
	<span class="unit">{unit}</span>
	<span class="font-error">数字で入力して下さい</span>
</div>

<style lang="scss">
	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		.label {
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 31px;
		}

		.input {
			width: 105px;
			text-align: right;
			&::placeholder {
				color: var(--placeholder);
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
			opacity: 0;
		}
	}

	.error {
		.input {
			transition: border 300ms;
			border-color: var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.font-error {
			opacity: 1;
			transition: all 300ms;
		}
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
