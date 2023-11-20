<script lang="ts" context="module">
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
		{ path: '/kanban', title: 'Kanbanテスト' }
	]
</script>

<script lang="ts">
	export let path: string
	export let isAdmin: boolean
	export let id: string
	export let name: string

	$: title =
		titles.find(
			obj =>
				(typeof obj.path === 'string' && obj.path === path) ||
				(typeof obj.path !== 'string' && obj.path.test(path))
		)?.title ?? ''
</script>

<header class="header">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
		<span class="vertical-line" />
		<h1 class="font-large">{title}</h1>
	</div>
	<div class="right">
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

			span:not(.authority) {
				margin-left: 16px;
			}

			.authority {
				background: var(--primary);
				color: #fff;
				padding: 4px 8px;
				border-radius: 100px;
			}
		}
	}
</style>
