<script lang="ts">
	import Select from './Select.svelte'

	export let name: string
	export let withTime: boolean = false
	export let label: string

	export let value: string = ''

	const years: string[] = ['']
	const months: string[] = ['']
	let days: string[] = ['']
	const hours: string[] = ['']
	const currentYear = new Date().getFullYear()
	const minYear = 2000

	let maxDaysInMonth = 31

	let month: string
	let year: string
	let day: string
	let hour: string

	$: value = year + month + day + hour

	$: console.log(value)

	$: monthInt = parseInt(month)

	const adjustNumberOfDays = (month: number) => {
		// switch (month) {
		// 	case 2:
		// 		return 28
		// 	case :
		// 		return 28
		// 	case 2:
		// 		return 28
		// 	case 2:
		// 		return 28

		// 	default:
		// 		break
		// }

		if (month === 2) {
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
	$: console.log(maxDaysInMonth)

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

	$: console.log(days)

	for (let i = 0; i <= 23; i++) {
		hours.push(i.toString())
	}
</script>

<div class="date-input">
	<h3 class="label">{label}</h3>
	<Select type="date" name={name + '-year'} label={'年'} options={years} bind:value={year} />
	<Select type="date" name={name + '-month'} label={'月'} options={months} bind:value={month} />
	<Select type="date" name={name + '-day'} label={'日'} options={days} bind:value={day} />

	{#if withTime}
		<Select type="date" name={name + '-time'} label={'時'} options={hours} bind:value={hour} />
	{/if}
</div>

<style class="scss">
	.date-input {
		display: flex;
		flex-direction: row;
		gap: 18px;
		align-items: center;
	}

	.label {
		font-size: 18px;
		font-weight: 400;
	}
</style>
