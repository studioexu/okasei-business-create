<script lang="ts">
	export let title: string
	export let authority: string
	export let id: string
	export let name: string
</script>

<header class="header">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
		<span class="vertical-line" />
		<h1 class="font-large">{title}</h1>
	</div>
	<div class="right">
		{#if authority === 'admin'}
			<span class="authority">管理者</span>
		{/if}
		<span>社員番号: {id}</span>
		<span>名前: {name}</span>
	</div>
</header>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64px;
		background: #fff;
		padding: 0 64px;

		> .left {
			display: flex;
			align-items: center;

			> .logo {
				height: 36px;
				width: auto;
			}

			> .vertical-line {
				height: 36px;
				width: 1px;
				background: #ccc;
				margin: 0 32px;
			}

			> .font-large {
				color: var(--primary-color);
			}
		}

		> .right {
			display: flex;
			align-items: center;

			span:not(.authority) {
				margin-left: 16px;
			}

			.authority {
				background: var(--primary-color);
				color: #fff;
				padding: 4px 8px;
				border-radius: 100px;
			}
		}
	}
</style>
