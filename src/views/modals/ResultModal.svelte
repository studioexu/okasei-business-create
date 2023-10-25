<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let isSucceeded: boolean = false

	const dispatch = createEventDispatcher()
	const onClick = () => dispatch('click')
</script>

<div class="result-modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="back" on:click={onClick} />
	<div class="container">
		<p>{isSucceeded ? '登録しました' : 'エラーが発生しました'}</p>
		<button on:click={onClick}>{isSucceeded ? 'OK' : 'もう一度試す'}</button>
	</div>
</div>

<style lang="scss">
	.result-modal {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;

		.back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: var(--modal-back);
			cursor: pointer;
		}

		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 480px;
			background: #fff;
			padding: 32px;
			border-radius: 16px;

			p {
				text-align: center;
				margin-bottom: 32px;
			}

			button {
				min-width: 112px;
				background: #fff;
				color: var(--black);
				padding: 16px 24px;
				border-radius: 8px;
				border: 1px solid var(--black);
			}
		}
	}
</style>
