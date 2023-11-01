<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import Selector from './Selector.svelte'
	import Input from './Input.svelte'
	import Icon from '@/components/Icon.svelte'

	export let bedding: BedInput[]
	export const departments: string[] = ['内科', '外科', '診療内科']

	interface BedInput {
		index: number
		department: string
		quantity: string
	}

	let totalOfBed: number = 0
	let bedInputArray: BedInput[] = []

	if (bedding.length === 0) {
		bedInputArray = [{ index: 0, department: '内科', quantity: '0' }]
	} else {
		bedding.map((bed, index) => {
			bedInputArray = [
				...bedInputArray,
				{
					index: index,
					department: bed.department,
					quantity: bed.quantity
				}
			]
			index++
		})
	}

	/**
	 * We go through the array of bed input and calculate the number total of beds.
	 * @param beds: array of bedInput
	 */
	const caculateTotalOfBeds = (beds: BedInput[]): number => {
		let sum: number = 0
		beds.map((bed: BedInput) => {
			const numberOfBed = isNaN(parseInt(bed.quantity)) ? 0 : parseInt(bed.quantity)
			sum += numberOfBed
		})

		return sum
	}

	/**
	 * It will add a new bed input in the form
	 */
	const handleAddBed = (e: any) => {
		e.preventDefault()
		bedInputArray = [
			...bedInputArray,
			{
				index: bedInputArray[bedInputArray.length - 1].index + 1,
				department: '内科',
				quantity: '0'
			}
		]
	}

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

	$: totalOfBed = caculateTotalOfBeds(bedInputArray)
	$: bedding = bedInputArray
</script>

<div class="container">
	<h3 class="label">診療科目</h3>

	<div class="container container--vertical">
		{#each bedInputArray as bed, index}
			<div class="bed-configuration" id={bed.index.toString()} data-index={bed.index}>
				<Selector datas={departments} dataType={'department'} bind:value={bed.department} />
				<Input
					label="病床数"
					name={'quantity'}
					inputSize="txt--sm"
					functionOnBlur={checkBedQuantity}
					bind:value={bed.quantity}
				/>

				{#if bedInputArray.length > 1}
					<button type="button" class="btn btn--delete" on:click={deleteItem}>
						<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
					</button>
				{/if}
			</div>
		{/each}
	</div>

	<div class="total">
		<h3 class="label">病床数合計</h3>
		<p class="total__display">{totalOfBed}</p>
	</div>
</div>

<div class="button-wrapper">
	<Button buttonClass={'btn--sm btn--filled'} handleClick={handleAddBed}>＋ 新規追加</Button>
</div>

<style lang="scss">
	.container {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		column-gap: 10px;
		row-gap: 11px;

		.label {
			display: flex;
			align-items: center;
			height: 32px;
			min-width: 130px;

			font-size: 18px;
			font-weight: 400;
		}

		&--vertical {
			flex-direction: column;
		}
	}

	.total {
		position: relative;
		display: flex;
		align-items: center;
		align-self: flex-end;
		margin-bottom: 20px;
		gap: 2.25rem;

		.label {
			display: flex;
			align-items: center;
			height: 32px;
			margin: 0;
		}

		&__display {
			display: flex;
			align-items: center;
			height: 32px;
			margin: 0;
		}
	}

	.button-wrapper {
		margin-left: 140px;
		margin-top: 14px;
	}

	.bed-configuration {
		display: flex;
		align-items: center;
		gap: 18px;

		.btn {
			content: ' ';
			display: flex;
			align-items: center;
			justify-content: center;
			width: 32px;
			height: 32px;
			margin-bottom: 20px;
			background-color: transparent;
		}
	}
</style>
