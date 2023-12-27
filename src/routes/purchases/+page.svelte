<script lang="ts" context="module"></script>

<script lang="ts">
	import Select from '@/components/Select.svelte'
	import { toKebab } from '@/libs/utils'

	interface Purchase {
		reservationNumber: string
		customerName: string
		status: string
		model: string
		motor: string
		size: string
		arrivalDay: string
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
			arrivalDay: '12/11',
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
			arrivalDay: '2/11',
			marketPrice: 13244,
			sellingPrice: 3000
		},
		{
			reservationNumber: '8323-0804-5842',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDay: '12/11',
			marketPrice: 18348,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5843',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDay: '3/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5844',
			customerName: '田中　太郎',
			status: '未着手',
			model: '2M',
			motor: 'ヒューマン',
			size: '83M',
			arrivalDay: '12/11',
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
			arrivalDay: '12/11',
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
			arrivalDay: '12/11',
			marketPrice: 8756,
			sellingPrice: 5000
		},
		{
			reservationNumber: '8323-0804-5847',
			customerName: 'My company',
			status: '未着手',
			model: '3M',
			motor: 'キューマ',
			size: '83R',
			arrivalDay: '1/11',
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
		{ label: '入荷日', id: 'arrivalDay' },
		{ label: '相場', id: 'marketPrice' },
		{ label: '買取額', id: 'sellingPrice' }
	]
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
				</tr>
			</thead>

			<tbody class="tbody">
				{#each purchases as purchase}
					<tr class="trow">
						{#each tableHeaders as header}
							{#if header.id === 'status'}
								<td class="tdata">
									<Select
										options={['未着手', '進行中', '完了', '到着待ち', '失注']}
										bind:value={purchase.status}
									/>
								</td>
							{:else}
								<td class="tdata">{purchase[header.id]}</td>
							{/if}
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<footer class="section__footer">hello</footer>
</section>

<style lang="scss">
	.search-form {
		display: flex;
		justify-content: center;
		gap: 18px;
		margin-bottom: 20px;
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
</style>
