<script lang="ts">
	import type { CustomerFactory } from '@/utils/customers/Factories/CustomerFactory'

	export let data: CustomerFactory[]
	export let customersToDisplay: CustomerFactory[]
	export let deletedCustomersAreShown: boolean
	export let filteredCustomers: CustomerFactory[]

	$: filteredCustomers

	$: custName = filterInputs[0].value
	$: instId = filterInputs[1].value
	$: postalCode = filterInputs[2].value
	$: phoneNumber = filterInputs[3].value

	const filterInputs = [
		{
			name: 'facility-name',
			label: '施設名',
			value: ''
		},
		{
			name: 'customer-number',
			label: '医療機関番号',
			value: ''
		},
		{
			name: 'postal-code',
			label: '郵便番号',
			value: ''
		},
		{
			name: 'phone',
			label: '電話番号',
			value: ''
		}
	]

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
		customersToDisplay = deletedCustomersAreShown
			? filteredCustomers
			: filteredCustomers.filter(customer => customer.isActive)
	}
</script>

<form class="search-menu">
	{#each filterInputs as input}
		<div class="input-wrapper">
			<label class="label" for={input.name}>{input.label}</label>
			<input
				type="text"
				class="input {input.name === 'facility-name' ? 'input--lg' : 'input--md'}"
				id={input.name}
				name={input.name}
				bind:value={input.value}
				on:input={handleSearch}
			/>
		</div>
	{/each}
</form>

<style lang="scss">
	.search-menu {
		display: flex;
		justify-content: flex-start;
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding: 0 18px;
		color: var(--black);
		row-gap: 10px;
		flex-wrap: wrap;
	}

	@mixin responsiveInputWidth($width) {
		width: calc((($width - 8 - 2) / 1366) * 100vw);
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;

		.label {
			width: max-content;
		}

		.input {
			// height: calc(32px - 2px);
			padding-left: 8px;

			&:focus {
				border-color: var(--primary-color);
			}

			&--md {
				@include responsiveInputWidth((137));
			}
			&--lg {
				@include responsiveInputWidth((226));
			}
		}
	}

	@media all and (max-width: 1072px) {
		.input-wrapper {
			width: auto;
			.input {
				&--md {
					@include responsiveInputWidth((160));
				}
			}
		}
		.input-wrapper:nth-child(1) {
			width: 100%;
			justify-content: center;
			flex-grow: 3;

			.label {
				min-width: 60px;
			}

			.input {
				width: 100%;
			}
		}
	}
</style>
