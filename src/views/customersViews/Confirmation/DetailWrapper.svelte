<script lang="ts">
	import { dataFormatter } from '@/utils/customers/formatter'

	export let areaClass: string = ''
	export let content: string = ''
	export let title: string = ''
</script>

<div class="info-wrapper {areaClass}">
	<h3 class="title">{title}</h3>
	<p class="data">{dataFormatter(content, areaClass)}</p>
	{#if areaClass === 'number-of-facilities'}
		<span class="unit">店</span>
	{/if}
	{#if areaClass === 'number-of-employees'}
		<span class="unit">名</span>
	{/if}
</div>

<style lang="scss">
	$areas: customer-number, branch-number, customer-name, kana, facility-number, business-type,
		postal-code, prefecture, city, address1, address2, phone-number, fax, foundation, month, year,
		homepage, number-of-employees, number-of-facilities, business-list, google-review, closing-month;

	.info-wrapper {
		position: relative;
		display: flex;
		padding: 11px 0;
		column-gap: 18px;
		align-items: center;

		.title {
			color: var(--gray);
			font-size: 18px;
			font-weight: 500;
			width: auto;
		}
	}

	.address1,
	.address2,
	.customer-number,
	.kana,
	.customer-name,
	.facility-number,
	.postal-code,
	.prefecture,
	.phone-number,
	.number-of-employees,
	.homepage,
	.number-of-facilities,
	.business-list,
	.google-review {
		.title {
			width: 130px;
		}

		&::after {
			content: ' ';
			position: absolute;
			width: calc(((1028) / 1366) * 100vw);
			left: 0;
			bottom: 0;
			height: 2px;
			background-color: rgb(206, 205, 205);
		}
	}

	@each $area in $areas {
		.#{$area} {
			grid-area: $area;
		}
	}

	.city {
		grid-area: city;
	}

	.customer-number {
		grid-area: customer-number;
	}
</style>
