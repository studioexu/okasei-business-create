<script lang="ts" context="module"></script>

<script lang="ts">
	import ButtonDelete from '@/components/ButtonDelete.svelte'
	import Select from '@/components/Select.svelte'
	import { toKebab } from '@/libs/utils'
	import Pagination from '@/views/Pagination.svelte'

	interface Purchase {
		reservationNumber: string
		customerName: string
		status: string
		model: string
		motor: string
		size: string
		arrivalDate: string
		marketPrice: number
		sellingPrice: number
	}

	const purchases: Purchase[] = [
		{
			reservationNumber: '8323-0804-5840',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '12/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5841',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '2/11',
			marketPrice: 13244,
			sellingPrice: 3000
		},
		{
			reservationNumber: '8323-0804-5842',
			customerName: 'My company',
			status: '到着待ち',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '12/11',
			marketPrice: 18348,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5843',
			customerName: 'My company',
			status: '失注',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '3/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5844',
			customerName: '田中　太郎',
			status: '到着待ち',
			model: '2M',
			motor: 'ヒューマン',
			size: '83M',
			arrivalDate: '12/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5845',
			customerName: 'John Doe',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '91R',
			arrivalDate: '12/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5846',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '12/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5847',
			customerName: 'My company',
			status: '完了',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDate: '1/11',
			marketPrice: 8756,
			sellingPrice: 5000
		}
	]

	const searchFieldsets = [
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
			id: 'customer-name',
			label: 'お客様名',
			value: ''
		}
	]

	const tableHeaders: { label: string; id: keyof Purchase }[] = [
		{ label: '予約番号', id: 'reservationNumber' },
		{ label: 'お客様名', id: 'customerName' },
		{ label: 'ステータス', id: 'status' },
		{ label: '機種', id: 'model' },
		{ label: 'モーター', id: 'motor' },
		{ label: 'サイズ', id: 'size' },
		{ label: '入荷日', id: 'arrivalDate' },
		{ label: '相場', id: 'marketPrice' },
		{ label: '買取額', id: 'sellingPrice' }
	]

	$: dividedPurchases =
		purchases.length > 0
			? purchases.flatMap((_, i, self) => (i % 5 ? [] : [self.slice(i, i + 5)]))
			: []

	$: currentPage = 0

	/**
	 * update the current page number
	 * @param event: get the current number of the page
	 */
	const movePage = (event: { detail: { page: number } }): void => {
		currentPage = event.detail.page
	}
</script>

<section class="section">
	<header class="section__header">
		<form class="search-form">
			{#each searchFieldsets as fieldset}
				<div class="input-wrapper">
					<label for={fieldset.id}>{fieldset.label}</label>
					<input type="text" id={fieldset.id} name={fieldset.id} bind:value={fieldset.value} />
				</div>
			{/each}
		</form>

		<button class="primary"> ＋　新規追加 </button>
	</header>

	<div class="section__main">
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
				{#each dividedPurchases[currentPage] as purchase}
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
							{:else}
								<td class="tdata">{purchase[header.id]}</td>
							{/if}
						{/each}
						<td class="tdata">
							<ButtonDelete />
						</td>
						<td class="tdata">
							<ButtonDelete />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
