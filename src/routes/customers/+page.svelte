<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { CustomerInfo } from './utils/types'
	import Table from './components/Table.svelte'
	import TableNavigation from './components/TableNavigation.svelte'
	import SearchMenu from './components/SearchMenu.svelte'
	export let data

	let newData: CustomerInfo[] = data.data
	let dataToDisplay: CustomerInfo[] = []
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
	 * @param numberOfPages: number, corresponding also to the maximum of pages
	 * @param currentPage: number, page where the user is.
	 */
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
	 * @param data: array of customer's information
	 * @param firstDataIndex: number, is the first customer we want to display from the data array
	 * @param lastDataIndex: number, is the last customer we want to display from the data array
	 */
	const updateDataToDisplay = (
		data: CustomerInfo[],
		firstDataIndex: number,
		lastDataIndex: number
	) => {
		dataToDisplay = []
		for (let i = firstDataIndex; i <= lastDataIndex; i++) {
			dataToDisplay = [...dataToDisplay, data[i]]
		}
	}
</script>

<section class="section section--customers-management" id="customers-management">
	<header class="section__header">
		<h2 class="title">下記のいずれかを入力し、編集する施設を選択してください。</h2>
		<SearchMenu data={data.data} bind:newData />

		<label for="checkbox"
			><input
				class="checkbox"
				type="checkbox"
				id="checkbox"
				name="checkbox"
			/>以前削除した施設も含む</label
		>

		<a class="btn btn--new" href="/customers/new">＋新規登録</a>
	</header>

	<div class="section__main">
		<Table {dataToDisplay} bind:data={data.data} bind:newData />
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
			margin-bottom: 1.5rem;
			font-size: 16px;
		}
	}

	.checkbox {
		margin-right: 11px;
	}

	.no-data {
		text-align: center;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 32px;
		padding: 8px;
		background-color: #2fa8e1;
		color: #fff;
		border-radius: 3px;
		float: right;
	}
</style>
