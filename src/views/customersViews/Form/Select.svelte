<script lang="ts">
	export let value: string = ''
	export let options: string[] = ['']
	export let label: string = ''
	export let unit: string = ''
	export let labelClass: string = ''
	export let wrapperClass: string = ''
	export let name: string = ''
	export let isValid: boolean = true

	const monthValidation = (month: string) => {
		const monthInt = parseInt(month)

		return monthInt > 0 && monthInt <= 12
	}

	const businessTypeValidation = (businessType: string) => {
		return businessType === '個人' || businessType === '法人'
	}

	const handleSelect = (e: any) => {
		const input = e.target.value

		switch (name) {
			case 'month':
				console.log(monthValidation(input))
				break
			case 'businessType':
				console.log(businessTypeValidation(input))
				break

			default:
				break
		}
	}
</script>

<div class="input-wrapper {wrapperClass} {isValid ? '' : 'error'}">
	{#if label !== ''}
		<label class="label {labelClass}" for="organization-type">{label}</label>
	{/if}
	<select class="select" bind:value on:change={handleSelect}>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}
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
</style>
