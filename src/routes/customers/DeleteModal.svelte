<script lang="ts" context="module"></script>

<script lang="ts">
	import { create } from './utils/actions'
	import { parseBeforeDelete } from './utils/parsers'

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
	}
</script>

<div class="modal-wrapper {itemId === '' ? 'hidden' : ''}">
	<div class="modal">
		<div class="modal__header">
			<h2 class="title">本当にこの情報を削除しますか？</h2>
		</div>

		<div class="modal__footer">
			<button class="btn" on:click={handleCancel}>キャンセル</button>
			<form class="delete-form" method="POST" action="customers/?/delete">
				<input class="input" type="hidden" name="id" value={itemId} />
				<button class="btn btn--confirm" on:click={handleSubmit}>削除</button>
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

	.btn {
		width: 182px;
		height: 43px;
		border: 1px solid #707070;
		color: #707070;
		background-color: #fff;
		border-radius: 24px;

		&:hover {
			background-color: #707070;
			// border-color: rgb(47, 168, 225);
			color: #fff;
		}

		&--confirm {
			background-color: rgb(47, 168, 225);
			border-color: rgb(47, 168, 225);
			color: #fff;

			&:hover {
				background-color: red;
				border-color: red;
			}
		}
	}

	.hidden {
		display: none;
	}
</style>
