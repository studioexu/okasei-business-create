<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import Input from './Input.svelte'

	let customerNumber: string = ''
	let facilityName: string = ''
	let postalCode: string = ''
	let phoneNumber: string = ''
	export let data: any[]
	export let newData: any[]
	/**
	 * FilterData will filter data according the keywords entered by the user and the type of the input.
	 * @param data: Array, it will be the array that it will be filtered
	 * @param filterType: string, the filter that we want to apply
	 * @param input: string, the keywords entered by the user
	 */
	const filterData = (data: any[], filterType: string, input: string) => {
		switch (filterType) {
			case 'facility-name':
				return data.filter(customer => {
					return customer.facilityName.includes(input)
				})
			case 'kana':
				return data.filter(customer => {
					return customer.kana.includes(input)
				})
			case 'customer-number':
				console.log(input)

				return data.filter(customer => {
					return customer.id.includes(input)
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
	const handleSearch = (e?: any) => {
		let dataBis = data

		console.log(customerNumber)

		if (customerNumber !== '') {
			dataBis = filterData(dataBis, 'customer-number', customerNumber)
		}

		if (phoneNumber !== '') {
			dataBis = filterData(dataBis, 'phone-number', phoneNumber)
		}

		if (postalCode !== '') {
			dataBis = filterData(dataBis, 'postal-code', postalCode)
		}

		if (facilityName !== '') {
			dataBis = filterData(dataBis, 'facility-name', facilityName)
			// dataBis = filterData(dataBis, 'kana', facilityName)
		}

		newData = dataBis
	}
</script>

<form class="search-menu">
	<Input
		additionalClass={'txt--lg'}
		name={'facility-name'}
		label={'施設名'}
		bind:value={facilityName}
	/>
	<Input
		additionalClass={'txt--sm'}
		name={'customer-number'}
		label={'医療機関番号'}
		bind:value={customerNumber}
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
