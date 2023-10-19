<script lang="ts" context="module"></script>

<script lang="ts">
	import { create, deleteItem } from '../../../routes/customers/utils/actions'
	import { parseBeforeDelete } from '../../../routes/customers/utils/parsers'
	import Button from '@/components/customers/Button.svelte'
	import type { CustomerInfo } from '../../../routes/customers/utils/types'
	import { enhance } from '$app/forms'
	import type { CustomerFactory } from '@/routes/customers/utils/Factories/CustomerFactory'

	export let customersToDisplay: CustomerFactory[]
	export let displayDeleteCustomersIsChecked: boolean
	export let newData
	export let allCustomers: CustomerFactory[]
	$: customersToDisplay

	export let itemId: string = ''

	console.log(itemId)

	let isDeleted: boolean = false

	const handleCancel = () => {
		itemId = ''
		isDeleted = false
	}

	const handleSubmit = async (e: any) => {
		isDeleted = true

		allCustomers = allCustomers.filter(customer => {
			if (customer.custCD === itemId) {
				customer.isActive = false
				console.log(customer)
			}

			return customer
		})

		// newData = customersToDisplay

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
				<Button buttonClass={'btn--round'} handleClick={handleCancel}>OK</Button>
			{:else}
				<Button buttonClass={'btn--round'} handleClick={handleCancel}>キャンセル</Button>
				<form
					id="delete-form"
					class="delete-form"
					method="POST"
					action="customers?/delete"
					use:enhance
					on:submit={handleSubmit}
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
