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
		border-top: 1px solid var(--black);
		overflow-y: overlay;
		z-index: 10;

		> div {
			width: 100%;
			background: #ddd;
			padding: 16px;
			border-left: 1px solid var(--black);
			border-bottom: 1px solid var(--black);

			&.unread {
				background: #fff;

				> p:first-child {
					font-weight: bold;
				}
			}

			> p {
				line-height: 120%;
				overflow-wrap: break-word;

				&:first-child {
					margin-bottom: 8px;
				}
			}
		}
	}
</style>
