<script lang="ts">
	export let name: string = ''
	export let label: string = ''

	export let value: string | number | boolean
	export let options: string[] | { value: number | string | boolean; text: string }[]
	export let unit: string = ''

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

	<select class="select {value === '' && 'empty'}" bind:value id={name}>
		<option class="option" value="" disabled selected>未選択</option>

		{#each options as option}
			{#if typeof option === 'string'}
				<option value={option}>{option}</option>
			{:else}
				<option value={option.value}>{option.text}</option>
			{/if}
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

		.select {
			height: 31px;
			color: var(--black);

			&:focus {
				border-color: var(--primary-color);
			}

			option[value=''][disabled] {
				display: none;
			}

			&.empty {
				color: #d0cfcf;
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
</style>
