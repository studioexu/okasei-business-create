<script lang="ts" context="module">
	import { createEventDispatcher } from 'svelte'
	import Icon from '@/components/Icon.svelte'
</script>

<script lang="ts">
	export let pages: unknown[][]
	export let current: number
	export let max: number = 3

	$: generatePagination = (): number[] => {
		const numbers: number[] = []

		for (let i = 0; i < Math.min(pages.length, max); i++) {
			if (current < max - 1 || pages.length <= max) numbers.push(i + 1)
			else if (pages.length - max < current && current < pages.length)
				numbers.unshift(pages.length - i)
			else numbers.push(current + i)
		}

		return numbers
	}

	const dispatch = createEventDispatcher()
	const onClick = (page: number) => dispatch('click', { page })
</script>

<div class="pagination">
	<div class="pagination-container">
		{#if current > 1 && pages.length > max}
			<button on:click={() => onClick(0)}>
				<Icon icon={{ path: 'to-first' }} />
			</button>
		{/if}
		{#if current > 0}
			<button on:click={() => onClick(current - 1)}>
				<Icon icon={{ path: 'to-prev' }} />
			</button>
		{/if}
		{#each generatePagination() as page}
			<button class:active={page - 1 === current} on:click={() => onClick(page - 1)}>
				{page}
			</button>
		{/each}
		{#if current < pages.length - 1}
			<button on:click={() => onClick(current + 1)}>
				<Icon icon={{ path: 'to-next' }} />
			</button>
		{/if}
		{#if current < pages.length - 2 && pages.length > max}
			<button on:click={() => onClick(pages.length - 1)}>
				<Icon icon={{ path: 'to-last' }} />
			</button>
		{/if}
	</div>
</div>

<style lang="scss">
	.pagination {
		text-align: center;

		&-container {
			display: inline-flex;
			justify-content: center;

			> button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 40px;
				background: none;
				color: var(--black);
				border-radius: 20px;
				margin-right: 32px;

				&:last-child {
					margin-right: 0;
				}

				> :global(.svg-icon) {
					height: 18px * 1.2;
				}
			}

			.active {
				background: var(--primary);
				color: #fff;
				cursor: default;

				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
