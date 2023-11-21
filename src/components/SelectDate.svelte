<script lang="ts">
	export let name: string
	export let label: string = ''
	export let options: string[] = []

	export let value: string = ''
</script>

<div class="input-wrapper">
	<select {name} id={name} class="select" bind:value>
		<option value="" selected disabled class="placeholder">未選択</option>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>

	<label for={name}>
		{label}
	</label>
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
		width: calc(((103 - 10 - 2) / 1366) * 100vw);
		height: 31px;

		&:focus {
			border-color: var(--primary-color);
		}

		&:required:invalid {
			color: #969696;
		}

		option[value=''][disabled] {
			display: none;
		}
	}
</style>
