<script lang="ts">
	import TableRow from './TableRow.svelte'
	import type { CustomerFactory } from '../utils/Factories/CustomerFactory'
	import { crossfade, fade, fly } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { backIn, bounceIn, bounceOut, quintIn, quintOut } from 'svelte/easing'

	export let itemId: string = ''
	export let dataToDisplay: CustomerFactory[]

	const [send, receive] = crossfade({})

	$: itemId
	$: dataToDisplay

	/**
	 * When clicked on the row, the user is redirected to the profile of the customer.
	 * @param e: event to get the right the class of the parent element to be sure it isn't the erase button or update button.
	 */
	const handleRowClick = (e: any) => {
		const classList = e.target.closest('.data').classList.value
		const rowId = e.target.closest('.row').getAttribute('data-id')

		console.log(rowId)

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
					<!-- <th>状態</th> -->
					<th>登録日</th>
					<th>編集</th>
					<th>削除</th>
				</tr>
			</thead>
			<tbody>
				<!-- <slot /> -->
				{#each dataToDisplay as customer (customer.custCD)}
					<!-- <div in:receive={{ key: customer.custCD }} out:send={{ key: customer.custCD }} animate:flip> -->
					<tr
						class="row {customer.isActive ? '' : 'deleted'}"
						in:receive={{ key: customer.custCD }}
						out:send={{ key: customer.custCD }}
						animate:flip={{ duration: 1000, easing: quintOut }}
						data-id={customer.custCD}
						on:click={handleRowClick}
					>
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
							updateDate={customer.delete.deleteDate !== '' &&
							customer.delete.deleteDate !== undefined
								? customer.deleteDateTime.date
								: customer.update.updateDate !== '' && customer.update.updateDate !== undefined
								? customer.updateDateTime.date
								: customer.registDateTime.date}
						/>

						<!-- </div> -->
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style lang="scss">
	.table-wrapper {
		border-radius: 3px;
		overflow: hidden;
		padding: 0 18px;
		background-color: #fff;
	}
	.customer-list {
		padding: 0 calc((18 / 1366) * 100vw);
		border-radius: 4px;
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		background-color: transparent;
	}

	.table-header {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		display: none;
	}

	.row {
		position: relative;
		// display: block;
		cursor: pointer;
		// background-color: pink;
		// transform-origin: 0 0;
		border-bottom: #2fa8e1 1px solid;
		background-color: #fff;
		// padding: 0 50px;

		&.deleted {
			background-color: rgb(229, 229, 229);
			// &::before {
			// 	content: ' ';
			// 	position: absolute;
			// 	top: 0;
			// 	left: -18px;
			// 	background-color: red;
			// 	width: 120%;
			// 	height: 100%;
			// 	z-index: -1;
			// }

			// animation: deleted 2000ms forwards;

			.data {
				.btn {
					pointer-events: none;
				}
			}
		}

		&:hover {
			background-color: hsl(199, 75%, 53%, 0.1);
		}

		&:last-child {
			border-bottom: none;
		}
	}
</style>
