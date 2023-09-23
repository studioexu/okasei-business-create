<script lang="ts" context="module">
	import { onMount } from 'svelte'
	import { page } from '$app/stores'
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
</script>

<script lang="ts">
	$: path = $page.url.pathname
	$: slicedPath = path ? path.slice(1) : path
	$: title = slicedPath && titles.hasOwnProperty(slicedPath) ? titles[slicedPath] : ''

	const titles: Record<string, string> = {
		users: '社員一覧',
		customers: '顧客管理',
		purchases: '買取一覧',
		negotiations: '商談一覧',
		history: '変更履歴',
		settings: '設定'
	}
</script>

{#if path !== '/' && path !== null}
	<Header {title} authority="admin" id="000000" name="山田太郎" />
	<Sidebar {path} />
{/if}
<slot />

<style>
	:root {
		--primary-color: #0093d0;
		--background-color: #b7eaff;
		--black: #595857;
    --gray: #7b7c7d;
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

	:global(p),
	:global(span),
	:global(li),
	:global(input) {
		font-size: 18px;
		color: var(--black);
	}

	:global(button),
	:global(fieldset) {
		border: none;
	}

	:global(button) {
		display: block;
		font-size: 18px;
		margin: 0 auto;
		text-align: center;
    cursor: pointer;
	}

	:global(input) {
		outline: none;
	}

	:global(.font-large) {
		font-size: 21px;
		font-weight: bold;
	}
</style>
