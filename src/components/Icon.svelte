<script lang="ts" context="module">
	import { onMount } from 'svelte'

	const loadSvg = ({ path, color }: { path: string; color?: string }): Promise<HTMLElement> => {
		try {
			return fetch(`icons/${path}.svg`)
				.then(res => res.text())
				.then(text => {
					const svg = new DOMParser().parseFromString(text, 'image/svg+xml').documentElement
					svg.classList.add('svg-icon')
					svg.setAttribute('fill', color ?? '#fff')

					return svg
				})
		} catch (error) {
			throw Error(<string>error)
		}
	}
</script>

<script lang="ts">
	export let icon: { path: string; color?: string }

	let svg: HTMLElement

	onMount(() =>
		loadSvg(icon).then(result => {
			if (result) svg = result
		})
	)
</script>

{#if svg}
	{@html svg.outerHTML}
{/if}

<style>
	:global(.svg-icon) {
		display: inline-block;
		height: 18px * 1.2;
	}
</style>
