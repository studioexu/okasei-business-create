<script lang="ts">
	import Input from '@/routes/customers/components/Input.svelte'
	import Select from './Select.svelte'

	export let year: string = ''
	export let month: string = ''

	const currentYear = new Date().getFullYear()
	const years: string[] = ['']
	const months: string[] = ['']

	for (let i = 1850; i < currentYear; i++) {
		years.push(i.toString())
	}

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}
</script>

<div class="date-selector">
	<label class="label" for="foundation-date">設立年月日</label>

	<!-- <Select options={years} unit="年" wrapperClass="mb-0" bind:value={value.year.data} /> -->
	<Input unit="年" wrapperClass="mb-0" additionalClass="number--sm" bind:value={year} />
	<!-- <Input unit="年" wrapperClass="mb-0" additionalClass="number--sm" bind:value={value.year.data} /> -->

	<Select options={months} unit="月" wrapperClass="mb-0" bind:value={month} />
</div>

<style lang="scss">
	.date-selector {
		display: flex;
		gap: 10px;
		justify-content: flex-start;
		align-items: center;

		.label {
			font-size: 18px;
			font-weight: 500;
			min-width: 130px;
		}
	}
</style>
