<script lang="ts" context="module">
	import { page } from '$app/stores'
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
</script>

<script lang="ts">
	$: path = $page.url.pathname

	const authority = 'admin'
</script>

{#if path !== '/'}
	<Header {path} {authority} id="000000" name="山田太郎" />
	<Sidebar {path} {authority} />
{/if}
<main class:main={path !== '/'}>
	<slot />
</main>

<style>
	:root {
		--primary-color: #0093d0;
		--background-color: #d0f1ff;
		--black: #595857;
		--modal-back: rgba(89, 88, 87, 0.8);
		--gray: #7b7c7d;
		--error: #eb3c3c;
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
	:global(fieldset),
	:global(input),
	:global(th),
	:global(td) {
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

		&:hover {
			opacity: 0.5;
		}
	}

	:global(input) {
		outline: none;
		border: 1px solid var(--gray);
		border-radius: 8px;
	}

	:global(th) {
		font-weight: normal;
	}

	:global(dt),
	:global(dd) {
		font-size: 14px;
		color: var(--black);
	}

	:global(.font-large) {
		font-size: 21px;
		font-weight: bold;
	}

	:global(.font-error) {
		font-size: 14px;
		color: var(--error);
	}

	:global(button.primary) {
		min-width: 112px;
		background: var(--primary-color);
		color: #fff;
		border-radius: 8px;
		padding: 8px 16px;
	}

	:global(button.secondary) {
		min-width: 112px;
		background: none;
		color: var(--primary-color);
		border-radius: 8px;
		border: 1px solid var(--primary-color);
		padding: 8px 16px;
	}

	:global(button.disabled) {
		background: var(--gray);
		cursor: not-allowed;

		&:hover {
			opacity: 1;
		}
	}

	:global(input.error) {
		border-color: var(--error);
	}

	:global(input.readonly) {
		border-color: #fff;
	}

	.main {
		position: absolute;
		top: 64px;
		left: 192px;
		width: calc(100vw - 192px);
		height: calc(100vh - 64px);
		padding: 32px;
		overflow-y: overlay;
	}
</style>
