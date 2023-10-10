<script lang="ts">
	export let areaClass: string = ''
	export let content: string = ''
	export let title: string = ''
</script>

<div class="info-wrapper {areaClass}">
	<h3 class="title">{title}</h3>
	<p class="data">{content}</p>
	{#if areaClass === 'numberOfFacilities'}
		<span class="unit">店</span>
	{/if}
	{#if areaClass === 'numberOfEmployees'}
		<span class="unit">名</span>
	{/if}
</div>

<style lang="scss">
	$areas: customerNumber, branchNumber, facilityName, kana, facilityNumber, businessType, postalCode,
		prefecture, city, address1, address2, phoneNumber, fax, foundation, month, year, homepage,
		numberOfEmployees, numberOfFacilities;

	.info-wrapper {
		position: relative;
		display: flex;
		padding: 11px 0;
		column-gap: 18px;
		align-items: center;
		// overflow: hidden;
		// &::after {
		// 	content: ' ';
		// 	position: absolute;
		// 	width: calc(((1028) / 1366) * 100vw);
		// 	left: 0;
		// 	bottom: 0;
		// 	height: 2px;
		// 	background-color: rgb(206, 205, 205);
		// }

		.title {
			color: rgb(206, 205, 205);
			font-size: 18px;
			font-weight: 500;
			width: auto;
		}
	}

	.customerNumber,
	.kana,
	.facilityName,
	.facilityNumber,
	.postalCode,
	.prefecture,
	.phoneNumber,
	.numberOfEmployees,
	.homepage,
	.numberOfFacilities {
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

	.customerNumber {
		grid-area: customerNumber;
	}
</style>
