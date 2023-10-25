<script lang="ts">
	export let total: number = 0
</script>

<div class="input-wrapper bedding">
	<h3 class="title">診療科目</h3>
	<div class="bed-quantity">
		<slot />

		<div class="total">
			<h3 class="total__title">病床数合計</h3>
			<p class="total__content">{total}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.bedding {
		position: relative;
		grid-area: bedding;
		display: flex;
		gap: 18px;
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

		.bed-quantity {
			// width: 500px;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.title {
			width: 130px;
		}

		.total {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.title {
		// color: #707070;
		color: rgb(206, 205, 205);
		font-size: 18px;
		font-weight: 500;
		width: auto;
	}
</style>
