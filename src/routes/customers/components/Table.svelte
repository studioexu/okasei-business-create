<script lang="ts">
	import TableRow from './TableRow.svelte'
	import type { CustomerInfo } from '../utils/types'
	import { slide } from 'svelte/transition'
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'

	export let itemId: string = ''
	export let dataToDisplay: CustomerFactory[]

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
				<!-- <th>状態</th> -->
				<th>登録日</th>
				<th>編集</th>
				<th>削除</th>
			</tr>
		</thead>
		<tbody>
			{#each dataToDisplay as customer}
				<TableRow
					facilityName={customer.custName}
					address={customer.address}
					bind:isActive={customer.isActive}
					id={customer.custCD}
					bind:itemId
					status={!customer.isActive
						? '削除'
						: customer.update.updateDate !== '' && customer.update.updateDate !== undefined
						? '更新'
						: '登録'}
					updateDate={customer.delete.deleteDate !== '' && customer.delete.deleteDate !== undefined
						? customer.deleteDateTime.date
						: customer.update.updateDate !== '' && customer.update.updateDate !== undefined
						? customer.updateDateTime.date
						: customer.registDateTime.date}
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
