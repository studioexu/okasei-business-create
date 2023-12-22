<script lang="ts">
	import type { Estimate, Item } from '@/libs/negotiationTypes'
	import InputDate from './InputDate.svelte'
	import InputNumber from './InputNumber.svelte'
	import InputCheckbox from './InputCheckbox.svelte'
	import InputSelect from './InputSelect.svelte'
	import { tax } from '@/data/data'
	import type { NegotiationFactory } from '@/Factories/NegotiationFactory'
	import { createEventDispatcher } from 'svelte'
	import ButtonDelete from './ButtonDelete.svelte'

	const dispatch = createEventDispatcher()

	export let estimate: Estimate
	export let index: number
	export let initialState: NegotiationFactory

	const deleteEstimateFromArray = () => {
		dispatch('deleteEstimate', index)
	}

	const products = [
		{
			id: 1,
			name: 'item A',
			price: 10000
		},
		{
			id: 2,
			name: 'item B',
			price: 15000
		},
		{
			id: 3,
			name: 'item C',
			price: 20000
		}
	]

	/**
	 * When the user chooses an item,
	 * it will update the right items array with the selected item and the corresponding price.
	 * @param estimateIndex
	 * @param itemIndex
	 */
	const handleChooseItem = (itemIndex: number): void => {
		const item = estimate.items[itemIndex]
		const correspondingItemInProducts = products.find(product => product.name === item.name)
		if (correspondingItemInProducts) item.price = correspondingItemInProducts.price
	}

	/**
	 * Calculate one estimate corresponding to the index. お見積もりを計算する。
	 * @param estimateIndex
	 */
	const getEstimate = (): void => {
		let estimateAmount = 0
		const items = estimate.items

		items.map((item: Item) => {
			estimateAmount +=
				(isNaN(item.price) ? 0 : item.price) * (isNaN(item.quantity) ? 0 : item.quantity)
		})
		estimate.estimateWithoutTax = estimateAmount
	}

	/**
	 *
	 * @param isTaxIsAdded: boolean, check if the tax has to be added or not. 税金を追加するかどうかと確認する。
	 * @param estimateWithoutTax: number, corresponding to the amout of the estimate without the tax. 税抜の見積もりの金額である。
	 * @returns number: if we add the tax, we will return the round result of the multiplication between the estimate amount and the current tax amount.
	 */
	const getTaxAmount = (isTaxAdded: boolean, estimateWithoutTax: number): number => {
		if (isTaxAdded) {
			return Math.round(estimateWithoutTax * tax)
		} else {
			return 0
		}
	}

	/**
	 * update the estimate tax amount in the initialState when there are changes.
	 * @param index: corresponding to the index in the array of estimate.
	 */
	const updateEstimateTaxOnChange = (): void => {
		let estimateAmount = isNaN(estimate.estimateWithoutTax) ? 0 : estimate.estimateWithoutTax

		estimate.estimateTax = getTaxAmount(estimate.withTax, estimateAmount)
	}

	/**
	 * Add an item to the items array in a specific estimate object
	 * @param index: corresponding to the index of the right estimate object.
	 */
	const addItem = (): void => {
		estimate.items = [...estimate.items, { name: '', quantity: 1, price: 0 }]
	}

	/**
	 * Remove an item in the items array of one estimate array.
	 * @param index:corresponding to the index of the right estimate object we want to remove an item.
	 * @param itemIndex: index of the item we want to remove.
	 */
	const removeItem = (itemIndex: number): void => {
		estimate.items = estimate.items.filter(
			(item: Item) => estimate.items[itemIndex] !== item && item
		)

		getEstimate()
		updateEstimateTaxOnChange()
	}
</script>

<div class="wrapper" on:change={() => (updateEstimateTaxOnChange(), getEstimate())}>
	<div class="form-row">
		<InputDate label={'発行日'} name={'issue-date'} bind:value={estimate.issueDate} />
	</div>
	<div class="form-row">
		<InputDate label={'見積期日'} name={'estimation-due-date'} bind:value={estimate.dueDate} />
	</div>
	<div class="form-row">
		<InputNumber
			label={'税抜価格'}
			name={'estimate-without-tax'}
			unit="円"
			disabled={true}
			bind:value={estimate.estimateWithoutTax}
		/>

		<InputNumber
			label={'消費税'}
			name={'tax'}
			unit={'円'}
			disabled={true}
			bind:value={estimate.estimateTax}
		/>

		<InputCheckbox
			name={'with-tax-' + index}
			label={'税有り'}
			bind:isChecked={estimate.withTax}
			on:checked={updateEstimateTaxOnChange}
		/>
	</div>

	{#each estimate.items as item, indexItem}
		<div class="form-row" on:change={() => (updateEstimateTaxOnChange(), getEstimate())}>
			<InputSelect
				placeholder={'商品を選択'}
				label={'選択'}
				list={products.map(product => product.name)}
				bind:value={item.name}
				on:select={() => handleChooseItem(indexItem)}
			/>

			<InputNumber unit={'円'} name={'price'} bind:value={item.price} />
			<InputNumber unit={'台'} name={'quantity'} bind:value={item.quantity} />
			{#if estimate.items.length > 1}
				<ButtonDelete addClass={'margin-left-0'} on:delete={() => removeItem(indexItem)} />
			{/if}
		</div>
	{/each}

	<div class="form-row">
		<button type="button" class="btn add primary" on:click={addItem}>＋商品追加</button>
		{#if initialState.estimate.length > 1}
			<ButtonDelete on:delete={deleteEstimateFromArray} />
		{/if}
	</div>
</div>

<style lang="scss">
	.wrapper {
		padding: 18px 21px;
		border-radius: 8px;
		gap: 18px;
		background-color: #f4f4f4;

		// .form-row {
		// 	width: fit-content;
		// }

		.form-row:last-child {
			margin-bottom: 0;
		}
	}

	.btn {
		margin: 0;
		align-self: flex-start;
		padding-top: 0;
		padding-bottom: 0;
		height: 32px;

		&.delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			height: 32px;
			width: 70px;
			min-width: 0;
			margin-left: auto;
		}
	}
</style>
