<script lang="ts" context="module"></script>

<script lang="ts">
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import Row from '@/components/Row.svelte'
	import { purchases } from '@/stores/purchases'
	import { page } from '$app/stores'
	import { toCamelCase } from '@/libs/formatters'
	import { goto } from '$app/navigation'

	const purchase = $purchases.find(purchase => purchase.id.toString() === $page.params.id)

	interface InitialStatePurchase {
		orderNumber: string
		customerName: string
		status: string
		model: string
		motor: string
		size: string
		arrivalDate: string
		marketPrice: number
		sellingPrice: number
		image: string
	}

	let initialState: InitialStatePurchase = {
		orderNumber: '',
		customerName: '',
		status: '',
		model: '',
		motor: '',
		size: '',
		arrivalDate: '',
		marketPrice: 0,
		sellingPrice: 0,
		image: ''
	}

	if (purchase !== undefined) {
		initialState = {
			orderNumber: purchase?.orderNumber,
			customerName: purchase?.customerName,
			status: purchase?.status,
			model: purchase?.model,
			motor: purchase?.motor,
			size: purchase?.size,
			arrivalDate: purchase?.arrivalDate,
			marketPrice: purchase?.marketPrice,
			sellingPrice: purchase?.sellingPrice,
			image: purchase?.image
		}
	}

	const infoFieldsets = [
		{
			id: 'customerName',
			label: 'お客様名'
		},
		{
			id: 'model',
			label: '機種'
		},
		{
			id: 'motor',
			label: 'モーター'
		},
		{
			id: 'size',
			label: 'サイズ'
		},
		{
			id: 'arrivalDate',
			label: '入荷日'
		},
		{
			id: 'marketPrice',
			label: '運賃'
		},
		{
			id: 'sellingPrice',
			label: '買取額'
		}
	] as {
		id: string & keyof InitialStatePurchase
		label: string
		content?: string | number
	}[]

	const handleEditClick = () => {
		goto('/purchases/' + $page.params.id + '/edit')
	}
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
								content={initialState[fieldset.id].toString()}
							/>
						</Row>
					{/if}
				{/each}
			</div>
			<div class="picture">
				<div class="image-wrapper">
					<img src={initialState.image} alt="" />
				</div>
			</div>
		</div>
	</div>

	<footer class="section__footer">
		<button type="button" class="secondary" on:click={handleEditClick}>編集</button>
	</footer>
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
