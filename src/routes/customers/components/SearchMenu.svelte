<script lang="ts">
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'
	import Input from './Input.svelte'

	export let data: CustomerFactory[]
	export let newData: CustomerFactory[]
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
		console.log('nya')

		let dataBis: CustomerFactory[] = data

		if (instId !== '') {
			dataBis = filterData(dataBis, 'customer-number', instId)
		}

		if (phoneNumber !== '') {
			dataBis = filterData(dataBis, 'phone-number', phoneNumber)
		}

		if (postalCode !== '') {
			dataBis = filterData(dataBis, 'postal-code', postalCode)
		}

		if (custName !== '') {
			dataBis = filterData(dataBis, 'facility-name', custName)
		}

		filteredCustomers = dataBis
		newData = displayDeleteCusomtersIsChecked
			? filteredCustomers
			: filteredCustomers.filter(customer => customer.isActive)
	}
</script>

<form class="search-menu">
	<Input
		additionalClass={'txt--lg'}
		name={'facility-name'}
		label={'施設名'}
		bind:value={custName}
		handleInput={handleSearch}
	/>
	<Input
		additionalClass={'txt--sm'}
		name={'customer-number'}
		label={'医療機関番号'}
		bind:value={instId}
		handleInput={handleSearch}
	/>
	<Input
		additionalClass={'txt--sm'}
		name={'postalcode'}
		label={'郵便番号'}
		bind:value={postalCode}
		handleInput={handleSearch}
	/>
	<Input
		additionalClass={'txt--md'}
		name={'phone'}
		label={'電話番号'}
		bind:value={phoneNumber}
		handleInput={handleSearch}
	/>
	<!-- <Button buttonClass={'btn--filled btn--sm btn--right'} handleClick={handleSearch}>検索</Button> -->
</form>

<style lang="scss">
	.search-menu {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 1vw;
		margin-bottom: 1.5rem;
		color: var(--black);
	}
</style>
