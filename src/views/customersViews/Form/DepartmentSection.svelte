<script lang="ts">
	import BedConfiguration from './BedConfiguration.svelte'
	import Button from '@/components/customers/Button.svelte'

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

	$: totalOfBed = caculateTotalOfBeds(bedInputArray)
	$: bedding = bedInputArray
</script>

<div class="container">
	<h3 class="label">診療科目</h3>

	<div class="container container--vertical">
		{#each bedInputArray as bed, index}
			<BedConfiguration
				bind:bed
				bind:department={bed.department}
				bind:quantity={bed.quantity}
				bind:bedInputArray
			/>
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
		column-gap: 2rem;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;

		&--vertical {
			flex-direction: column;
		}
	}
	.container {
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
	}

	.total {
		position: relative;
		display: flex;
		gap: 2.25rem;
		align-items: center;
		align-self: flex-end;
		.label {
			margin: 0;
		}

		&__display {
			margin: 0;
		}
	}

	.button-wrapper {
		margin-left: 140px;
		margin-top: 14px;
	}
</style>
