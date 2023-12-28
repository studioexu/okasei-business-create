<script lang="ts" context="module"></script>

<script lang="ts">
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import Row from '@/components/Row.svelte'
	import { purchases } from '@/stores/purchases'
	import { page } from '$app/stores'

	const purchase = $purchases.find(purchase => purchase.id.toString() === $page.params.id)

	const infoFieldsets = [
		{
			id: 'customer-name',
			label: 'お客様名',
			content: purchase?.customerName
		},
		{
			id: 'model',
			label: '機種',
			content: purchase?.model
		},
		{
			id: 'motor',
			label: 'モーター',
			content: purchase?.motor
		},
		{
			id: 'size',
			label: 'サイズ',
			content: purchase?.size
		},
		{
			id: 'arrival-date',
			label: '入荷日',
			content: purchase?.arrivalDate
		},
		{
			id: 'market-price',
			label: '相場',
			content: purchase?.marketPrice
		},
		{
			id: 'selling-price',
			label: '買取額',
			content: purchase?.sellingPrice
		}
	]
</script>

<section class="section">
	<div class="section__main">
		<div class="container">
			<div class="info">
				{#each infoFieldsets as fieldset}
					{#if fieldset.id !== 'image'}
						<Row>
							<DetailWrapper
								label={fieldset.label}
								id={fieldset.id}
								content={fieldset.content?.toString()}
							/>
						</Row>
					{/if}
				{/each}
			</div>
			<div class="picture">
				<div class="image-wrapper" />
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.container {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.container {
		width: auto;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		border-radius: 16px;
		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.picture {
		position: relative;
	}

	.picture {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 260px;
		padding: 30px 18%;
		border: 2px dashed #fff;
		border-radius: 12px;
		text-align: center;

		aspect-ratio: 16/9;
	}

	.image-wrapper {
		overflow: hidden;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		border-radius: 8px;
		background-color: red;
		img {
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			object-position: center;
			object-fit: contain;
		}
	}
</style>
