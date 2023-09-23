<script lang="ts" context="module"></script>

<script lang="ts">
	export let pageTitle: string
</script>

<header class="header">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
		<span class="vertical-line" />
		<span class="large">{pageTitle}</span>
	</div>
	<div class="right">
		<span>管理者</span>
		<span>000000</span>
		<span>山田太郎</span>
	</div>
</header>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 60px;
		background: #fff;
		margin: 0 32px;

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

			> .large {
				color: #0093d0;
			}
		}

		> right {
		}
	}
</style>
