<script lang="ts">
	import TableRow from './TableRow.svelte'
	import type { CompanyInfo } from '../utils/types'
	import { update } from '../utils/actions'
	export let data: CompanyInfo[]
	$: data

	export let dataToDisplay: CompanyInfo[]
	export let newData: CompanyInfo[]
	$: newData
	$: dataToDisplay

	console.log(data)
	data.map((company: CompanyInfo) => {
		console.log(company.update !== undefined && company.update.status !== '')
	})
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
			{#each dataToDisplay as company}
				<TableRow
					bind:data
					bind:newData
					facilityName={company.facilityName}
					status={company.update !== undefined && company.update.status !== ''
						? company.update.status
						: company.registration.status}
					updateDate={company.update !== undefined && company.update.status !== ''
						? company.update.lastUpdatedDate
						: company.registration.registrationDate}
					address={company.address}
					id={company.id}
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
