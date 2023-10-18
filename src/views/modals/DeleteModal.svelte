<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
</script>

<script lang="ts">
	export let phase: 'shown' | 'success' | 'error' = 'shown'

	const dispatch = createEventDispatcher()
	const onClick = (key: string) => dispatch('click', { key })
</script>

<div class="delete-modal">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="back" on:click={() => onClick('cancel')} />
	<div class="container">
		{#if phase === 'shown'}
			<p>本当に削除しますか？</p>
			<div class="btns">
				<div>
					<button class="secondary" on:click={() => onClick('cancel')}>キャンセル</button>
					<button class="primary" on:click={() => onClick('delete')}>削除</button>
				</div>
			</div>
		{:else}
			<p>{phase === 'success' ? '削除しました' : 'エラーが発生しました'}</p>
			<button on:click={() => onClick(phase)}
				>{phase === 'success' ? 'OK' : 'もう一度試す'}</button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.delete-modal {
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

			.btns {
				display: flex;
				align-items: center;
				justify-content: center;

				div {
					display: inline-flex;
				}

				button:last-child {
					background: var(--error);
					margin-left: 32px;
				}
			}

			> button {
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
