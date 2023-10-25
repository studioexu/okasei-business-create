<script lang="ts" context="module"></script>

<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import { enhance } from '$app/forms'
	import type { CustomerFactory } from '@/routes/customers/utils/Factories/CustomerFactory'

	export let customersToDisplay: CustomerFactory[]
	export let displayDeleteCustomersIsChecked: boolean
	export let newData
	export let allCustomers: CustomerFactory[]
	export let itemId: string = ''

	$: customersToDisplay

	let isDeleted: boolean = false

	const handleCloseModal = () => {
		itemId = ''
		isDeleted = false
	}

	/**
	 * After the customer is put not active(i.e. deleted), we displayed the modal with isDeleted=true.
	 * Then, we update the displayed information.
	 * @param e
	 */
	const handleDelete = async (e: any) => {
		//display the modal
		isDeleted = true

		//update the data in allCustomers
		allCustomers = allCustomers.filter(customer => {
			if (customer.custCD === itemId) {
				customer.isActive = false
			}

			return customer
		})

		//update the displayed data depending if we want to display the deleted customers or not.
		if (displayDeleteCustomersIsChecked) {
			customersToDisplay = allCustomers
			newData = customersToDisplay
		} else {
			customersToDisplay = allCustomers.filter(customer => customer.isActive)
			newData = customersToDisplay
		}
	}
</script>

<div class="modal-wrapper {itemId === '' ? 'hidden' : ''}">
	<div class="modal">
		<div class="modal__header">
			<h2 class="title">{isDeleted ? '削除しました' : '本当にこの情報を削除しますか？'}</h2>
		</div>

		<div class="modal__footer">
			{#if isDeleted}
				<Button buttonClass={'btn--round'} handleClick={handleCloseModal}>OK</Button>
			{:else}
				<Button buttonClass={'btn--round'} handleClick={handleCloseModal}>キャンセル</Button>
				<form
					id="delete-form"
					class="delete-form"
					method="POST"
					action="customers?/delete"
					use:enhance
					on:submit={handleDelete}
				>
					<input class="input" type="hidden" name="id" value={itemId} />
					<Button buttonClass={'btn--round btn--round--delete'} form="delete-form">削除</Button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.modal-wrapper {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: hsl(0, 0%, 0%, 0.5);
		z-index: 100;
	}

	.modal {
		background-color: #fff;
		padding: 3rem 4rem 2rem 4rem;
		width: auto;
		border-radius: 5px;
		&__header {
			text-align: center;
			.title {
				font-size: 18px;
			}
		}
		&__footer {
			display: flex;
			justify-content: center;
			margin-top: 1.75rem;
			gap: 1.5rem;
		}
	}

	.hidden {
		display: none;
	}
</style>
