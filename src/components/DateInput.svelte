<script lang="ts">
	import SelectDate from './SelectDate.svelte'

	export let name: string
	export let label: string = ''

	export let value: string = ''

	const years: string[] = ['']
	const months: string[] = ['']
	let days: string[] = ['']
	const hours: string[] = ['']
	const currentYear = new Date().getFullYear()
	const minYear = 2000

	let maxDaysInMonth = 31
	const formatDateElement = (element: string) => {
		if (parseInt(element) < 10) {
			return '0' + element
		} else {
			return element
		}
	}

	let month: string = value.length > 0 ? value.split('-')[0] : ''
	let year: string = value.length > 0 ? value.split('-')[1] : ''
	let day: string = value.length > 0 ? value.split('-')[2] : ''

	$: value =
		month !== '' && year !== '' && day !== ''
			? year + '-' + formatDateElement(month) + '-' + formatDateElement(day)
			: ''

	$: monthInt = parseInt(month)

	const checkIsLeapYear = (year: number) => {
		if (year % 4 === 0) {
			if (year % 100 === 0) {
				if (year === 400) return true
				else return false
			} else return true
		} else return false
	}

	const adjustNumberOfDays = (month: number) => {
		if (month === 2) {
			if (checkIsLeapYear(parseInt(year))) {
				return 29
			}
			return 28
		} else if (month <= 7 && month % 2 !== 0) {
			return 31
		} else if (month > 7 && month % 2 === 0) {
			return 31
		} else {
			return 30
		}
	}

	$: maxDaysInMonth = adjustNumberOfDays(monthInt)
	// $: console.log(maxDaysInMonth)

	for (let i = minYear; i < currentYear; i++) {
		years.push(i.toString())
	}

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}

	const updateNumberOfDaysInAMonth = (maxDays: number) => {
		const daysArray = ['']
		for (let i = 1; i <= maxDays; i++) {
			daysArray.push(i.toString())
		}
		return daysArray
	}

	$: days = updateNumberOfDaysInAMonth(maxDaysInMonth)

	for (let i = 0; i <= 23; i++) {
		hours.push(i.toString())
	}
</script>

<div class="date-input">
	{#if label}
		<h3 class="label">{label}</h3>
	{/if}
	<SelectDate name={name + '-year'} label={'年'} options={years} bind:value={year} />
	<SelectDate name={name + '-month'} label={'月'} options={months} bind:value={month} />
	<SelectDate name={name + '-day'} label={'日'} options={days} bind:value={day} />
</div>

<style class="scss">
	.date-input {
		display: flex;
		flex-direction: row;
		gap: 10px;
		align-items: center;
		&:first-child {
			& > .label {
				width: 130px;
			}
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
	}
</style>
