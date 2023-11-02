<script lang="ts">
	import type { CustomerFactory } from '@/utils/customers/Factories/CustomerFactory'
	import Input from './Input.svelte'

	export let data: CustomerFactory[]
	export let customersToDisplay: CustomerFactory[]
	export let displayDeleteCusomtersIsChecked: boolean
	export let filteredCustomers: CustomerFactory[]

	let instId: string = ''
	let custName: string = ''
	let postalCode: string = ''
	let phoneNumber: string = ''

	$: filteredCustomers

	/**
	 * FilterData will filter data according the keywords entered by the user and the type of the input.
	 * @param data: Array, it will be the array that it will be filtered
	 * @param filterType: string, the filter that we want to apply
	 * @param input: string, the keywords entered by the user
	 */
	const filterData = (data: CustomerFactory[], filterType: string, input: string) => {
		switch (filterType) {
			case 'facility-name':
				return data.filter(customer => {
					return (
						customer.custName.toLowerCase().includes(input.toLowerCase()) ||
						customer.custKana.includes(input)
					)
				})

			case 'customer-number':
				return data.filter(customer => {
					return customer.instId.includes(input)
				})

			case 'postal-code':
				return data.filter(customer => {
					return customer.address.postalCode.includes(input)
				})

			case 'phone-number':
				return data.filter(customer => {
					return customer.address.phoneNumber.includes(input)
				})

			default:
				return data
		}
	}

	/**
	 * it will lauch a research according to the input entered by the user, when the user clicks on 検索 button.
	 * @param e
	 */
	function handleSearch(e?: any) {
		let filteredData: CustomerFactory[] = data

		if (instId !== '') {
			filteredData = filterData(filteredData, 'customer-number', instId)
		}

		if (phoneNumber !== '') {
			filteredData = filterData(filteredData, 'phone-number', phoneNumber)
		}

		if (postalCode !== '') {
			filteredData = filterData(filteredData, 'postal-code', postalCode)
		}

		if (custName !== '') {
			filteredData = filterData(filteredData, 'facility-name', custName)
		}

		filteredCustomers = filteredData
		customersToDisplay = displayDeleteCusomtersIsChecked
			? filteredCustomers
			: filteredCustomers.filter(customer => customer.isActive)
	}
</script>

<form class="search-menu">
	<Input
		name={'facility-name'}
		label={'施設名'}
		inputSize={'input--lg'}
		handleInput={handleSearch}
		bind:value={custName}
	/>
	<Input
		name={'customer-number'}
		label={'医療機関番号'}
		inputSize={'input--md'}
		handleInput={handleSearch}
		bind:value={instId}
	/>
	<Input
		name={'postal-code'}
		label={'郵便番号'}
		inputSize={'input--md'}
		handleInput={handleSearch}
		bind:value={postalCode}
	/>
	<Input
		name={'phone'}
		label={'電話番号'}
		inputSize={'input--md'}
		handleInput={handleSearch}
		bind:value={phoneNumber}
	/>
</form>

<style lang="scss">
	.search-menu {
		display: flex;
		justify-content: flex-start;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding: 0 18px;

		row-gap: 10px;
		flex-wrap: wrap;

		color: var(--black);
	}
</style>
