<script lang="ts" context="module"></script>

<script lang="ts">
	import { create, deleteItem } from './utils/actions'
	import { parseBeforeDelete } from './utils/parsers'
	import Button from '@/components/customers/Button.svelte'

	export let itemId: string = ''

	const handleCancel = () => {
		itemId = ''
	}

	const handleSubmit = (e: any) => {
		const id = e.target.closest('.delete-form').querySelector('.input').value

		fetch('http://localhost:3000/customers/' + id, {
			method: 'GET',
			headers: { 'Content-type': 'application/json;charset=UTF-8' }
		})
			.then(res => {
				return res.json()
			})
			.then(newData => {
				const parsedCustomer = parseBeforeDelete(newData)
				create(parsedCustomer, 'http://localhost:3000/deletedCustomers/')
			})

		itemId = ''
	}
</script>

<div class="modal-wrapper {itemId === '' ? 'hidden' : ''}">
	<div class="modal">
		<div class="modal__header">
			<h2 class="title">本当にこの情報を削除しますか？</h2>
		</div>

		<div class="modal__footer">
			<Button buttonClass={'btn--round'} handleClick={handleCancel}>キャンセル</Button>
			<form id="delete-form" class="delete-form" method="POST" action="customers/?/delete">
				<input class="input" type="hidden" name="id" value={itemId} />
				<Button
					buttonClass={'btn--round btn--round--delete'}
					handleClick={handleSubmit}
					form={'delete-form'}
				>
					削除
				</Button>
			</form>
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
