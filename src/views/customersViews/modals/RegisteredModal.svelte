<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	export let isOpened: boolean = false

	const handleConfirm = () => {
		isOpened = false
		window.location.href = '/customers/'
	}
</script>

<div class="modal-wrapper {isOpened ? '' : 'hidden'}">
	<div class="modal">
		<div class="modal__header">
			<h2 class="title">登録しました</h2>
		</div>

		<div class="modal__footer">
			<Button buttonClass={'btn--round'} handleClick={handleConfirm}>OK</Button>
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
