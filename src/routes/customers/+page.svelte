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
	import { loadData } from '@/libs/actions.js'
	import { currentApi, currentKey } from '@/data/api.js'
	import { onMount } from 'svelte'

	export let data

	$: console.log(data)

	let pikachu

	onMount(async () => {
		const response = await loadData(currentApi, currentKey)
		pikachu = await response.json()
	})

	console.log(pikachu)

	// const pikachu = loadData(currentApi, '3affc4789c243911dbdb37adcabd4deb36c0eb4c')

	// console.log(pikachu)

	// let allCustomers: CustomerFactory[] = data.data.map(
	// 	customer => new CustomerFactory(customer, 'newApi')
	// )

	// let customersToDisplay = allCustomers.filter(customer => customer.isActive)
	// let filteredCustomers: CustomerFactory[]
	// let currentPage: number = 0
	// let deletedCustomersAreShown = false

	// $: currentPage
	// $: customersToDisplay
	// $: filteredCustomers
	// $: allCustomers

	// /**
	//  * The toggle is ON, we display all the customers (deleted and active).
	//  * The toggle is OFF, We only display the active customers.
	//  * We change the state of deletedCustomersAreShown.
	//  * @param e
	//  */
	// const handleCheck = (e: any) => {
	// 	deletedCustomersAreShown = e.target.checked

	// 	if (deletedCustomersAreShown) {
	// 		customersToDisplay = filteredCustomers === undefined ? allCustomers : filteredCustomers
	// 	} else {
	// 		customersToDisplay =
	// 			filteredCustomers === undefined
	// 				? allCustomers.filter(customer => customer.isActive)
	// 				: filteredCustomers.filter(customer => customer.isActive)
	// 	}

	// 	currentPage = 0
	// }

	// // DELETE MODAL

	// let isShown: boolean = false
	// let currentUser: string | undefined = undefined
	// let phase: 'shown' | 'success' | 'error' = 'shown'

	// const onClick = (event: { detail: { key: string } }) => {
	// 	switch (event.detail.key) {
	// 		case 'cancel':
	// 			isShown = false
	// 			break
	// 		case 'delete':
	// 			try {
	// 				if (currentUser !== undefined) {
	// 					const customer = allCustomers.find(
	// 						customer => customer.custCD.toString() === currentUser
	// 					)

	// 					if (customer) {
	// 						customer.isActive = false
	// 						customer.delete.deleteDate = getDateTime()
	// 						customer.delete.deleteBy = 1

	// 						const submitBtn = document.getElementById('submit-btn')
	// 						submitBtn?.click()
	// 					}

	// 					//update the displayed data depending if we want to display the deleted customers or not.
	// 					if (deletedCustomersAreShown) {
	// 						customersToDisplay = allCustomers
	// 					} else {
	// 						customersToDisplay = allCustomers.filter(customer => customer.isActive)
	// 					}

	// 					goto('/customers')
	// 					phase = 'success'
	// 				}
	// 			} catch (error) {
	// 				console.log(error)
	// 				phase = 'error'
	// 			}
	// 			break

	// 		case 'success':
	// 			isShown = false
	// 			phase = 'shown'
	// 			break

	// 		case 'error':
	// 			phase = 'shown'
	// 			break
	// 	}
	// }

	// // PAGINATION

	// /**
	//  * update the current page number
	//  * @param event: get the current number of the page
	//  */
	// const movePage = (event: { detail: { page: number } }): void => {
	// 	currentPage = event.detail.page
	// }

	// $: dividedUsers =
	// 	customersToDisplay.length > 0
	// 		? customersToDisplay.flatMap((_, i, self) => (i % 6 ? [] : [self.slice(i, i + 6)]))
	// 		: []
</script>

<!-- <section class="section section--customers-management" id="customers-management">
	<h1>Hello</h1>
	{#if isShown}
		<form
			id="delete-form"
			method="POST"
			action="/customers?/delete"
			use:enhance
			on:submit|preventDefault
		>
			<input type="hidden" name="id" value={currentUser} />
			<button type="submit" id="submit-btn" form="delete-form" class="del-btn primary"
				>delete</button
			>

			<DeleteModal {phase} on:click={onClick} />
		</form>
	{/if}

	<header class="section__header">
		<SearchMenu
			bind:data={allCustomers}
			bind:customersToDisplay
			bind:filteredCustomers
			{deletedCustomersAreShown}
			bind:currentPage
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
		<Table
			bind:customersToDisplayOnPage={dividedUsers[currentPage]}
			bind:currentUser
			bind:isShown
		/>
	</div>

	<footer class="section__footer">
		<Pagination bind:current={currentPage} bind:pages={dividedUsers} on:click={movePage} />
	</footer>
</section> -->

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

	.del-btn {
		z-index: 999;
	}
</style>
