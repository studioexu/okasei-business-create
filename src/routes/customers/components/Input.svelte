<script lang="ts">
	export let placeholder: string = ''
	export let value: string = ''
	export let name: string = ''
	export let label: string = ''
	export let inputSize: string = ''
	export let unit: string = ''
	export let handleInput: Function
</script>

<div class="input-wrapper">
	<label class="label" for={name}>{label}</label>
	<input
		type="text"
		class="input {inputSize}"
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
		width: calc((($width - 8 - 2) / 1366) * 100vw);
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;

		.label {
			width: max-content;
		}

		.input {
			height: calc(32px - 2px);
			padding-left: 8px;

			&:focus {
				border-color: var(--primary-color);
			}

			&--md {
				@include responsiveInputWidth((137));
			}
			&--lg {
				@include responsiveInputWidth((226));
			}
		}
	}

	@media all and (max-width: 1072px) {
		.input-wrapper {
			width: auto;
			.input {
				&--md {
					@include responsiveInputWidth((160));
				}
			}
		}
		.input-wrapper:nth-child(1) {
			width: 100%;
			justify-content: center;
			flex-grow: 3;

			.label {
				min-width: 60px;
			}

			.input {
				width: 100%;
			}
		}
	}
</style>
