<script lang="ts" context="module">
</script>

<script lang="ts">
	import Pagination from '@/views/Pagination.svelte'
	import Table from '@/views/customersViews/Table.svelte'
	import SearchMenu from '@/views/customersViews/SearchMenu.svelte'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'

	import { CustomerFactory } from '@/Factories/CustomerFactory'
	import { goto } from '$app/navigation'
	import { getDateTime } from '@/libs/formatters'
	import { enhance } from '$app/forms'

	export let data

	let allCustomers: CustomerFactory[] = data.data.map(
		customer => new CustomerFactory(customer, 'APIv1')
	)

	console.log(allCustomers)

	let customersToDisplay = allCustomers.filter(customer => customer.isActive)
	let filteredCustomers: CustomerFactory[]
	let deletedCustomersAreShown = false

	$: currentPage = 0
	$: customersToDisplay
	$: filteredCustomers
	$: allCustomers

	/**
	 * The toggle is ON, we display all the customers (deleted and active).
	 * トグルがONであれば、顧客を全員表示する。（削除された顧客もアクティブの顧客も）
	 * The toggle is OFF, We only display the active customers.
	 * トグルがONであれば、アクティブの顧客のみ表示する。
	 * @param deletedCustomersAreShown: boolean
	 */
	const displayCustomers = (deletedCustomersAreShown: boolean) => {
		const customers = filteredCustomers === undefined ? allCustomers : filteredCustomers

		deletedCustomersAreShown
			? (customersToDisplay = customers)
			: (customersToDisplay = customers.filter(customer => customer.isActive))
	}

	/**
	 * When deletedCustomersAreShown is modified, the function will be called.
	 * It will set the current page to 0 and call displayCustomers to display the right customers.
	 * deletedCustomersAreShownが変更があれば、HandleCheckのファンクションをコールする。
	 * 当ページを０にして、正しい顧客を表示するためにdisplayCustomersをコールする。
	 * @param deletedCustomersAreShown: boolean
	 */
	const handleCheck = (deletedCustomersAreShown: boolean, companyIsShown: boolean) => {
		// displayCustomers(deletedCustomersAreShown)
		getCustomersToDisplay(companyIsShown, deletedCustomersAreShown)
		currentPage = 0
	}

	$: handleCheck(deletedCustomersAreShown, companyIsShown)

	// DELETE MODAL

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
						const customer = allCustomers.find(customer => customer.id.toString() === currentUser)

						if (customer) {
							customer.isActive = false
							customer.delete.deleteDate = getDateTime()
							customer.delete.deleteBy = 1

							const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement
							submitBtn?.click()
						}

						// displayCustomers(deletedCustomersAreShown)
						getCustomersToDisplay(companyIsShown, deletedCustomersAreShown)

						goto('/customers')
						phase = 'success'
					}
				} catch (error) {
					console.log(error)
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

	// PAGINATION

	/**
	 * update the current page number
	 * @param event: get the current number of the page
	 */
	const movePage = (event: { detail: { page: number } }): void => {
		currentPage = event.detail.page
	}

	$: dividedCustomers =
		customersToDisplay.length > 0
			? customersToDisplay.flatMap((_, i, self) => (i % 6 ? [] : [self.slice(i, i + 6)]))
			: []

	$: companyIsShown = true

	/**
	 * Filter the customers depending on the options selected: customer's type (business or individual), show the deleted customers.
	 * 選択したオプションによる顧客を表示する：顧客タイプ（法人もしくは個人）、削除された顧客。
	 * @param companyIsShown:boolean
	 * @param deletedCustomersAreShown:boolean
	 */
	export const getCustomersToDisplay = (
		companyIsShown: boolean,
		deletedCustomersAreShown: boolean
	) => {
		let customers = filteredCustomers === undefined ? allCustomers : filteredCustomers

		customers = getCustomersByType(customers, companyIsShown)
		customers = getDeletedCustomers(customers, deletedCustomersAreShown)

		customersToDisplay = customers
	}

	/**
	 * It will filter the type of customers the user wants to display (Individual or Company)
	 * ユーザーを選び、タイプによる顧客を表示する（法人もしくは個人）。
	 * @param customers: CustomerFatacory[], the array of customers which is going to be filtered
	 * @param companyIsShown: boolean
	 */
	const getCustomersByType = (customers: CustomerFactory[], companyIsShown: boolean) => {
		companyIsShown
			? (customers = customers.filter(customer => customer.custType === 'C'))
			: (customers = customers.filter(customer => customer.custType === 'I'))

		return customers
	}

	/**
	 * The toggle is ON, we display all the customers (deleted and active).
	 * トグルがONであれば、顧客を全員表示する。（削除された顧客もアクティブの顧客も）
	 * The toggle is OFF, We only display the active customers.
	 * トグルがONであれば、アクティブの顧客のみ表示する。
	 * @param customers: CustomerFatacory[], the array of customers which is going to be filtered
	 * @param deletedCustomersAreShown: boolean
	 */
	const getDeletedCustomers = (customers: CustomerFactory[], deletedCustomersAreShown: boolean) => {
		deletedCustomersAreShown
			? (customers = customers)
			: (customers = customers.filter(customer => customer.isActive))

		return customers
	}
</script>

<section class="section section--customers-management" id="customers-management">
	{#if isShown}
		<form
			method="POST"
			action="/customers?/delete"
			name="delete-form"
			id="delete-form"
			use:enhance
			on:submit|preventDefault
		>
			<input type="hidden" name="id" value={currentUser} />
			<button type="submit" id="submit-btn" form="delete-form" class="del-btn primary">
				delete
			</button>
		</form>

		<DeleteModal {phase} on:click={onClick} />
	{/if}

	<header class="section__header">
		<SearchMenu
			bind:data={allCustomers}
			bind:customersToDisplay
			bind:filteredCustomers
			bind:currentPage
			bind:deletedCustomersAreShown
			bind:companyIsShown
		/>

		<div class="container">
			<div class="toggle-wrapper">
				<label class="switch" for="checkbox">
					<input
						class="checkbox"
						type="checkbox"
						id="checkbox"
						name="checkbox"
						bind:checked={deletedCustomersAreShown}
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

		<label for="display-comapany">
			<input
				type="checkbox"
				name="display-comapany"
				id="display-comapany"
				bind:checked={companyIsShown}
			/>
			法人表示
		</label>
	</header>

	<div class="section__main">
		<Table
			bind:customersToDisplayOnPage={dividedCustomers[currentPage]}
			bind:currentUser
			bind:isShown
			bind:companyIsShown
		/>
	</div>

	<footer class="section__footer">
		<Pagination bind:current={currentPage} bind:pages={dividedCustomers} on:click={movePage} />
	</footer>
</section>

<style lang="scss">
	.section {
		padding-bottom: 24px;

		&__header {
			margin-bottom: 2rem;
		}

		&__footer {
			margin-top: 18px;
		}
	}

	.container {
		display: flex;
		padding: 0 18px;
		justify-content: space-between;
		align-items: center;
	}

	.toggle-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;
		color: var(--black);

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
</style>
