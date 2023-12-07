<script lang="ts">
	import { dataFormatter } from '@/libs/formatters'

	export let areaClass: string = ''
	export let content: string = ''
	export let label: string = ''
	export let unit: string = ''
</script>

<div class="detail-wrapper">
	{#if label.length !== 0}
		<h3 class="label">{label}</h3>
	{/if}

	<p class="data">{dataFormatter(content, areaClass)}</p>

	{#if unit.length !== 0}
		<span class="unit">{unit}</span>
	{/if}
</div>

<style lang="scss">
</style>
