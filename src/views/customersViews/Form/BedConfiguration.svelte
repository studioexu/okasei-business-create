<script lang="ts">
	import type { BedInput } from '@/routes/customers/utils/types'
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import Icon from '@/components/Icon.svelte'

	export const departments: string[] = ['内科', '外科', '診療内科']
	export let bed: BedInput
	export let bedInputArray: BedInput[]
	export let department: string
	export let quantity: string

	const deleteItem = (e: any) => {
		const itemToDelete = parseInt(e.target.closest('.bed-configuration').id)
		bedInputArray = bedInputArray.filter(bed => bed.index !== itemToDelete)
	}

	const checkBedQuantity = (bedQuantity: string): string => {
		if (isNaN(parseInt(bedQuantity))) {
			bedQuantity = '0'
		}

		return bedQuantity
	}
</script>

<div class="bed-configuration" id={bed.index.toString()} data-index={bed.index}>
	<Select options={departments} wrapperClass="mb-0" bind:value={department} name={'department'} />
	<Input
		inputClass="number--lg"
		name={'quantity'}
		label="病床数"
		wrapperClass="mb-0"
		bind:value={quantity}
		extraCheckFunction={checkBedQuantity}
	/>

	<button type="button" class="btn btn--delete" on:click={deleteItem}>
		{#if bedInputArray.length > 1}
			<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
		{/if}
	</button>
</div>

<style lang="scss">
	.bed-configuration {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.btn {
		content: ' ';
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		width: 32px;
		height: 32px;
	}
</style>
