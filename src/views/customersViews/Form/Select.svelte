<script lang="ts">
	export let value: string
	export let options: string[] = [' ']
	export let label: string = ''
	export let unit: string = ''
	export let wrapperClass: string = ''
	export let name: string = ''
	export let isValid: boolean = true
	export let errorMsg: string = ''
	export let required: boolean = false
</script>

<div class="input-wrapper {name} {wrapperClass} {isValid ? '' : 'error'}">
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

	<span class="error-msg">{errorMsg}</span>
</div>

<style lang="scss">
	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 20px;
		.label {
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
			border: 1px solid var(--gray);
			border-radius: 8px;
			outline: none;

			&:focus {
				border-color: var(--primary-color);
			}
		}

		.unit {
			height: 32px;
		}

		.error-msg {
			position: absolute;
			right: 0;
			bottom: -14px;
			color: var(--error);
			font-size: 10px;
			font-weight: 600;
			min-width: 250px;
			text-align: right;
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

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.required-mark {
		color: var(--error);
	}
</style>
