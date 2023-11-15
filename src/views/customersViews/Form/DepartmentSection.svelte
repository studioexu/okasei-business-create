<script lang="ts">
	import type { Department } from '@/utils/customers/types'
	import SelectWithInput from '@/components/SelectWithInput.svelte'
	import Input from '@/components/Input.svelte'
	import Icon from '@/components/Icon.svelte'

	export let departments: Department[]
	export const departmentLabels: string[] = ['内科', '外科', '診療内科']

	interface departmentInput {
		index: number
		department: string
		bedQuantity: string
	}
	let totalOfBed: number = 0
	let departmentInputArray: departmentInput[] = []

	if (departments.length === 0) {
		departmentInputArray = [{ index: 0, department: '内科', bedQuantity: '0' }]
	} else {
		departments.map((department, index) => {
			departmentInputArray = [
				...departmentInputArray,
				{
					index: index,
					department: department.department,
					bedQuantity: department.bedQuantity
				}
			]
			index++
		})
	}

	/**
	 * We go through the array of bed input and calculate the number total of beds.
	 * @param beds: array of bedInput
	 */
	const caculateTotalOfBeds = (departments: departmentInput[]): number => {
		let sum: number = 0
		departments.map((department: departmentInput) => {
			const numberOfBed = isNaN(parseInt(department.bedQuantity))
				? 0
				: parseInt(department.bedQuantity)
			sum += numberOfBed
		})

		return sum
	}

	/**
	 * It will add a new bed input in the form
	 */
	const handleAddBed = (e: any) => {
		e.preventDefault()
		departmentInputArray = [
			...departmentInputArray,
			{
				index: departmentInputArray[departmentInputArray.length - 1].index + 1,
				department: '内科',
				bedQuantity: '0'
			}
		]
	}

	const deleteItem = (e: any) => {
		const itemToDelete = parseInt(e.target.closest('.bed-configuration').id)
		departmentInputArray = departmentInputArray.filter(
			department => department.index !== itemToDelete
		)
	}

	const checkBedQuantity = (bedQuantity: string): string => {
		if (isNaN(parseInt(bedQuantity))) {
			bedQuantity = '0'
		}

		return bedQuantity
	}

	$: totalOfBed = caculateTotalOfBeds(departmentInputArray)
	$: departments = departmentInputArray
</script>

<div class="container">
	<h3 class="label">診療科目</h3>

	<div class="container container--vertical">
		{#each departmentInputArray as department, index}
			<div class="bed-configuration" id={department.index.toString()} data-index={department.index}>
				<SelectWithInput
					datas={departmentLabels}
					name={'department'}
					bind:value={department.department}
				/>
				<Input
					label="病床数"
					name={'quantity'}
					inputSize="txt--sm"
					functionOnBlur={checkBedQuantity}
					bind:value={department.bedQuantity}
				/>

				{#if departmentInputArray.length > 1}
					<button type="button" class="btn" on:click={deleteItem}>
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
	<button type="button" class="primary" on:click={handleAddBed}>＋ 新規追加</button>
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
		width: fit-content;
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
