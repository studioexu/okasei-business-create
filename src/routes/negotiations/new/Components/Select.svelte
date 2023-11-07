<script lang="ts">
	export let type: string = ''
	export let name: string
	export let label: string = ''
	export let options: string[] = []

	export let value: string = ''
</script>

<div class="input-wrapper">
	{#if type !== 'date' && label.length !== 0}
		<label class="label" for={name}>
			{label}
		</label>
	{/if}

	<select {name} id={name} class="select" bind:value>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>

	{#if type === 'date' && label.length !== 0}
		<label for={name}>
			{label}
		</label>
	{/if}
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		gap: 12px;

		&:first-child {
			.label {
				width: 130px;
			}
		}
	}
	.select {
		height: 32px;
		width: calc(((106 - 10 - 2) / 1366) * 100vw);
		padding-left: 10px;
		font-size: 18px;
		border: 1px solid var(--gray);
		border-radius: 8px;

		&:focus {
			border-color: var(--primary-color);
		}
	}
</style>
