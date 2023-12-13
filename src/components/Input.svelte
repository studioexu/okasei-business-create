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

		&:first-child {
			.label {
				width: 130px;
			}
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
		}

		.font-error {
			position: absolute;
			right: 0;
			bottom: -14px;
			font-size: 10px;
			opacity: 0;
		}
	}
</style>
