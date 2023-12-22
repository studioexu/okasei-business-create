<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
	import Icon from '@/components/Icon.svelte'
	import type { Notifications } from '@/libs/notificationTypes'

	const titles: { path: string | RegExp; title: string }[] = [
		{ path: '/users', title: '社員一覧' },
		{ path: '/users/new', title: '新規社員登録' },
		{ path: /^\/users\/[1-9]\d?$/, title: '社員情報編集' },
		{ path: '/customers', title: '顧客一覧' },
		{ path: '/customers/new', title: '新規顧客登録' },
		{ path: /\/customers\/+/, title: '顧客情報編集' },
		{ path: '/purchases', title: '買取一覧' },
		{ path: '/purchases/new', title: '新規買取登録' },
		{ path: /\/customers\/[1-9]\d?$/, title: '買取情報編集' },
		{ path: '/negotiations', title: '商談一覧' },
		{ path: '/negotiations/new', title: '新規商談登録' },
		{ path: /\/negotiations\/[1-9]\d?$/, title: '商談情報編集' },
		{ path: '/sales', title: '営業支援' },
		{ path: '/history', title: '変更履歴' },
		{ path: '/settings', title: '設定' },
		{ path: /\/settings\/notification(?:\/(\d+))?$/, title: 'お知らせ設定' },
		{ path: '/settings/notification/new', title: 'お知らせ新規登録' },
		{ path: '/kanban', title: 'Kanbanテスト' }
	]
</script>

<script lang="ts">
	export let path: string
	export let notifications: Notifications
	export let isAdmin: boolean
	export let id: string
	export let name: string

	$: title =
		titles.find(
			obj =>
				(typeof obj.path === 'string' && obj.path === path) ||
				(typeof obj.path !== 'string' && obj.path.test(path))
		)?.title ?? ''

	$: numberOfUnread = notifications
		.map(notification => (notification.hasRead ? notification : undefined))
		.filter(notification => notification)

	let isShown = false
	const dispatch = createEventDispatcher()
	const onClick = () => {
		isShown = !isShown
		dispatch('click', { isShown: isShown })
	}
</script>

<header class="header">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
		<span class="vertical-line" />
		<h1 class="font-large">{title}</h1>
	</div>
	<div class="right">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span class="notification" on:click={onClick}>
			{#if numberOfUnread.length > 0}
				<span class="badge">
					<Icon icon={{ path: 'ringing-bell' }} />
					<span>{numberOfUnread.length}</span>
				</span>
			{:else}
				<Icon icon={{ path: 'bell' }} />
			{/if}
		</span>
		{#if isAdmin}
			<span class="authority">管理者</span>
		{/if}
		{#if id !== '' && name !== ''}
			<span>社員番号: {id}</span>
			<span>名前: {name}</span>
		{/if}
	</div>
</header>

<style lang="scss">
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		height: 64px;
		background: #fff;
		padding: 0 64px;
		z-index: 100;

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
				background: var(--gray);
				margin: 0 32px;
			}

			> .font-large {
				color: var(--primary);
			}
		}

		> .right {
			display: flex;
			align-items: center;

			> span {
				margin-right: 16px;

				&:last-of-type {
					margin-right: 0;
				}

				&.notification {
					display: flex;
					align-items: center;
					position: relative;
					margin-right: 16px;
					cursor: pointer;

					&:hover {
						opacity: 0.5;
					}

					> .badge {
						position: relative;
						display: flex;
						align-items: center;

						> span {
							display: inline-flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							top: 0;
							right: 0;
							width: 21px;
							height: 21px;
							background: var(--primary);
							font-size: 12px;
							color: #fff;
							border-radius: 14px;
						}
					}

					:global(.svg-icon) {
						height: calc(30px * 1.2);
					}
				}

				&.authority {
					background: var(--primary);
					color: #fff;
					padding: 4px 8px;
					border-radius: 100px;
				}
			}
		}
	}
</style>
