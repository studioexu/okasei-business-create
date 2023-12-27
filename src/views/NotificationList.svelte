<script lang="ts" context="module">
	import type { Notification } from '@/libs/notificationTypes'
</script>

<script lang="ts">
	export let notifications: Notification[]
</script>

<div class="notification-list">
	{#each notifications as notification}
		<div class:unread={!notification.hasRead}>
			<p>{notification.title}</p>
			<p>{notification.content}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.notification-list {
		position: fixed;
		right: 0;
		height: calc(100vh - 64px);
		width: 320px;
		background: #fff;
		overflow-y: overlay;
		z-index: 10;

		> div {
			width: 100%;
			padding: 16px;
			border-bottom: 1px solid var(--black);

			&.unread {
				background: #ddd;
			}

			> p {
				line-height: 120%;
				overflow-wrap: break-word;

				&:first-child {
					font-weight: bold;
					margin-bottom: 8px;
				}
			}
		}
	}
</style>
