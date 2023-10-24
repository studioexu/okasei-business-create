<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import Selector from './Selector.svelte'

	import ListOfYear from './Selector.svelte'

	export let monthIsValid = true
	export let yearIsValid = true

	export let year: string = ''
	export let month: string = ''

	// const currentYear = new Date().getFullYear()
	// const years: string[] = ['']
	const months: string[] = ['']

	// for (let i = 1850; i < currentYear; i++) {
	// 	years.push(i.toString())
	// }

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}

	let years: string[] = []
	const minYear = 1800
	const currentYear = new Date().getFullYear()
	for (let i = minYear; i < currentYear; i++) {
		years.push(i.toString())
	}

	$: console.log(year)
</script>

<div class="date-selector">
	<h3 class="label">設立年月日</h3>
	<Selector
		bind:value={year}
		dataType={'year'}
		datas={years}
		unit="年"
		classInput={'mb-0'}
		bind:isValid={yearIsValid}
	/>
	<Select
		options={months}
		name={'months'}
		unit="月"
		bind:value={month}
		wrapperClass={'mb-0'}
		bind:isValid={monthIsValid}
	/>
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
