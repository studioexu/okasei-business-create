<script lang="ts">
	import Select from './Select.svelte'
	export let value = {
		year: { title: '年', data: '', class: 'year' },
		month: { title: '月', data: '', class: 'month' }
	}

	// export let year = { title: '年', data: '', class: 'year' }
	// export let month = { title: '月', data: '', class: 'month' }

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

	<Select options={years} unit="年" wrapperClass="mb-0" bind:value={value.year.data} />
	<Select options={months} unit="月" wrapperClass="mb-0" bind:value={value.month.data} />
</div>

<style lang="scss">
	.date-selector {
		display: flex;
		gap: 10px;
		justify-content: flex-start;
		// margin-bottom: 1.5rem;
		align-items: center;

		.label {
			font-size: 18px;
			font-weight: 500;
			min-width: 130px;
		}
	}
</style>
