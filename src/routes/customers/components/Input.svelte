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
		width: calc((($width - 8 - 2) / 1366) * 100vw);
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
			padding-left: 8px;
			border: 1px solid var(--gray);
			border-radius: 8px;

			&:focus {
				border-color: var(--primary-color);
			}
		}
	}

	.txt {
		&--sm {
			@include responsiveInputWidth((137));
		}
		&--md {
			@include responsiveInputWidth((166));
		}
		&--lg {
			@include responsiveInputWidth((226));
		}
	}

	@media all and (max-width: 1130px) {
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

		.txt {
			&--sm {
				@include responsiveInputWidth((160));
			}
			&--lg {
				width: 226px;
			}
		}
	}
</style>
