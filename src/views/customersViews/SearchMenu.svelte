<script lang="ts">
	import type { CustomerFactory } from '@/Factories/CustomerFactory'

	export let data: CustomerFactory[]
	export let customersToDisplay: CustomerFactory[]
	export let deletedCustomersAreShown: boolean
	export let filteredCustomers: CustomerFactory[]
	export let currentPage: number

	$: filteredCustomers
	$: currentPage

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
			name: 'phone-number',
			label: '電話番号',
			value: ''
		}
	]

	/**
	 * FilterData will filter the data according the keywords entered by the user and the type of the input.
	 * データタイプによるデータを超注する。
	 * @param data: Array, it will be the array that it will be filtered。　データを超注したい元のArrayである。
	 * @param filterType: string, the filter that we want to apply。データのタイプ
	 * @param input: string, the keywords entered by the user。データの内容である。
	 * @returns array with the data filtered. 超注されたでーたのArray.
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
	 * ユザーが入力するとFilerData()を利用して、自動で検索する。結果で表示されるデータをアップデータする。
	 */
	const handleSearch = (): void => {
		let filteredData: CustomerFactory[] = data

		filterInputs.map(filter => {
			if (filter.value !== '') {
				filteredData = filterData(filteredData, filter.name, filter.value)
			}
		})
		currentPage = 0

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
		justify-content: space-between;
		margin-bottom: 1.5rem;
		padding: 0 18px;
		row-gap: 10px;
		flex-wrap: wrap;
		color: var(--black);
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
			font-size: 18px;
		}

		.input {
			padding: 4px 8px;

			&:focus {
				border-color: var(--primary-color);
			}

			&--md {
				@include responsiveInputWidth((130));
			}
			&--lg {
				@include responsiveInputWidth((190));
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
