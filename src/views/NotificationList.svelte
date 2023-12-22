<script lang="ts" context="module">
	import type { Notifications } from '@/libs/notificationTypes'
</script>

<script lang="ts">
	export let notifications: Notifications
</script>

<div class="notification-list">
	{#each notifications as notification}
		{notification}
	{/each}
</div>

<style lang="scss">
	.notification-list {
		position: fixed;
		right: 0;
		height: 100%;
		width: 320px;
		background: #fff;
		z-index: 10;
	}
</style>
