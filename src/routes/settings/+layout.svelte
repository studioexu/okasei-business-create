<script lang="ts" context="module">
	import { page } from '$app/stores'
	import Icon from '@/components/Icon.svelte'

	const settings: { path: string; icon: string; text: string }[] = [
		{ path: 'notification', icon: 'notification', text: 'お知らせ' }
	].map(({ path, icon, text }) => ({ path: '/settings/' + path, icon, text }))
</script>

<script lang="ts">
	$: path = $page.url.pathname
</script>

<div class="container">
	<nav class="side-menu">
		<ul>
			{#each settings as setting}
				<li class:active={path.includes(setting.path)}>
					<a href={setting.path}>
						<span class:invisible={!path.includes(setting.path)}>
							<Icon icon={{ path: setting.icon, color: '#fff' }} />
						</span>
						<span class:invisible={path.includes(setting.path)}>
							<Icon icon={{ path: setting.icon, color: 'black' }} />
						</span>
						{setting.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		height: calc(100vh - 64px);
		margin: -32px;

		.side-menu {
			width: 192px;
			height: 100%;
			background: #fff;
			padding: 16px 0 32px 0;

			> ul {
				list-style: none;

				> li {
					margin-bottom: 16px;

					&:hover {
						opacity: 0.5;
					}

					&:last-child {
						margin-bottom: 0px;
					}

					&.active {
						background: var(--primary);
						color: #fff;

						&:hover {
							opacity: 1;
						}
					}

					a {
						display: flex;
						align-items: center;
						padding: 8px 24px;

						span {
							display: inline-flex;
							align-items: center;
							margin-right: 8px;
						}
					}
				}
			}
		}

		.content {
			width: calc(100% - 192px);
			padding: 32px;
		}
	}
</style>
