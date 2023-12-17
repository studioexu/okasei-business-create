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
		<option class="option" value={''} disabled selected>未選択</option>

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

	.error {
		.select {
			transition: border 300ms;
			border-color: var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.font-error {
			opacity: 1;
			transition: all 300ms;
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
