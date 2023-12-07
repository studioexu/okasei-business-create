<script lang="ts">
	import { toCamelCase } from '@/libs/formatters'

	export let label: string = ''
	export let placeholder: string = ''
	export let errorMsg: string = ''
	export let unit: string = ''
	export let name: string = ''
	export let datas: string[] = []
	export let value: string = ''
	export let required: boolean = false
	export let isValid: boolean = true

	import { inputIsValid } from '@/libs/customerValidations'

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
		.label {
			height: 32px;
			display: flex;
			align-items: center;
		}

		.input {
			width: calc(((152 - 10 - 2) / 1366) * 100vw);
			// width: 150px;
		}

		.unit {
			display: flex;
			align-items: center;
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
