<script lang="ts">
	import { checkIfInputIsNumber, inputIsValid } from '@/libs/customerValidations'
	import { toCamelCase } from '@/libs/formatters'

	export let placeholder: string = ''
	export let value: number = 0
	export let name: string
	export let label: string = ''
	export let unit: string = ''
	export let isValid: boolean = true
	export let required: boolean = false
	export let errorMsg: string = ''

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
	<label class="label" for={name}>
		{label}
		<span class="required-mark">{required ? '*' : ''}</span>
	</label>
	<input
		required
		type="number"
		class="input"
		id={name}
		{name}
		bind:value
		on:blur={handleBlurInput}
		on:focus={() => (isValid = true)}
	/>
	<span class="unit">{unit}</span>
	<span class="font-error">{errorMsg}</span>
</div>

<style lang="scss">
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		// &:first-child {
		// 	.label {
		// 		width: 140px;
		// 	}
		// }

		.input {
			&::placeholder {
				color: rgb(206, 205, 205);
			}

			&:focus {
				border-color: var(--primary-color);
			}

			@include responsiveInputWidth((103));
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
