<script lang="ts">
	export let placeholder: string = ''
	export let value: string = ''
	export let name: string = ''
	export let label: string = ''
	export let additionalClass: string = ''
	export let autoSearch = false
	export let labelClass: string = ''
	export let unit: string = ''
	export let wrapperClass: string = ''
</script>

<div class="input-wrapper {wrapperClass}">
	<label class="label {labelClass}" for={name}>{label}</label>
	<input type="text" class="input {additionalClass}" id={name} {name} {placeholder} bind:value />
	{#if autoSearch}
		<button class="btn btn--search">自動検索</button>
	{/if}

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
		margin-bottom: 20px;

		.label {
			font-size: 18px;
			font-weight: 500;
			width: max-content;

			&-width {
				&--md {
					min-width: 74px;
				}
				&--lg {
					min-width: 130px;
				}
			}
		}
		.input {
			height: 32px;
			padding-left: 10px;
			border: 1px solid #707070;
		}
	}

	.mb-0 {
		margin-bottom: 0;
	}

	.number {
		&--sm {
			// width: calc(58px - 10px);
			@include responsiveInputWidth((58));
		}
		&--md {
			// width: calc(103px - 10px);
			@include responsiveInputWidth((103));
		}
		&--lg {
			// width: calc(152px - 10px);
			@include responsiveInputWidth((152));
		}
	}

	.txt {
		&--sm {
			width: calc(((137 - 10) / 1366)) * 100vw;
			// @include responsiveInputWidth((137));
			// width: 11%;
			// width: 137px;
			@include responsiveInputWidth((114));
		}
		&--md {
			width: calc(421px - 10px);
			@include responsiveInputWidth((421));
			@include responsiveInputWidth((114));
		}
		&--lg {
			width: calc(433px - 10px);
			// @include responsiveInputWidth((433));
			@include responsiveInputWidth((359));
			// @include responsiveInputWidth((259));
		}
		&--xl {
			width: calc(644px - 10px);
			// @include responsiveInputWidth((644));
			@include responsiveInputWidth((534));
		}
	}

	.btn {
		background-color: #2fa8e1;
		color: #fff;
		margin: 0;
		&--search {
			padding: 6px;
			font-size: 1rem;
			border-radius: 3px;
			font-weight: bold;
			width: max-content;
		}
	}
</style>
