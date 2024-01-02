<script lang="ts">
	import type { CustomerFactory } from '@/Factories/CustomerFactory'

	import { crossfade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
	import { quintOut } from 'svelte/easing'
	import Icon from '@/components/Icon.svelte'

	export let currentUser: string = ''
	export let customersToDisplayOnPage: CustomerFactory[]
	export let isShown: boolean
	export let companyIsShown: boolean

	const [send, receive] = crossfade({})

	$: customersToDisplayOnPage
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

	const handleDeleteItem = (e: any) => {
		isShown = true
		currentUser = e.target.closest('.row').id
	}

	const handleEditItem = (e: any) => {
		const id = e.target.closest('.row').id
		window.location.href = '/customers/' + id + '/edit'
	}
</script>

{#if customersToDisplayOnPage === undefined}
	<p class="no-data">データがございません。</p>
{:else}
	<div class="table-wrapper">
		<table class="customer-list">
			<thead class="table-head">
				<tr class="row">
					<th class="theader">顧客番号</th>
					{#if companyIsShown}
						<th class="theader">法人名</th>
						<th class="theader">施設名</th>
					{:else}
						<th class="theader">顧客名</th>
					{/if}
					<th class="theader">住所</th>
					<th class="theader">登録日</th>
					<th class="theader">編集</th>
					<th class="theader">削除</th>
				</tr>
			</thead>
			<tbody>
				{#each customersToDisplayOnPage as customer (customer.id)}
					<tr
						class="row {customer.isActive ? '' : 'deleted'}"
						data-id={customer.id}
						id={customer.id}
						in:receive={{ key: customer.id }}
						out:send={{ key: customer.id }}
						animate:flip={{ duration: 1000, easing: quintOut }}
						on:click={handleRowClick}
					>
						<td class="data customer-number">{customer.id}</td>

						{#if companyIsShown}
							<td class="data corporate-name">{customer.corporateName}</td>
						{/if}

						<td class="data facility-name">{customer.custName}</td>

						<td class="data address">{customer.address.prefecture}{customer.address.city}</td>

						{#if !customer.isActive}
							<td class="data update-date">{'削除'}日 {customer.deleteDateTime.date}</td>
						{:else if customer.update.updateDate !== '' && customer.update.updateDate !== undefined}
							<td class="data update-date">{'更新'}日 {customer.updateDateTime.date}</td>
						{:else}
							<td class="data update-date">{'登録'}日 {customer.registDateTime.date}</td>
						{/if}

						<td class="data update">
							<button class="btn {customer.isActive ? '' : 'disabled'}" on:click={handleEditItem}>
								{#if customer.isActive}
									<Icon icon={{ path: 'edit', color: '#0093d0' }} />
								{:else}
									<Icon icon={{ path: 'edit', color: 'rgb(200, 200, 200)' }} />
								{/if}
							</button>
						</td>

						<td class="data erase">
							<button class="btn {customer.isActive ? '' : 'disabled'}" on:click={handleDeleteItem}>
								{#if customer.isActive}
									<Icon icon={{ path: 'delete', color: '#0093d0' }} />
								{:else}
									<Icon icon={{ path: 'delete', color: 'rgb(200, 200, 200)' }} />
								{/if}
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style lang="scss">
	.table-wrapper {
		color: var(--black);
		background-color: #fff;
		border-radius: 16px;
		overflow: hidden;
	}

	.table-head {
		.theader {
			font-weight: bold;
			background-color: var(--back);
			color: var(--primary);
		}
	}

	.customer-list {
		width: 100%;
		padding: 0 calc((18 / 1366) * 100vw);
		background-color: transparent;
		border-radius: 4px;
		border-spacing: 0;
		border-collapse: collapse;

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
	}

	.data {
		text-align: left;
		padding: 18px calc((27 / 1366) * 100vw);
		border-bottom: var(--primary-color) 1px solid;
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

	.disabled {
		pointer-events: none;
	}
</style>
