<script lang="ts">
	export let name: string
	export let label: string = ''
	export let options: string[] = []
	export let value: string = ''
</script>

<div class="input-wrapper">
	<select {name} id={name} class="select {value === '' && 'empty'}" bind:value>
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

		.select {
			width: calc(((103 - 10 - 2) / 1366) * 100vw);
			height: 31px;
			padding-bottom: 0;
			padding-top: 0;

			&:focus {
				border-color: var(--primary-color);
			}

			&.empty {
				color: #d0cfcf;
			}

			option[value=''][disabled] {
				display: none;
			}
		}
	}
</style>
