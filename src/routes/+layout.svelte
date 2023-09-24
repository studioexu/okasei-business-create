<script lang="ts" context="module">
	import { page } from '$app/stores'
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
</script>

<script lang="ts">
	export const ssr = false

	$: path = $page.url.pathname

	const authority = 'admin'
</script>

{#if path !== '/' && path !== null}
	<Header {path} {authority} id="000000" name="山田太郎" />
	<Sidebar {path} {authority} />
{/if}
<slot />

<style>
	:root {
		--primary-color: #0093d0;
		--background-color: #d0f1ff;
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
