<script lang="ts">
	export let department: string = ''
	export let quantity: string = ''
</script>

<div class="bed-container">
	<p class="department">{department}</p>
	<div class="quantity">
		<h3 class="quantity__title">病床数</h3>
		<p class="quantity__content">{quantity}</p>
	</div>
</div>

<style lang="scss">
	.bed-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: calc((35 / 1366) * 100vw);
		.quantity {
			display: flex;
			align-items: center;
			gap: calc((20 / 1366) * 100vw);

			&__title {
				// color: #707070;
				color: rgb(206, 205, 205);
				font-size: 18px;
				font-weight: 500;
				width: auto;
			}
		}
	}
</style>
