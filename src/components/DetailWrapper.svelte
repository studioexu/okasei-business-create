<script lang="ts">
	import { dataFormatter } from '@/utils/customers/formatter'

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
	.detail-wrapper {
		position: relative;
		display: flex;
		padding: 11px 0;
		column-gap: 18px;
		align-items: center;

		.label {
			color: var(--gray);
			font-size: 18px;
			font-weight: 500;
			width: auto;
		}

		&:first-child {
			.label {
				width: 130px;
			}
		}
	}
</style>
