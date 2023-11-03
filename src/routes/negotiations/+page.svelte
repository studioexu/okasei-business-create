<script lang="ts" context="module"></script>

<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import { user } from '@/stores/users'

	const tableHeaders: { label: string; id: keyof DataIsShown | keyof Users }[] = [
		{ label: '施設名', id: 'customerName' },
		{ label: 'ステータス', id: 'status' },
		{ label: '商談開始日', id: 'firstTransaction' },
		{ label: '可能性', id: 'condition' },
		{ label: '流入', id: 'contact' },
		{ label: '納期', id: 'billingDate' },
		{ label: '入金予定', id: 'scheduledDeposit' },
		{ label: '成否日', id: 'successFailureDay' },
		{ label: '次回連絡日時', id: 'nextContact' },
		{ label: '最終連絡', id: 'lastContact' },
		{ label: '納品先', id: 'billingAddress' },
		{ label: '台数', id: 'numberOfBeds' },
		{ label: '見積金額(税抜)', id: 'billingEstimation' },
		{ label: '担当者名', id: 'personInCharge' },
		{ label: 'メモ', id: 'memo' },
		{ label: 'DM発送', id: 'shippingStatus' },
		{ label: 'PR動画', id: 'video' },
		{ label: 'delete', id: 'delete' }
	]

	interface DataIsShown {
		customerName: boolean
		status: boolean
		firstTransaction: boolean
		condition: boolean
		contact: boolean
		billingDate: boolean
		scheduledDeposit: boolean
		successFailureDay: boolean
		nextContact: boolean
		lastContact: boolean
		billingAddress: boolean
		numberOfBeds: boolean
		billingEstimation: boolean
		personInCharge: boolean
		memo: boolean
		shippingStatus: boolean
		video: boolean
		delete: boolean
	}

	interface Users {
		customerName: string
		status: string
		firstTransaction: string
		condition: string
		contact: string
		billingDate: string
		scheduledDeposit: string
		successFailureDay: string
		nextContact: string
		lastContact: string
		billingAddress: string
		numberOfBeds: string
		billingEstimation: string
		personInCharge: string
		memo: string
		shippingStatus: string
		video: string
		delete: string
	}

	const dataIsShown: DataIsShown = {
		customerName: true,
		status: true,
		firstTransaction: true,
		condition: true,
		contact: true,
		billingDate: true,
		scheduledDeposit: true,
		successFailureDay: true,
		nextContact: true,
		lastContact: true,
		billingAddress: true,
		numberOfBeds: true,
		billingEstimation: true,
		personInCharge: true,
		memo: true,
		shippingStatus: true,
		video: true,
		delete: true
	}

	const users: Users[] = [
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'A',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		},
		{
			customerName: 'hello world yeah yeah lod hakka lodo',
			status: '受注',
			firstTransaction: '2023.00.00',
			condition: 'B',
			contact: '新規FAX',
			billingDate: '6月',
			scheduledDeposit: '前払い',
			successFailureDay: '2023.05.30',
			nextContact: '2023.05.30 13:00',
			lastContact: '2023.05.30',
			billingAddress: '〒989-0276 宮城県白石市大手町2-1',
			numberOfBeds: '1台',
			billingEstimation: '13万',
			personInCharge: '山田太郎',
			memo: 'KA-9800　83Ｒセンターロック',
			shippingStatus: '郵送済み',
			video: '2023.05.30',
			delete: ''
		}
	]

	const handleChange = (e: any) => {
		const id: keyof DataIsShown = e.target.id

		dataIsShown[id] = e.target.checked
	}
</script>

<section class="section">
	<header class="section__header">
		<div class="container">
			<button class="primary">＋新規追加</button>
			<button class="primary">data to display</button>
			<button class="primary">縛り込み検索</button>
		</div>

		<div class="container data-to-dislay">
			{#each tableHeaders as header}
				<label for={header.id}>
					<input
						type="checkbox"
						name={header.id}
						id={header.id}
						checked
						on:change={handleChange}
					/>{header.label}
				</label>
			{/each}
		</div>
	</header>

	<div class="section__main">
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						{#each tableHeaders as header}
							{#if dataIsShown[header.id]}
								<th class="theader">{header.label}</th>
							{/if}
						{/each}
					</tr>
				</thead>

				<tbody class="tbody">
					{#each users as customer}
						<tr class="trow">
							{#each tableHeaders as header}
								{#if dataIsShown[header.id]}
									<td
										class="tdata {header.id} {header.id === 'condition'
											? header.id + '--' + customer[header.id]
											: ''}">{customer[header.id]}</td
									>
								{/if}
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
	.section {
		font-family: 'Noto Sans JP', sans-serif;
		color: var(--black);

		&__header {
			margin-bottom: 20px;
		}
	}

	button {
		margin: 0;
		&:first-child {
			margin-right: auto;
		}
	}

	.container {
		display: flex;
		justify-content: flex-end;
		gap: 18px;
	}

	.table-wrapper {
		height: calc((558 / 768) * 100vh);
		overflow-y: scroll;

		&::-webkit-scrollbar {
			background-color: transparent;
			width: 10px;
		}

		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: var(--primary-color);
			border-radius: 16px;
		}
	}

	.table {
		width: max-content;
		border-collapse: collapse;

		.tbody {
			background-color: #fff;
		}

		.theader {
			position: sticky;
			top: 0;
			height: 42px;
			font-weight: bold;
			font-family: 'Noto Sans JP';
			background-color: var(--background-color);
			color: var(--primary-color);
		}

		.trow {
			border-bottom: 1px solid var(--primary-color);

			&:last-child {
				border: none;
			}
		}

		.tdata {
			padding: 11px 22px;
			width: fit-content;
			text-align: center;

			&.customerName {
				max-width: 160px;
			}

			&.condition {
				font-weight: 900;
				&--A {
					color: var(--error);
				}

				&--B {
					color: var(--primary-color);
				}
			}
		}

		.tdata:nth-child(2n) {
			background-color: pink;
		}
	}
</style>
