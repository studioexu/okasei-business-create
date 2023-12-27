<script lang="ts" context="module">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import type { Notification } from '@/libs/notificationTypes'
	import type { Role } from '@/libs/types'
	import { notifications } from '@/stores/notifications'
	import { user } from '@/stores/users'
	import Header from '@/views/Header.svelte'
	import Sidebar from '@/views/Sidebar.svelte'
	import NotificationList from '@/views/NotificationList.svelte'
</script>

<script lang="ts">
	$: path = $page.url.pathname
	const isAdmin = $user.role === 'システム管理者'
	const sortedNotifications: Notification[] = isAdmin
		? $notifications
		: $notifications.filter(notification => notification.roles.includes($user.role))
	let isShown = false

	const onClick = () => {
		user.set({
			employeeNumber: 0,
			name: '',
			belongsTo: '',
			role: <Role>'',
			email: ''
		})
		goto('/')
	}

	onMount(() => {
		console.log('notifications')
	})
</script>

{#if path !== '/'}
	<Header
		{path}
		notifications={sortedNotifications}
		{isAdmin}
		id={`${$user.employeeNumber}`}
		name={$user.name}
		on:click={event => (isShown = event.detail.isShown)}
	/>
	{#if isShown}
		<NotificationList notifications={sortedNotifications} />
	{/if}
	<Sidebar {path} on:click={onClick} />
{/if}
<main class:main={path !== '/'}>
	<slot />
</main>

<style>
	:root {
		--primary: #0093d0;
		--back: #d0f1ff;
		--black: #595857;
		--modal-back: rgba(89, 88, 87, 0.8);
		--gray: #7b7c7d;
		--error: #eb3c3c;
		--placeholder: #d0cfcf;
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
		background: var(--back);
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

	:global(input),
	:global(select) {
		padding: 4px 8px;
		max-height: 31px;
		outline: none;
		border: 1px solid var(--gray);
		border-radius: 8px;
		font-size: 18px;
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

	:global(.required-mark) {
		color: var(--error);
	}

	:global(.font-error) {
		font-size: 14px;
		color: var(--error);
	}

	:global(button.primary) {
		min-width: 112px;
		background: var(--primary);
		color: #fff;
		border-radius: 8px;
		padding: 8px 16px;
	}

	:global(button.secondary) {
		min-width: 112px;
		background: none;
		color: var(--primary);
		border-radius: 8px;
		border: 1px solid var(--primary);
		padding: 8px 16px;
	}

	:global(button.disabled) {
		background: var(--gray);
		cursor: not-allowed;

		&:hover {
			opacity: 1;
		}
	}

	:global(.no-data-message) {
		color: var(--black);
		font-size: 18px;
		text-align: center;
	}

	:global(button.inline) {
		padding: 4px 8px;
		max-height: 31px;
	}

	:global(input.error) {
		border-color: var(--error);
	}

	:global(input[readonly]) {
		border-color: #fff;
	}

	:global(.invisible) {
		display: none !important;
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
