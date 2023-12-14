<script lang="ts">
	import { checkIfInputIsNumber } from '@/libs/customerValidations'

	export let placeholder: string = ''
	export let value: number = 0
	export let name: string
	export let label: string = ''
	export let unit: string = ''
	export let isValid: boolean = true
	export let required: boolean = false
	export let errorMsg: string = ''
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
		{name}
		{required}
		min="0"
		bind:value
		on:blur={handleBlurInput}
		on:focus={() => (isValid = true)}
		{disabled}
	/>
	<span class="unit">{unit}</span>
	<span class="font-error">{errorMsg}</span>
</div>

<style lang="scss">
	.input-wrapper {
		width: fit-content;

		.input {
			width: 105px;
			text-align: right;
		}
	}
</style>
