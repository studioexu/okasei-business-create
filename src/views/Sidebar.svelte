<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
	import Icon from '@/components/Icon.svelte'
</script>

<script lang="ts">
	export let path: string

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
	const checkIsActive = (routes: string[], regexp?: RegExp, path: string = '') =>
		routes.includes(path) || regexp?.test(path)
	const dispatch = createEventDispatcher()
</script>

<nav class="nav">
	<ul class="nav-menu">
		{#each menus as menu}
			<li class:active={checkIsActive(menu.routes, menu.regexp, path)}>
				<a href={menu.path}>
					<span class:invisible={!checkIsActive(menu.routes, menu.regexp, path)}>
						<Icon icon={{ path: menu.path, color: '#0093d0' }} />
					</span>
					<span class:invisible={checkIsActive(menu.routes, menu.regexp, path)}>
						<Icon icon={{ path: menu.path, color: '#fff' }} />
					</span>
					{menu.text}
				</a>
			</li>
		{/each}
	</ul>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<span class="logout" on:click={() => dispatch('click')}>
		<Icon icon={{ path: 'logout', color: '#fff' }} />ログアウト
	</span>
</nav>

<style lang="scss">
	.nav {
		position: relative;
		display: inline-block;
		height: calc(100vh - 64px);
		width: 192px;
		background: var(--primary);
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
				color: var(--primary);

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

			span {
				display: flex;
				align-items: center;
				margin-right: 8px;
			}
		}

		span {
			display: flex;
			align-items: center;
			cursor: pointer;

			:global(.svg-icon) {
				margin-right: 8px;
			}
		}
	}
</style>
