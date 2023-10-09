<script lang="ts">
	import TableRow from './TableRow.svelte'
	import type { CustomerInfo } from '../utils/types'
	export let itemId: string = ''
	export let dataToDisplay: CustomerInfo[]

	$: itemId
	$: dataToDisplay
</script>

{#if dataToDisplay.length === 0}
	<p class="no-data">データがございません。</p>
{:else}
	<table class="customer-list">
		<thead class="table-header">
			<tr class="row">
				<th>顧客番号</th>
				<th>施設名</th>
				<th>住所</th>
				<th>状態</th>
				<th>登録日</th>
				<th>編集</th>
				<th>削除</th>
			</tr>
		</thead>
		<tbody>
			{#each dataToDisplay as customer}
				<TableRow
					facilityName={customer.facilityName}
					status={customer.update !== undefined &&
					customer.update.status !== undefined &&
					customer.update.status !== ''
						? customer.update.status
						: customer.registration.status}
					updateDate={customer.update !== undefined &&
					customer.update.status !== undefined &&
					customer.update.status !== ''
						? customer.update.lastUpdatedDate
						: customer.registration.registrationDate}
					address={customer.address}
					id={customer.id}
					bind:itemId
				/>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	.customer-list {
		background-color: #fff;
		padding: 0 calc((18 / 1366) * 100vw);
		border-radius: 4px;
		width: 100%;
		border-spacing: 0;
	}

	.table-header {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		display: none;
	}
</style>
