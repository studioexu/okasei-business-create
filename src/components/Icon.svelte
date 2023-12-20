<script lang="ts" context="module">
	import { onMount } from 'svelte'

	interface Icon {
		path: string
		color?: string
	}

	const loadSvg = async ({ path, color = 'black' }: Icon): Promise<HTMLElement> => {
		try {
			const res = await fetch(`icons/${path}.svg`)
			const text = await res.text()
			const svg = new DOMParser().parseFromString(text, 'image/svg+xml').documentElement
			svg.classList.add('svg-icon')

			switch (color) {
				case 'black':
					svg.setAttribute('fill', '#595857')
					break

				case 'primary':
					svg.setAttribute('fill', '#0093d0')
					break

				default:
					svg.setAttribute('fill', color)
			}
			return svg
		} catch (error) {
			throw Error(<string>error)
		}
	}
</script>

<script lang="ts">
	export let icon: Icon

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
		height: calc(18px * 1.2);
	}
</style>
