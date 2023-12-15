<script lang="ts">
	export let value: string | number | boolean
	// export let options: string[] = [' ']
	export let options: { value: number | string | boolean; text: string }[]
	export let label: string = ''
	export let unit: string = ''
	export let name: string = ''
	export let isValid: boolean = true
	export let errorMsg: string = ''
	export let required: boolean = false
</script>

<div class="input-wrapper {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label class="label" for={name}>
			{label}
			<span class="required-mark">{required ? '*' : ''}</span>
		</label>
	{/if}

	<select class="select" id={name} bind:value>
		{#each options as option}
			<option value={option.value}>{option.text}</option>
		{/each}
	</select>
	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}

	<span class="font-error">{errorMsg}</span>
</div>

<style lang="scss">
	.input-wrapper {
		.select {
			width: calc(((103 - 10 - 2) / 1366) * 100vw);
			height: 31px;
			font-size: 18px;
			color: var(--black);

			&:focus {
				border-color: var(--primary-color);
			}
		}

		.unit {
			height: 32px;
			display: flex;
			align-items: center;
		}
	}

	.error {
		.select {
			border-color: var(--error);
		}
	}
</style>
