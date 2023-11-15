<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { CustomerInfo } from '@/utils/customers/types'

	import Pagination from '@/views/Pagination.svelte'
	import Table from './components/Table.svelte'
	import SearchMenu from './components/SearchMenu.svelte'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'

	import { CustomerFactory } from '@/utils/customers/Factories/CustomerFactory'
	import { deleteCustomer } from '@/utils/customers/actions'
	import { currentApi } from '../../data/api'
	import { goto } from '$app/navigation'

	export let data

	let allCustomers: CustomerFactory[] = data.data.map(
		(customer: CustomerInfo) => new CustomerFactory(customer, 'customer')
	)

	let customersToDisplay = allCustomers.filter(customer => customer.isActive)
	let filteredCustomers: CustomerFactory[]
	let customersToDisplayOnPage: CustomerFactory[] = []

	let currentPage: number = 0
	let deletedCustomersAreShown = false

	$: filteredCustomers
	$: lastDataIndex =
		(currentPage + 1) * 6 - 1 >= customersToDisplay.length - 1
			? customersToDisplay.length - 1
			: (currentPage + 1) * 6 - 1
	$: firstDataIndex = currentPage * 6

	$: updatecustomersToDisplayOnPage(customersToDisplay, firstDataIndex, lastDataIndex)

	$: dividedUsers =
		customersToDisplay.length > 0
			? customersToDisplay.flatMap((_, i, self) => (i % 6 ? [] : [self.slice(i, i + 6)]))
			: []

	/**
	 * Update the data display according the current page.
	 * @param data: array of customer's information
	 * @param firstDataIndex: number, is the first customer we want to display from the data array
	 * @param lastDataIndex: number, is the last customer we want to display from the data array
	 */
	const updatecustomersToDisplayOnPage = (
		data: CustomerFactory[],
		firstCustomerIndex: number,
		lastCustomerIndex: number
	) => {
		customersToDisplayOnPage = []
		for (let i = firstCustomerIndex; i <= lastCustomerIndex; i++) {
			customersToDisplayOnPage = [...customersToDisplayOnPage, data[i]]
		}
	}

	/**
	 * The toggle is ON, we display all the customers (deleted and active).
	 * The toggle is OFF, We only display the active customers.
	 * We change the state of deletedCustomersAreShown.
	 * @param e
	 */
	const handleCheck = (e: any) => {
		deletedCustomersAreShown = e.target.checked

		if (deletedCustomersAreShown) {
			customersToDisplay = filteredCustomers === undefined ? allCustomers : filteredCustomers
		} else {
			customersToDisplay =
				filteredCustomers === undefined
					? allCustomers.filter(customer => customer.isActive)
					: filteredCustomers.filter(customer => customer.isActive)
		}
	}

	let isShown: boolean = false
	let currentUser: string | undefined = undefined
	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onClick = (event: { detail: { key: string } }) => {
		switch (event.detail.key) {
			case 'cancel':
				isShown = false
				break
			case 'delete':
				try {
					if (currentUser !== undefined) {
						deleteCustomer(currentUser, currentApi)

						allCustomers = allCustomers.filter(customer => {
							if (customer.custCD === currentUser) {
								customer.isActive = false
							}

							return customer
						})

						//update the displayed data depending if we want to display the deleted customers or not.
						if (deletedCustomersAreShown) {
							customersToDisplay = allCustomers
						} else {
							customersToDisplay = allCustomers.filter(customer => customer.isActive)
						}

						goto('/customers')
						phase = 'success'
					}
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

	const movePage = (event: { detail: { current: number } }): void => {
		currentPage = event.detail.current
	}
</script>

<section class="section section--customers-management" id="customers-management">
	{#if isShown}
		<DeleteModal {phase} on:click={onClick} />
	{/if}

	<header class="section__header">
		<SearchMenu
			bind:data={allCustomers}
			bind:customersToDisplay
			bind:filteredCustomers
			{deletedCustomersAreShown}
		/>

		<div class="container">
			<div class="toggle-wrapper">
				<label class="switch" for="checkbox">
					<input
						class="checkbox"
						type="checkbox"
						id="checkbox"
						name="checkbox"
						on:click={handleCheck}
					/>
					<span class="slider" />
				</label>
				<h3 class="switch-label">以前削除した施設も含む</h3>
			</div>

			<div class="button-wrapper">
				<button
					class="primary"
					on:click={() => {
						window.location.href = '/customers/new'
					}}
				>
					＋新規登録
				</button>
			</div>
		</div>
	</header>

	<div class="section__main">
		<Table {customersToDisplayOnPage} bind:currentUser bind:isShown />
	</div>

	<footer class="section__footer">
		<Pagination bind:current={currentPage} bind:pages={dividedUsers} on:click={movePage} />
	</footer>
</section>

<style lang="scss">
	.section {
		padding-bottom: 24px;
		color: var(--black);

		&__header {
			margin-bottom: 2rem;
		}

		&__footer {
			margin-top: 18px;
		}
	}

	.toggle-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;

		.checkbox {
			margin-right: 11px;
		}

		.switch-label {
			font-weight: 400;
			font-size: 18px;
		}

		.switch {
			position: relative;
			height: 24px;
			width: 40px;
			cursor: pointer;

			.checkbox {
				opacity: 0;
				width: 0;
				height: 0;
			}

			.slider {
				position: absolute;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				border-radius: 50px;
				background-color: rgb(200, 200, 200);
				transition: background-color 300ms ease-out;
			}

			.slider::before {
				position: absolute;
				content: ' ';
				width: 16px;
				height: 16px;
				background-color: #fff;
				left: 4px;
				top: 4px;
				border-radius: 100%;
				transition: transform 300ms ease-out;
			}

			.checkbox:checked {
				& + .slider {
					background-color: var(--primary);
					transition: background-color 300ms ease-out;
					&::before {
						transform: translateX(16px);
						transition: transform 300ms ease-out;
					}
				}
			}
		}
	}

	.container {
		display: flex;
		padding: 0 18px;
		justify-content: space-between;
		align-items: center;
	}
</style>
