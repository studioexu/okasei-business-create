<script context="module">
</script>

<script lang="ts">
	import { inputIsValid } from '@/libs/customerValidations'
	import { toCamelCase } from '@/libs/formatters'

	export let placeholder: string = ''
	export let value: string = ''
	export let name: string
	export let label: string = ''
	export let unit: string = ''
	export let inputSize: string = ''
	export let isValid: boolean = true
	export let required: boolean = false
	export let errorMsg: string = ''
	export let functionOnBlur: Function | null = null

	/**
	 * Check if the value of the input is valid, when the focus is not on the input.
	 * @param e
	 */
	const handleBlurInput = (e: any) => {
		const input = e.target.value
		isValid = inputIsValid(toCamelCase(name), input)

		if (functionOnBlur) {
			value = functionOnBlur(input)
		}
	}
</script>

<div class="input-wrapper {isValid ? '' : 'error'}">
	{#if label}
		<label class="label" for={name}>
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}

	<input
		type="text"
		class="input {inputSize}"
		id={name}
		{name}
		{placeholder}
		bind:value
		on:blur={handleBlurInput}
		on:focus={() => (isValid = true)}
	/>
	<span class="font-error">{errorMsg}</span>

	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}
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

		.label {
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 31px;
		}
		.input {
			&--sm {
				@include responsiveInputWidth((103));
				width: 103px;
			}
			&--md {
				@include responsiveInputWidth((152));
			}
			&--lg {
				@include responsiveInputWidth((359));
			}
			&--xl {
				@include responsiveInputWidth((534));
			}

			height: 31px;
			&::placeholder {
				color: rgb(206, 205, 205);
			}
			&:focus {
				border-color: var(--primary-color);
			}
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
