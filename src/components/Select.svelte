<script lang="ts">
	export let value: string
	export let options: string[] = [' ']
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

	<select class="select" bind:value id={name}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}

	<span class="font-error">{errorMsg}</span>
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		align-items: center;
		gap: 10px;

		&:first-child {
			.label {
				width: 130px;
			}
		}

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

		.font-error {
			position: absolute;
			right: 0;
			bottom: -14px;
			font-size: 10px;
			opacity: 0;
		}
	}

	.error {
		.select {
			transition: border 300ms;
			border: 1.5px solid var(--error);
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
</style>
