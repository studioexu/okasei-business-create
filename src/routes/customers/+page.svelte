<script lang="ts" context="module"></script>

<script lang="ts">
	import Input from './components/Input.svelte'
	import TableRow from './components/TableRow.svelte'
	import { data } from './data/data.js'

	interface CompanyInfo {
		customerNumber: 'string'
		facilityName: 'string'
		address: {
			prefecture: 'string'
			city: 'string'
		}
		status: 'string'
		updateDate: 'string'
	}

	let dataToDisplay: any[] = []
	let pageArray: string[] = []
	let currentPage: number = 1
	let numberOfPages = Math.ceil(data.length / 6)
	let lastDataIndex = 5
	let firstDataIndex = 0
	$: lastDataIndex = currentPage * 5
	$: firstDataIndex = lastDataIndex - 5

	/**
	 * Update the page navigation in the footer according to the current page.
	 *  */
	const updateNavPage = () => {
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

	const updateDataToDisplay = () => {
		dataToDisplay = []
		for (let i = firstDataIndex; i <= lastDataIndex; i++) {
			dataToDisplay = [...dataToDisplay, data[i]]
		}
	}

	updateNavPage()
	updateDataToDisplay()

	/**
	 * When user click on the next button, it updates the current page as well as the data to display and the page navigation if necessary.
	 */
	const handleNext = () => {
		//if the current page is equal to the number of pages (i.e. the maximum number), we don't need to update
		if (currentPage === numberOfPages) {
			return
		}
		currentPage += 1
		updateDataToDisplay()
		updateNavPage()
	}

	/**
	 * When user click on the previous button, it updates the current page as well as the data to display and the page navigation if necessary.
	 */
	const handlePrevious = () => {
		//if the current page is equal to 1 (i.e. the first page), we don't need to update
		if (currentPage === 1) {
			return
		}
		currentPage -= 1
		updateDataToDisplay()
		updateNavPage()
	}

	/**
	 * Upadte the current page according the clicked button value, and update the data to display and the page navigation accordingly.
	 * @param e
	 */
	const handlePageClick = (e: any) => {
		currentPage = parseInt(e.target.value)
		updateDataToDisplay()
		updateNavPage()
	}
</script>

<section class="section section--customers-management" id="customers-management">
	<header class="section__header">
		<h2 class="title">下記のいずれかを入力し、編集する施設を選択してください。</h2>
		<div class="search-menu">
			<Input name={'facility-name'} label={'施設名'} />
			<Input name={'facility-name'} label={'医療機関番号'} />
			<Input name={'facility-name'} label={'郵便番号'} />
			<Input name={'facility-name'} label={'電話番号'} />

			<button class="btn btn--search">検索</button>
		</div>

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
		<table class="customer-list">
			<thead
				><tr class="row"
					><th>顧客番号</th><th>施設名</th><th>住所</th><th>状態</th><th>登録日</th><th>編集</th><th
						>削除</th
					></tr
				></thead
			>
			<tbody>
				{#each dataToDisplay as company, index}
					<TableRow
						{index}
						customerNumber={company.customerNumber}
						facilityName={company.facilityName}
						status={company.status}
						updateDate={company.updateDate}
						address={company.address}
					/>
				{/each}
			</tbody>
		</table>
	</div>

	<footer class="section__footer">
		<div class="table-navigation">
			<button class="btn btn--prev" on:click={handlePrevious}>prev</button>
			<ul class="page-list">
				{#each pageArray as page}
					<li class="page-list-item">
						<button
							class="btn btn--page {currentPage === parseInt(page) && 'current'}"
							on:click={handlePageClick}
							value={page}>{page}</button
						>
					</li>
				{/each}
			</ul>
			<button class="btn btn--next" on:click={handleNext}>next</button>
		</div>
	</footer>
</section>

<style lang="scss">
	.section__header {
		margin-bottom: 2rem;
		.title {
			font-size: 16px;
			margin-bottom: 1.5rem;
		}
	}

	.btn {
		position: relative;
		background-color: #2fa8e1;
		color: #fff;
		margin: 0;
		height: 32px;
		overflow: hidden;

		&::after {
			position: absolute;
			content: ' ';
			background-color: #fff;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			opacity: 0;
			transition: opacity 300ms;
		}

		&:hover {
			cursor: pointer;
			&::after {
				opacity: 0.1;
			}
		}

		&--search {
			padding: 0 11px;
			border-radius: 3px;
		}

		&--page {
			background-color: transparent;
			color: black;
			height: 25px;
			width: 25px;
			border-radius: 100%;

			&.current {
				background-color: #2fa8e1;
				color: #fff;
			}

			&:hover {
				color: #fff;
				background-color: #2fa8e1;
			}
		}
	}

	.search-menu {
		display: flex;
		justify-content: space-between;
	}

	.checkbox {
		margin-right: 11px;
	}

	.customer-list {
		background-color: #fff;
		padding: 0 calc((18 / 1366) * 100vw);
		border-radius: 4px;
		width: 100%;
		border-spacing: 0;
	}

	th {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		display: none;
	}

	.table-navigation {
		display: flex;
		justify-content: center;
		gap: 18px;
		margin: 24px 0;
		align-items: center;
	}

	.page-list {
		list-style-type: none;
		display: flex;
		justify-content: space-between;
		gap: 18px;
	}
</style>
