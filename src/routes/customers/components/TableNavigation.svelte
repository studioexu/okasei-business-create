<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import type { CustomerInfo } from '../utils/types'
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'

	export let currentPage: number
	export let newData: CustomerFactory[]
	let pageArray: string[]
	let numberOfPages: number

	$: currentPage
	$: numberOfPages
	// $: pageArray

	$: updateNavPage(numberOfPages, currentPage)
	$: numberOfPages = Math.ceil(newData.length / 6)

	$: currentPage =
		currentPage > numberOfPages && numberOfPages !== 0 ? currentPage - 1 : currentPage

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
	 * When user click on the next button, it updates the current page as well as the data to display and the page navigation if necessary.
	 */
	const handleNext = () => {
		//if the current page is equal to the number of pages (i.e. the maximum number), we don't need to update
		if (currentPage === numberOfPages) {
			return
		}
		currentPage += 1
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
	}

	/**
	 * Upadte the current page according the clicked button value, and update the data to display and the page navigation accordingly.
	 * @param e
	 */
	const handlePageClick = (e: any) => {
		currentPage = parseInt(e.target.value)
	}
</script>

<div class="table-navigation">
	<button class="btn btn--prev" on:click={handlePrevious}>
		<Icon icon={{ path: 'chevron-right', color: '#595857' }} />
	</button>

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

	<button class="btn btn--next" on:click={handleNext}
		><Icon icon={{ path: 'chevron-right', color: '#595857' }} />
	</button>
</div>

<style lang="scss">
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
			transition: all 300ms;

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

	.btn--next,
	.btn--prev {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 1.5rem;
		height: 1.5rem;
		border: 1px solid #5b5a5a;
		background-color: transparent;
		transition: background-color 300ms;

		&:hover {
			background-color: #fff;
		}
	}

	.btn--prev {
		transform: rotate(180deg);
	}
</style>
