<script lang="ts" context="module">
	import { page } from '$app/stores'
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
</script>

<script lang="ts">
	const path: string | null = $page.route.id
	const titles: Record<string, string> = {
		users: '社員一覧',
		customers: '顧客管理',
		purchases: '買取一覧',
		negotiations: '商談一覧'
	}

	const slicedPath = path ? path.slice(1) : path
	const title = slicedPath && titles.hasOwnProperty(slicedPath) ? titles[slicedPath] : ''
</script>

{#if path !== '/' && path !== null}
	<Header {title} authority="admin" id="000000" name="山田太郎" />
	<Sidebar />
{/if}
<slot />

<style>
	:root {
		--primary-color: #0093d0;
		--background-color: #b7eaff;
		--text-color: #383c3c;
	}

	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(a) {
		color: inherit;
		cursor: pointer;
		text-decoration: none;
	}

	:global(body) {
		background: var(--background-color);
		overscroll-behavior-x: none;
	}

	:global(span),
	:global(p) {
		font-size: 18px;
		color: var(--text-color);
	}

	:global(.font-large) {
		font-size: 21px;
		font-weight: bold;
	}
</style>
