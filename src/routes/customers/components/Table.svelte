<script lang="ts">
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'

	import TableRow from './TableRow.svelte'
	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'

	export let currentUser: string = ''
	export let dataToDisplay: CustomerFactory[]
	export let isShown: boolean

	const [send, receive] = crossfade({})

	$: dataToDisplay
	$: currentUser

	/**
	 * When clicked on the row, the user is redirected to the profile of the customer.
	 * @param e: event to get the right the class of the parent element to be sure it isn't the erase button or update button.
	 */
	const handleRowClick = (e: any) => {
		const classList = e.target.closest('.data').classList.value
		const rowId = e.target.closest('.row').getAttribute('data-id')

		if (classList.includes('update') || classList.includes('erase')) {
			return
		}
		window.location.href = '/customers/' + rowId
	}
</script>

{#if dataToDisplay.length === 0}
	<p class="no-data">データがございません。</p>
{:else}
	<div class="table-wrapper">
		<table class="customer-list">
			<thead class="table-header">
				<tr class="row">
					<th>顧客番号</th>
					<th>施設名</th>
					<th>住所</th>
					<th>登録日</th>
					<th>編集</th>
					<th>削除</th>
				</tr>
			</thead>
			<tbody>
				{#each dataToDisplay as customer (customer.custCD)}
					<tr
						class="row {customer.isActive ? '' : 'deleted'}"
						data-id={customer.custCD}
						in:receive={{ key: customer.custCD }}
						out:send={{ key: customer.custCD }}
						animate:flip={{ duration: 1000, easing: quintOut }}
						on:click={handleRowClick}
					>
						<TableRow
							customerName={customer.custName}
							address={customer.address}
							bind:isActive={customer.isActive}
							id={customer.custCD}
							status={!customer.isActive
								? '削除'
								: customer.update.updateDate !== '' && customer.update.updateDate !== undefined
								? '更新'
								: '登録'}
							updateDate={customer.delete.deleteDate !== '' &&
							customer.delete.deleteDate !== undefined
								? customer.deleteDateTime.date
								: customer.update.updateDate !== '' && customer.update.updateDate !== undefined
								? customer.updateDateTime.date
								: customer.registDateTime.date}
							bind:currentUser
							bind:isShown
						/>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style lang="scss">
	.table-wrapper {
		padding: 0 18px;
		color: var(--black);
		background-color: #fff;
		border-radius: 16px;
		overflow: hidden;
	}

	.customer-list {
		width: 100%;
		padding: 0 calc((18 / 1366) * 100vw);
		background-color: transparent;
		border-radius: 4px;
		border-spacing: 0;
		border-collapse: collapse;
	}

	.table-header {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		display: none;
	}

	.row {
		position: relative;
		cursor: pointer;
		background-color: #fff;
		border-bottom: var(--primary-color) 1px solid;

		&.deleted {
			background-color: rgb(229, 229, 229);
		}

		&:hover {
			background-color: hsl(199, 75%, 53%, 0.1);
		}

		&:last-child {
			border-bottom: none;
		}
	}
</style>
