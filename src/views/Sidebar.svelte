<script lang="ts" context="module">
	import Icon from '@/components/Icon.svelte'
</script>

<script lang="ts">
	export let path: string
	export let authority: string

	const menus: { path: string; text: string }[] = [
		{ path: 'users', text: '社員一覧' },
		{ path: 'customers', text: '顧客管理' },
		{ path: 'purchases', text: '買取一覧' },
		{ path: 'negotiations', text: '商談一覧' },
		{ path: 'history', text: '変更履歴' },
		{ path: 'settings', text: '設定' }
	]

	if (authority !== 'admin') menus.shift()
</script>

<nav class="nav">
	<ul class="nav-menu">
		{#each menus as menu}
			<li class:active={`/${menu.path}` === path}>
				<a href={`/${menu.path}`}>
					<span class:invisible={`/${menu.path}` !== path}>
						<Icon icon={{ path: `icons/${menu.path}`, color: '#0093d0' }} />
					</span>
					<span class:invisible={`/${menu.path}` === path}>
						<Icon icon={{ path: `icons/${menu.path}` }} />
					</span>
					{menu.text}
				</a>
			</li>
		{/each}
	</ul>
	<span class="logout">
		<a href="/"><Icon icon={{ path: `icons/logout` }} />ログアウト</a>
	</span>
</nav>

<style lang="scss">
	.nav {
		position: relative;
		display: inline-block;
		height: calc(100vh - 64px);
		width: 200px;
		background: var(--primary-color);
		padding-top: 16px;

		> .nav-menu {
			list-style: none;

			> li {
				color: #fff;
				padding: 8px 24px;
				margin-bottom: 16px;

				&:last-of-type {
					margin-bottom: 0px;
				}
			}

			.active {
				background: #fff;
				color: var(--primary-color);
			}

			.invisible {
				display: none;

				// > :global(.svg-icon) {
				// 	width: 0;
				// 	height: 0;
				// 	visibility: hidden;
				// }
			}
		}

		.logout {
			position: absolute;
			bottom: 64px;
			color: #fff;
			padding: 0 24px;
		}

		a {
			display: flex;
			align-items: center;

			> span {
				display: flex;
				align-items: center;
			}

			> span,
			> :global(.svg-icon) {
				margin-right: 8px;
			}
		}
	}
</style>
