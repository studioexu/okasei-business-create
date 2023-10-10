<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import Icon from '@/components/Icon.svelte'

	export const department: string[] = ['内科', '外科', '診療内科']
	export let bed: BedInput
	export let bedInputArray: BedInput[]

	const deleteItem = (e: any) => {
		const itemToDelete = parseInt(e.target.closest('.bed-configuration').id)
		bedInputArray = bedInputArray.filter(bed => bed.index !== itemToDelete)
	}

	interface BedInput {
		index: number
		department: string
		quantity: string
	}

	$: console.log(bedInputArray.length)
</script>

<div class="bed-configuration" id={bed.index.toString()} data-index={bed.index}>
	<Select options={department} wrapperClass="mb-0" bind:value={bed.department} />

	<!-- <input autocomplete="off" list="options" id="option" />
	<datalist id="options">
		<option>1</option>
		<option>2</option>
		<option>3</option>
		<option>4</option>
	</datalist> -->
	<Input
		inputClass="number--lg"
		name="quantity"
		label="病床数"
		wrapperClass="mb-0"
		bind:value={bed.quantity}
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
		widows: 32px;
		height: 32px;
	}
</style>
