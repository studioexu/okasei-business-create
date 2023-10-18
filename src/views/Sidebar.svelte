<script lang="ts" context="module">
	import Icon from '@/components/Icon.svelte'
</script>

<script lang="ts">
	export let path: string
	export let authority: string

	const menus: { path: string; routes: string[]; regexp?: RegExp; text: string }[] = [
		{
			path: 'users',
			routes: ['/users', '/users/[id]', '/users/new'],
			regexp: /^\/users\/[1-9]\d?$/,
			text: '社員一覧'
		},
		{
			path: 'customers',
			routes: ['/customers', '/customers/[id]', '/customers/new'],
			text: '顧客一覧'
		},
		{
			path: 'purchases',
			routes: ['/purchases', '/purchases/[id]', '/purchases/new'],
			text: '買取一覧'
		},
		{
			path: 'negotiations',
			routes: ['/negotiations', '/negotiations/[id]', '/negotiations/new'],
			text: '商談一覧'
		},
		{ path: 'history', routes: ['/history'], text: '変更履歴' },
		{ path: 'settings', routes: ['/settings'], text: '設定' }
	]

	if (authority !== 'admin') menus.shift()
</script>

<nav class="nav">
	<ul class="nav-menu">
		{#each menus as menu}
			<li class:active={menu.routes.includes(path) || menu.regexp?.test(path)}>
				<a href={menu.path}>
					<span class:invisible={!menu.routes.includes(path) && !menu.regexp?.test(path)}>
						<Icon icon={{ path: menu.path, color: '#0093d0' }} />
					</span>
					<span class:invisible={menu.routes.includes(path) || menu.regexp?.test(path)}>
						<Icon icon={{ path: menu.path }} />
					</span>
					{menu.text}
				</a>
			</li>
		{/each}
	</ul>
	<span class="logout">
		<a href="/"><Icon icon={{ path: 'logout' }} />ログアウト</a>
	</span>
</nav>

<style lang="scss">
	.nav {
		position: relative;
		display: inline-block;
		height: calc(100vh - 64px);
		width: 192px;
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

				&:hover {
					opacity: 0.5;
				}
			}

			.active {
				background: #fff;
				color: var(--primary-color);

				&:hover {
					opacity: 1;
				}
			}

			.invisible {
				display: none;
			}
		}

		.logout {
			position: absolute;
			bottom: 64px;
			color: #fff;
			padding: 0 24px;

			&:hover {
				opacity: 0.5;
			}
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
