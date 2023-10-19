<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import Input from './Input.svelte'
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'

	let instId: string = ''
	let custName: string = ''
	let postalCode: string = ''
	let phoneNumber: string = ''
	export let data: CustomerFactory[]
	export let newData: CustomerFactory[]
	// let dataBis: CustomerFactory[] = data

	// $: newData = dataBis
	/**
	 * FilterData will filter data according the keywords entered by the user and the type of the input.
	 * @param data: Array, it will be the array that it will be filtered
	 * @param filterType: string, the filter that we want to apply
	 * @param input: string, the keywords entered by the user
	 */
	const filterData = (data: any[], filterType: string, input: string) => {
		console.log(data)
		console.log(input)

		switch (filterType) {
			case 'facility-name':
				return data.filter(customer => {
					console.log(customer.custName.includes(input))

					return customer.custName.includes(input)
				})
			case 'kana':
				return data.filter(customer => {
					return customer.kana.includes(input)
				})
			case 'customer-number':
				console.log(input)

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
		// let dataBis = data
		let dataBis: CustomerFactory[] = data

		console.log(instId)

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
			// dataBis = filterData(dataBis, 'kana', facilityName)
		}

		console.log('dataBis')

		console.log(dataBis)
		console.log(newData)

		newData = dataBis
	}

	$: console.log('newData')
	$: console.log(newData)
</script>

<form class="search-menu">
	<Input
		additionalClass={'txt--lg'}
		name={'facility-name'}
		label={'施設名'}
		bind:value={custName}
	/>
	<Input
		additionalClass={'txt--sm'}
		name={'customer-number'}
		label={'医療機関番号'}
		bind:value={instId}
	/>
	<Input
		additionalClass={'txt--sm'}
		name={'postalcode'}
		label={'郵便番号'}
		bind:value={postalCode}
	/>
	<Input additionalClass={'txt--md'} name={'phone'} label={'電話番号'} bind:value={phoneNumber} />

	<!-- <button class="btn btn--search" on:click={handleSearch}>検索</button> -->
	<Button buttonClass={'btn--filled btn--sm'} handleClick={handleSearch}>検索</Button>
</form>

<style lang="scss">
	// .btn {
	// 	position: relative;
	// 	background-color: #2fa8e1;
	// 	color: #fff;
	// 	margin: 0;
	// 	height: 32px;
	// 	overflow: hidden;

	// 	&::after {
	// 		position: absolute;
	// 		content: ' ';
	// 		background-color: #fff;
	// 		width: 100%;
	// 		height: 100%;
	// 		top: 0;
	// 		left: 0;
	// 		opacity: 0;
	// 		transition: opacity 300ms;
	// 	}

	// 	&:hover {
	// 		cursor: pointer;
	// 		&::after {
	// 			opacity: 0.1;
	// 		}
	// 	}

	// 	&--search {
	// 		padding: 0 11px;
	// 		border-radius: 3px;
	// 	}

	// 	&--page {
	// 		background-color: transparent;
	// 		color: black;
	// 		height: 25px;
	// 		width: 25px;
	// 		border-radius: 100%;
	// 		transition: all 300ms;

	// 		&.current {
	// 			background-color: #2fa8e1;
	// 			color: #fff;
	// 		}

	// 		&:hover {
	// 			color: #fff;
	// 			background-color: #2fa8e1;
	// 		}
	// 	}
	// }

	.search-menu {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 1vw;
		margin-bottom: 1.5rem;
	}
</style>
