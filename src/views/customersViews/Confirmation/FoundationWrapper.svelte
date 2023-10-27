<script lang="ts">
	export let year: string = ''
	export let month: string = ''
	export let founder: string = ''
</script>

<div class="foundation">
	<div class="foundation__data date">
		<h3 class="foundation__data__title">設立年月日</h3>
		<div class="foundation__data__content">
			<p class="year">{year}<span class="unit">年</span></p>
			<p class="month">{month}<span class="unit">月</span></p>
		</div>
	</div>
	<div class="foundation__data founder">
		<h3 class="foundation__data__title width-auto">設立者</h3>
		<p class="foundation__data__content">{founder}</p>
	</div>
</div>

<style lang="scss">
	.foundation {
		position: relative;
		grid-area: foundation;
		display: flex;
		gap: calc((67 / 1366) * 100vw);
		padding: 11px 0;
		&::after {
			content: ' ';
			position: absolute;
			width: calc(((1028) / 1366) * 100vw);
			left: 0;
			bottom: 0;
			height: 2px;
			background-color: rgb(206, 205, 205);
		}

		&__data {
			display: flex;
			align-items: center;
			gap: 18px;

			&__title {
				color: rgb(206, 205, 205);
				font-size: 18px;
				font-weight: 500;
				width: 130px;
			}

			&__content {
				display: flex;
				align-items: center;
				gap: 16px;

				.unit {
					margin-left: 16px;
				}
			}
		}

		.width-auto {
			width: auto;
		}
	}
</style>
