<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
	import Icon from '@/components/Icon.svelte'

	const templateMenus: {
		path: string
		hasNew?: boolean
		subs?: string[]
		hasSubNew?: boolean
		text: string
	}[] = [
		{ path: 'users', hasNew: true, text: '社員一覧' },
		{ path: 'customers', hasNew: true, text: '顧客一覧' },
		{ path: 'purchases', hasNew: true, text: '買取一覧' },
		{ path: 'negotiations', hasNew: true, text: '商談一覧' },
		{ path: 'sales', text: '営業支援' },
		{ path: 'history', text: '変更履歴' },
		{ path: 'settings', subs: ['notification'], hasSubNew: true, text: '設定' }
	]

	const menus: { path: string; routes: string[]; regexp?: RegExp; text: string }[] =
		templateMenus.map(menu => {
			const path = `/${menu.path}`
			const { hasNew, subs, hasSubNew, text } = menu

			let regexp: RegExp | undefined = undefined

			if (hasNew) regexp = new RegExp(`^${path}\/[1-9]\d?$`)
			else if (hasSubNew) regexp = new RegExp(`^${path}\/.+\/[1-9]\d?$`)

			return {
				path,
				routes: [
					path,
					...(hasNew ? [`${path}/new`] : []),
					...(subs?.map(sub => `${path}/${sub}`) ?? []),
					...(subs && hasSubNew ? subs?.map(sub => `${path}/${sub}/new`) : [])
				],
				regexp,
				text
			}
		})
</script>

<script lang="ts">
	export let path: string
	const dispatch = createEventDispatcher()
</script>

<nav class="nav">
	<ul>
		{#each menus as menu}
			<li class:active={menu.routes.includes(path) || menu.regexp?.test(path)}>
				<a href={menu.path}>
					<span class:invisible={!menu.routes.includes(path) && !menu.regexp?.test(path)}>
						<Icon icon={{ path: menu.path, color: 'primary' }} />
					</span>
					<span class:invisible={menu.routes.includes(path) || menu.regexp?.test(path)}>
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
		<Icon icon={{ path: 'logout', color: '#fff' }} /><span>ログアウト</span>
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

		> ul {
			list-style: none;

			> li {
				color: #fff;
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
		}

		.logout {
			display: flex;
			align-items: center;
			position: absolute;
			bottom: 64px;
			padding: 0 24px;
			cursor: pointer;

			&:hover {
				opacity: 0.5;
			}

			> span {
				color: #fff;
				margin-left: 8px;
			}
		}

		a {
			display: flex;
			align-items: center;
			padding: 8px 24px;

			span {
				display: flex;
				align-items: center;
				margin-right: 8px;
			}
		}
	}
</style>
