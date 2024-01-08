<script lang="ts" context="module"></script>

<script lang="ts">
	import Icon from '@/components/Icon.svelte'
	import Select from '@/components/Select.svelte'
	import { toKebab } from '@/libs/utils'
	import Pagination from '@/views/Pagination.svelte'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'
	import { purchase, purchases } from '@/stores/purchases'
	import type { Purchase, Status } from '@/libs/purchaseTypes'
	import { beforeNavigate, goto } from '$app/navigation'
	import InputCheckbox from '@/components/InputCheckbox.svelte'
	import RemoveCheckModal from '@/views/modals/RemoveCheckModal.svelte'
	import { findNumbers } from 'libphonenumber-js'

	let isRemoveCheckModalIsShown = false

	export let data

	console.log(data)

	$: currentPage = 0

	let isShown: boolean = false
	let currentPurchase: number | undefined = undefined
	let phase: 'shown' | 'success' | 'error' = 'shown'

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

	// $: filteredPurchases = $purchases

	$: console.log(filteredPurchases)

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

	$: dividedPurchases =
		filteredPurchases.length > 0
			? filteredPurchases.flatMap((_, i, self) => (i % 5 ? [] : [self.slice(i, i + 5)]))
			: []

	const handleDeleteItem = (index: number) => {
		isShown = true
		currentPurchase = index
	}

	$: console.log(currentPurchase)
	console.log('hello')

	/**
	 * On click on the delete modal.
	 * @param event
	 */
	const onClick = (event: { detail: { key: string } }): void => {
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
	 * update the current page number
	 * @param event: get the current number of the page
	 */
	const movePage = (event: { detail: { page: number } }): void => {
		currentPage = event.detail.page
	}

	const handleEditItem = (index: number) => {
		goto('/purchases/' + index + '/edit')
	}

	const handleCheckboxClick = (e: any, index: number) => {
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

	const onRemoveModalClick = (event: { detail: { key: string } }): void => {
		console.log(event.detail.key)

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

					// if ($purchase.id === currentPurchase) {
					// 	console.log('hello')

					// 	purchase.set({
					// 		id: $purchase.id,
					// 		orderNumber: $purchase.orderNumber,
					// 		customerName: $purchase.customerName,
					// 		status: <Status>$purchase.status,
					// 		behaviourSizeCheck: false,
					// 		model: $purchase.model,
					// 		motor: $purchase.motor,
					// 		size: $purchase.size,
					// 		arrivalDate: $purchase.arrivalDate,
					// 		marketPrice: $purchase.marketPrice,
					// 		sellingPrice: $purchase.sellingPrice,
					// 		image: $purchase.image
					// 	})

					goto('/purchases')
					phase = 'success'
				} catch (error) {
					console.log('hi')

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

	console.log($purchase)
</script>

<section class="section">
	{#if isShown}
		<DeleteModal {phase} on:click={onClick} />
	{/if}
	{#if isRemoveCheckModalIsShown}
		<RemoveCheckModal {phase} on:click={onRemoveModalClick} />
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
									<td class="tdata">
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
								<button class="btn" on:click={() => handleEditItem(purchase.id)}>
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
</style>
