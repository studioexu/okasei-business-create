<script lang="ts">
	export let value: string = ''
	export let options: string[] = ['']
	export let label: string = ''
	export let unit: string = ''
	export let labelClass: string = ''
	export let wrapperClass: string = ''
	export let name: string = ''
	export let isValid: boolean = true
	export let errorMsg: string = ''
	export let required: boolean = false

	const businessTypeValidation = (businessType: string) => {
		return businessType === '個人' || businessType === '法人'
	}
</script>

<div class="input-wrapper {name} {wrapperClass} {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label class="label {labelClass}" for="organization-type">{label}{required ? '*' : ''}</label>
	{/if}

	<div class="input-w">
		<select class="select" bind:value>
			{#each options as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
		{#if unit !== ''}
			<span class="unit">{unit}</span>
		{/if}

		<span class="error-msg">{errorMsg}</span>
	</div>
</div>

<style lang="scss">
	.select {
		height: 32px;
		width: calc(((106 - 10 - 2) / 1366) * 100vw);
		padding-left: 10px;
		border: 1px solid rgb(206, 205, 205);
		font-size: 16px;

		&:focus {
			border-color: #2fa8e1;
		}
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 20px;
		.label {
			font-size: 18px;
			font-weight: 500;

			&-width {
				&--md {
					min-width: 74px;
				}
				&--lg {
					min-width: 130px;
				}
			}
		}
	}

	.unit {
		height: 32px;
	}

	.mb-0 {
		margin-bottom: 0;
	}

	.error-msg {
		position: absolute;
		right: 0;
		bottom: -14px;
		color: #f55d3e;
		font-size: 10px;
		font-weight: 600;
		min-width: 250px;
		text-align: right;
		opacity: 0;
	}

	.error {
		.input {
			transition: border 300ms;
			border: 1.5px solid #f55d3e;
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.input-w {
		position: relative;
	}
</style>
