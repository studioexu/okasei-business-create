<script lang="ts">
	import { toCamelCase } from '@/libs/formatters'
	import { createEventDispatcher } from 'svelte'

	export let label: string = ''
	export let placeholder: string = ''
	export let errorMsg: string = ''
	export let unit: string = ''
	export let name: string = ''
	export let value: string = ''
	export let list: string[]

	export let required: boolean = false
	export let isValid: boolean = true

	const dispatch = createEventDispatcher()

	import { inputIsValid } from '@/libs/customerValidations'

	const handleChange = (e: any) => {
		const input = e.target.value
		isValid = inputIsValid(toCamelCase(name), input)
	}

	const checkValueOnChange = (value: string) => {
		if (!isValid) {
			isValid = inputIsValid(name, value)
		}

		dispatch('select', { value: value })
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
		list="{name}s"
		autocomplete="off"
		{placeholder}
		{name}
		on:blur={handleChange}
		on:click={() => (value = '')}
		bind:value
	/>

	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}

	<datalist id="{name}s" class="datalist">
		{#each list as option}
			<option class="option" value={option} />
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

		// .input {
		// 	width: 105px;
		// }

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
</style>
