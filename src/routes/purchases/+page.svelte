<script lang="ts" context="module"></script>

<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import Select from '@/components/Select.svelte'
	import { toKebab } from '@/libs/utils'
	import Pagination from '@/views/Pagination.svelte'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'
	import { purchase, purchases } from '@/stores/purchases'
	import type { Purchase, Status } from '@/libs/purchaseTypes'
	import { goto } from '$app/navigation'
	import RemoveCheckModal from '@/views/modals/RemoveCheckModal.svelte'

	export let data

	const tableHeaders: { label: string; id: keyof Purchase }[] = [
		{ label: '予約番号', id: 'orderNumber' },
		{ label: 'お客様名', id: 'customerName' },
		{ label: 'ステータス', id: 'status' },
		{ label: '動作・サイズチェック', id: 'behaviourSizeCheck' },
		{ label: '機種', id: 'model' },
		{ label: 'モーター', id: 'motor' },
		{ label: 'サイズ', id: 'size' },
		{ label: '入荷日', id: 'arrivalDate' },
		{ label: '運賃', id: 'marketPrice' },
		{ label: '買取額', id: 'sellingPrice' }
	]

	const searchFieldsets: { id: string; label: string; value: string }[] = [
		{
			id: 'model',
			label: '機種',
			value: ''
		},
		{
			id: 'size',
			label: 'サイズ',
			value: ''
		},
		{
			id: 'customerName',
			label: 'お客様名',
			value: ''
		},
		{
			id: 'orderNumber',
			label: '予約番号',
			value: ''
		}
	]

	//PAGINATION

	$: currentPage = 0

	/**
	 * update the current page number
	 * @param event: get the current number of the page
	 */
	const movePage = (event: { detail: { page: number } }): void => {
		currentPage = event.detail.page
	}

	/**
	 * The user enters parameters in the search fields, the displayed purchases will be updated.
	 * It will also update the array if the array of purchases is updated.
	 * ユーザーが検索を行うと、フィルターされた買取のArrayを表示する。
	 * 買取のArrayがアップデートされても、表示されている買取もアップデートする。
	 * @param seacrhfields: corresponding to the array of search fields.
	 * @param purchases: the array of purchases from where the search will be executed.
	 * @returns filtered array of purchases.
	 */
	const handleSearch = (
		seacrhfields: { id: string; label: string; value: string }[],
		purchases: Purchase[]
	): Purchase[] => {
		let filteredData: Purchase[] = purchases

		seacrhfields.forEach(fieldset => {
			if (fieldset.value !== '') {
				filteredData = filteredData?.filter(purchase => {
					return purchase[fieldset.id as 'model' | 'size' | 'customerName' | 'orderNumber']
						.toLowerCase()
						.includes(fieldset.value.toLowerCase())
				})
			}
		})

		return filteredData
	}

	$: filteredPurchases = handleSearch(searchFieldsets, $purchases)

	$: dividedPurchases =
		filteredPurchases.length > 0
			? filteredPurchases.flatMap((_, i, self) => (i % 5 ? [] : [self.slice(i, i + 5)]))
			: []

	//MODALS (DELETE AND REMOVE CHECK)
	let isShown: boolean = false
	let currentPurchase: number | undefined = undefined
	let isRemoveCheckModalIsShown = false
	let phase: 'shown' | 'success' | 'error' = 'shown'

	/**
	 * Opens the delete modal and update the currentPurchase variable with the id of the purchase the user wants to delete.
	 * 削除のモダールを開き、currentPurchaseは買取のIDに変更する。
	 * @param index
	 */
	const handleDeleteItem = (index: number) => {
		isShown = true
		currentPurchase = index
	}

	/**
	 * On click on the delete modal.
	 * The user confirms before deleting the purchase item. 買取の削除を確定する。
	 * @param event
	 */
	const onDeleteModalClick = (event: { detail: { key: string } }): void => {
		switch (event.detail.key) {
			case 'cancel':
				isShown = false
				break

			case 'delete':
				try {
					purchases.set($purchases.filter(purchase => purchase.id !== currentPurchase))

					if ($purchase.id === currentPurchase) {
						purchase.set({
							id: 0,
							orderNumber: '',
							customerName: '',
							status: <Status>'',
							behaviourSizeCheck: false,
							model: '',
							motor: '',
							size: '',
							arrivalDate: '',
							marketPrice: 0,
							sellingPrice: 0,
							image: ''
						})

						goto('/purchases')
						phase = 'shown'
					} else phase = 'success'
				} catch (error) {
					phase = 'error'
				}
				break

			case 'success':
				isShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}

	/**
	 * The user clicks on the checkbox, if the checkbox is to change to "false", then, it will display a modal so that the user can confirm.
	 * ユーザーがどうサザイズチェックをクリックして、Falseに変更にする場合、変更する前にモダールを表示して、ユーザーが確定できる。
	 * @param e
	 * @param index：id of purchase. 買取のID
	 */
	const handleCheckboxClick = (e: any, index: number): void => {
		currentPurchase = index
		if (e.target.checked) {
			purchases.set(
				$purchases.filter(purchase => {
					if (purchase.id === currentPurchase) {
						purchase.behaviourSizeCheck = true
						return purchase
					} else return purchase
				})
			)
		}

		if (!e.target.checked) {
			e.target.checked = true
			isRemoveCheckModalIsShown = true
		}
	}

	/**
	 * It will close the modal and update the checkbox adequately.
	 * モダールを閉じ、チェックボックスを正しくアップデートする。
	 * @param event
	 */
	const onRemoveCheckModalClick = (event: { detail: { key: string } }): void => {
		switch (event.detail.key) {
			case 'cancel':
				isRemoveCheckModalIsShown = false
				break

			case 'remove':
				try {
					purchases.set(
						$purchases.filter(purchase => {
							if (purchase.id === currentPurchase) {
								purchase.behaviourSizeCheck = false
								return purchase
							} else return purchase
						})
					)

					goto('/purchases')
					phase = 'success'
				} catch (error) {
					phase = 'error'
				}
				break

			case 'success':
				isRemoveCheckModalIsShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}
</script>

<section class="section">
	{#if isShown}
		<DeleteModal {phase} on:click={onDeleteModalClick} />
	{/if}
	{#if isRemoveCheckModalIsShown}
		<RemoveCheckModal {phase} on:click={onRemoveCheckModalClick} />
	{/if}
	<header class="section__header">
		<form class="search-form" on:input={() => handleSearch(searchFieldsets, $purchases)}>
			{#each searchFieldsets as fieldset}
				<div class="input-wrapper">
					<label for={fieldset.id}>{fieldset.label}</label>
					<input type="text" id={fieldset.id} name={fieldset.id} bind:value={fieldset.value} />
				</div>
			{/each}
		</form>

		<button on:click={() => goto('/purchases/new')} class="primary"> ＋　新規追加 </button>
	</header>

	<div class="section__main">
		{#if filteredPurchases.length === 0}
			<h2 class="no-data-message">データがありません。</h2>
		{:else}
			<table class="table">
				<thead class="theader">
					<tr class="trow">
						{#each tableHeaders as header}
							<th class="theader {toKebab(header.id)}">{header.label}</th>
						{/each}
						<th class="theader" />
						<th class="theader" />
					</tr>
				</thead>

				<tbody class="tbody">
					{#each dividedPurchases[currentPage] as purchase, index}
						<tr class="trow">
							{#each tableHeaders as header}
								{#if header.id === 'status'}
									<td class="tdata">
										<Select
											options={['未着手', '進行中', '到着待ち', '完了', '失注']}
											bind:value={purchase.status}
										/>

										<div
											class="progress-bar {(purchase.status === '未着手' ||
												purchase.status === '失注') &&
												'hidden'}"
										>
											<div
												class="fill {purchase.status === '進行中'
													? 'fill--50'
													: purchase.status === '到着待ち'
													? 'fill--75'
													: 'fill--full'}"
											/>
										</div>
									</td>
								{:else if header.id === 'orderNumber'}
									<td class="tdata">
										<a href={'/purchases/' + purchase.id}>
											{purchase.orderNumber}
										</a>
									</td>
								{:else if header.id === 'behaviourSizeCheck'}
									<td class="tdata max-w">
										<!-- <InputCheckbox
											name={header.id + index.toString()}
											isChecked={purchase.behaviourSizeCheck}
											on:click={purchase.behaviourSizeCheck
												? () => console.log('hello')
												: () => (purchase.behaviourSizeCheck = true)}
										/> -->

										<label class="checkbox-container" for={'behaviourSizeCheck' + index.toString()}>
											<input
												class="checkbox"
												type="checkbox"
												name={'behaviourSizeCheck' + index.toString()}
												id={'behaviourSizeCheck' + index.toString()}
												on:change={e => handleCheckboxClick(e, purchase.id)}
												checked={purchase.behaviourSizeCheck}
											/>
											<span class="checkmark" />
										</label>
									</td>
								{:else}
									<td class="tdata">{purchase[header.id]}</td>
								{/if}
							{/each}
							<td class="data update">
								<button class="btn" on:click={() => goto('/purchases/' + purchase.id + '/edit')}>
									<Icon icon={{ path: 'edit', color: '#0093d0' }} />
								</button>
							</td>

							<td class="data erase">
								<button class="btn" on:click={() => handleDeleteItem(purchase.id)}>
									<Icon icon={{ path: 'delete', color: '#0093d0' }} />
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>

	<footer class="section__footer">
		<Pagination bind:current={currentPage} bind:pages={dividedPurchases} on:click={movePage} />
	</footer>
</section>

<style lang="scss">
	.section {
		&__header {
			margin-bottom: 36px;
		}

		&__footer {
			margin-top: 18px;
		}
	}

	.btn {
		background-color: transparent;
		transition: transform 300ms;
		z-index: 99;

		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}

		&.disabled {
			pointer-events: none;
		}

		> :global(.svg-icon) {
			height: 18px * 1.2;
		}
	}

	.search-form {
		display: flex;
		justify-content: center;
		gap: 18px;
		margin-bottom: 20px;
	}

	.hidden {
		visibility: hidden;
	}

	.table {
		width: 100%;
		padding: 11px;
		border-collapse: collapse;
		border-radius: 8px;
		overflow: hidden;

		.tbody {
			background-color: #fff;
		}

		.theader {
			position: sticky;
			top: 0;
			height: 42px;
			font-weight: bold;
			background-color: var(--back);
			color: var(--primary);

			& .behaviour-size-check {
				width: 110px;
			}
		}

		.trow {
			border-bottom: 1px solid var(--primary);

			&:last-child {
				border: none;
			}
		}

		.tdata {
			padding: 11px 22px;
			width: fit-content;
			text-align: center;
			&.customerName {
				max-width: 200px;

				a {
					color: var(--primary);

					&:hover {
						opacity: 0.5;
					}
				}
			}

			&.condition {
				font-weight: 900;
				&--A {
					color: var(--error);
				}

				&--B {
					color: var(--primary);
				}
			}
		}

		.tdata:nth-child(2n) {
			background-color: rgb(244, 244, 244);
		}
	}

	.progress-bar {
		content: ' ';
		margin-top: 11px;
		width: 100%;
		height: 20px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--gray);

		.fill {
			content: '';
			height: 100%;
			width: 100%;
			background-color: var(--primary);
			transform: scaleX(0);
			transform-origin: 0;
			transition: transform 300ms;

			&--50 {
				transform: scaleX(0.5);
			}

			&--75 {
				transform: scaleX(0.75);
			}

			&--full {
				transform: scaleX(1);
			}
		}
	}

	.checkbox-container {
		cursor: pointer;
		position: relative;
		display: flex;
		justify-content: center;
		flex-direction: row-reverse;
		align-items: center;
		height: 31px;
		width: auto;
		gap: 18px;
		font-size: 18px;
		user-select: none;

		& :hover {
			.checkbox ~ .checkmark {
				background-color: #ccc;
			}
		}

		& :after {
			content: '';
			display: none;
		}

		.checkmark {
			display: flex;
			align-items: center;
			justify-content: center;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
			border: 1px solid var(--black);
			border-radius: 3px;
			background-color: #fff;

			&:after {
				width: 3px;
				height: 8px;
				border: solid white;
				border-width: 0 3px 3px 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		.checkbox {
			position: absolute;
			height: 0;
			width: 0;
			opacity: 0;
			cursor: pointer;

			&:checked ~ .checkmark {
				background-color: var(--primary);

				&:after {
					display: block;
				}
			}
		}
	}
</style>
