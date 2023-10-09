<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'

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
</script>

<div class="bed-configuration" id={bed.index.toString()} data-index={bed.index}>
	<Select options={department} wrapperClass="mb-0" bind:value={bed.department} />

	<input autocomplete="off" list="options" id="option" />
	<datalist id="options">
		<option>1</option>
		<option>2</option>
		<option>3</option>
		<option>4</option>
	</datalist>
	<Input
		inputClass="number--lg"
		name="quantity"
		label="病床数"
		wrapperClass="mb-0"
		bind:value={bed.quantity}
	/>
	<button type="button" class="btn btn--delete" on:click={deleteItem}>Delete</button>
</div>

<style lang="scss">
	.bed-configuration {
		display: flex;
		align-items: center;
		gap: 62px;
	}

	input {
		border: 1px solid red;
	}
</style>
