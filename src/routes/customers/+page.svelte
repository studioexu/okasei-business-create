<script lang="ts" context="module">
	export interface CompanyInfo {
		id: string
		customerNumber: string
		branchNumber: string
		facilityName: string
		kana: string
		facilityNumber: string
		businessType: string
		address: {
			postalCode: string
			prefecture: string
			city: string
			address1: string
			address2: string
			phoneNumber: string
			fax: string
		}
		numberOfEmployees: string
		homepage: string
		numberOfFacilities: string
		foundation: {
			month: string
			year: string
			founder: string
		}
		bedding: [{ department: string; quantity: string }, { department: string; quantity: string }]
		registration: {
			status: string
			registrationDate: string
			lastUpdated: string
		}
		update: {
			status: string
			lastUpdated: string
		}
	}
</script>

<script lang="ts">
	import Table from './components/Table.svelte'
	import TableNavigation from './components/TableNavigation.svelte'
	import SearchMenu from './components/SearchMenu.svelte'
	import { onMount } from 'svelte'
	import { loadData } from './utils/actions'
	let data: CompanyInfo[] = []
	let newData: CompanyInfo[] = data

	console.log(data)

	//Set the default data
	onMount(async () => {
		data = await loadData('http://localhost:3000/customers')
		newData = await loadData('http://localhost:3000/customers')
	})

	let dataToDisplay: CompanyInfo[] = []
	let pageArray: string[] = []
	let currentPage: number = 1

	$: lastDataIndex =
		currentPage * 6 - 1 >= newData.length - 1 ? newData.length - 1 : currentPage * 6 - 1
	$: firstDataIndex = currentPage === 1 ? 0 : (currentPage - 1) * 6
	$: numberOfPages = Math.ceil(newData.length / 6)

	$: updateDataToDisplay(newData, firstDataIndex, lastDataIndex)
	$: updateNavPage(numberOfPages, currentPage)

	/**
	 * Update the page navigation in the footer according to the current page.
	 *  */
	const updateNavPage = (numberOfPages: number, currentPage: number) => {
		if (numberOfPages <= 5) {
			pageArray = []
			for (let i = 1; i <= numberOfPages; i++) {
				pageArray.push(i.toString())
			}
			return
		}

		if (currentPage >= numberOfPages - 4 && currentPage <= numberOfPages) {
			pageArray = []
			for (let i = numberOfPages - 4; i <= numberOfPages; i++) {
				pageArray.push(i.toString())
			}
			return
		}

		if (currentPage >= parseInt(pageArray[4])) {
			pageArray = []
			for (let i = currentPage; i <= currentPage + 4; i++) {
				pageArray.push(i.toString())
			}
			return
		}

		if (currentPage <= 5) {
			pageArray = []
			for (let i = 1; i <= 5; i++) {
				pageArray.push(i.toString())
			}
			return
		}

		if (currentPage < parseInt(pageArray[0])) {
			pageArray = []
			for (let i = currentPage - 4; i <= currentPage; i++) {
				pageArray.push(i.toString())
			}
			return
		}
	}

	/**
	 * Update the data display according the current page.
	 */
	const updateDataToDisplay = (data: any[], firstDataIndex: number, lastDataIndex: number) => {
		dataToDisplay = []
		for (let i = firstDataIndex; i <= lastDataIndex; i++) {
			dataToDisplay = [...dataToDisplay, data[i]]
		}
	}
</script>

<section class="section section--customers-management" id="customers-management">
	<header class="section__header">
		<h2 class="title">下記のいずれかを入力し、編集する施設を選択してください。</h2>
		<SearchMenu {data} bind:newData />

		<label for="checkbox"
			><input
				class="checkbox"
				type="checkbox"
				id="checkbox"
				name="checkbox"
			/>以前削除した施設も含む</label
		>
	</header>

	<div class="section__main">
		<Table {dataToDisplay} bind:data bind:newData />
	</div>

	<footer class="section__footer">
		<TableNavigation bind:currentPage {pageArray} {numberOfPages} />
	</footer>
</section>

<style lang="scss">
	.section {
		padding-bottom: 24px;
	}
	.section__header {
		margin-bottom: 2rem;
		.title {
			font-size: 16px;
			margin-bottom: 1.5rem;
		}
	}

	.checkbox {
		margin-right: 11px;
	}

	.no-data {
		text-align: center;
	}
</style>
