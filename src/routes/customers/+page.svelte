<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { CustomerInfo } from './utils/types'
	import Table from './components/Table.svelte'
	import TableNavigation from './components/TableNavigation.svelte'
	import SearchMenu from './components/SearchMenu.svelte'
	import DeleteModal from '@/views/customersViews/modals/DeleteModal.svelte'
	export let data

	$: customers = data.data
	let newData: CustomerInfo[] = customers
	let dataToDisplay: CustomerInfo[] = []
	let currentPage: number = 1
	let itemId: string = ''

	$: itemId
	$: newData = customers

	$: lastDataIndex =
		currentPage * 6 - 1 >= newData.length - 1 ? newData.length - 1 : currentPage * 6 - 1
	$: firstDataIndex = currentPage === 1 ? 0 : (currentPage - 1) * 6

	$: updateDataToDisplay(newData, firstDataIndex, lastDataIndex)

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

	const handleCheck = (e: any) => {
		const isChecked = e.target.checked
		if (isChecked) {
			newData = [...data.data, ...data.deletedData]
		} else {
			newData = data.data
		}
	}
</script>

<section class="section section--customers-management" id="customers-management">
	<DeleteModal bind:itemId />

	<header class="section__header">
		<h2 class="title">下記のいずれかを入力し、編集する施設を選択してください。</h2>
		<SearchMenu data={data.data} bind:newData />

		<div class="container">
			<label class="switch-label" for="checkbox">
				<div class="switch">
					<input
						class="checkbox"
						type="checkbox"
						id="checkbox"
						name="checkbox"
						on:change={handleCheck}
					/>
					<span class="slider" />
				</div>
				以前削除した施設も含む
			</label>

			<a class="btn btn--new" href="/customers/new">＋新規登録</a>
		</div>
	</header>

	<div class="section__main">
		<Table {dataToDisplay} bind:itemId />
	</div>

	<footer class="section__footer">
		<TableNavigation bind:currentPage bind:newData />
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

	.switch-label {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.switch {
		position: relative;
		height: 24px;
		width: 40px;
		cursor: pointer;

		.checkbox {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.slider {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			border-radius: 50px;
			background-color: rgb(200, 200, 200);
			transition: background-color 300ms ease-out;
		}

		.slider::before {
			position: absolute;
			content: ' ';
			width: 16px;
			height: 16px;
			background-color: #fff;
			left: 4px;
			top: 4px;
			border-radius: 100%;
			transition: transform 300ms ease-out;
		}

		.checkbox:checked {
			& + .slider {
				background-color: #2fa8e1;
				transition: background-color 300ms ease-out;
				&::before {
					// left: auto;
					// right: 4px;
					transform: translateX(16px);
					transition: transform 300ms ease-out;
				}
			}
		}
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
