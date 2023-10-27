<script lang="ts">
	export let placeholder: string = ''
	export let value: string = ''
	export let name: string = ''
	export let label: string = ''
	export let additionalClass: string = ''
	export let labelClass: string = ''
	export let unit: string = ''
	export let wrapperClass: string = ''
	export let handleInput: Function
</script>

<div class="input-wrapper {wrapperClass}">
	<label class="label {labelClass}" for={name}>{label}</label>
	<input
		type="text"
		class="input {additionalClass}"
		id={name}
		{name}
		{placeholder}
		bind:value
		on:input={() => handleInput()}
	/>
	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}
</div>

<style lang="scss">
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;

		.label {
			width: max-content;
			font-size: 18px;
			font-weight: 500;
			color: var(--black);
		}

		.input {
			height: calc(32px - 2px);
			padding-left: 10px;
			border: 1px solid var(--gray);
			border-radius: 8px;

			&:focus {
				border-color: var(--primary-color);
			}
		}
	}

	.txt {
		&--sm {
			width: calc(((137 - 10) / 1366)) * 100vw;
			@include responsiveInputWidth((137));
		}
		&--md {
			width: calc(421px - 10px);
			@include responsiveInputWidth((166));
		}
		&--lg {
			width: calc(433px - 10px);
			@include responsiveInputWidth((226));
		}
	}
</style>
