<script lang="ts">
	import type { Department } from '@/libs/customerTypes'
	import InputNumber from './InputNumber.svelte'
	import InputSelect from './InputSelect.svelte'
	import ButtonDelete from './ButtonDelete.svelte'

	export let index: number
	export let department: Department
	export let departmentsList: any
	export let departments: Department[]

	const departementNameList = departmentsList.map((department: any) => department.name)
	export let isValid: { department: boolean; numberOfBeds: boolean } = {
		department: true,
		numberOfBeds: true
	}

	/**
	 * Delete one department with the corresponding index in the "departments" array.
	 * DepartmentsのArrayから分科を消す。
	 * @param index: number, corresponding to the position of the department we want to delete in the "departments" array. 削除したい分科のインデックスである。
	 *
	 */
	const deleteDepartment = (index: number) => {
		departments = departments.filter((department: any) => departments.indexOf(department) !== index)
	}

	/**
	 * The user selects a department, the function will update the "departments" array and, by extension, the initialState.departments.
	 * ユザーが分科を選択すると、DepartmentsのArrayとInitialState.departementsのArrayをアップデートする。
	 * @param e: event, form the event, we will get the name of the department. イベントから、から分科名を貰う。
	 * @param index：number, index of the department in the departments array. DepartmentsのArrayで分科のインデックスである。
	 */
	const handleSelectDepartment = (e: { detail: { value: string } }, index: number): void => {
		const departmentName: string = e.detail.value

		if (departmentName) {
			const selectedDepartment = departmentsList.find(
				(department: any) => department.name === departmentName
			)

			if (selectedDepartment) {
				isValid.department = true
				departments[index].departmentId = selectedDepartment.id
				departments[index].departmentName = selectedDepartment.name
			} else {
				isValid.department = false
				departments[index].departmentId = 0
			}
		}
	}
</script>

<article class="department-wrapper" id={'department-' + index}>
	<InputSelect
		name={'department' + index.toString()}
		list={departementNameList}
		errorMsg={'正しい科目を選択して下さい。'}
		bind:value={department.departmentName}
		on:select={e => handleSelectDepartment(e, index)}
		bind:isValid={isValid.department}
	/>

	<InputNumber
		name={'bed-quantity' + index.toString()}
		label={'病床数'}
		bind:value={department.numberOfBeds}
		bind:isValid={isValid.numberOfBeds}
	/>

	{#if departments.length > 1}
		<ButtonDelete addClass={'margin-left-0'} on:delete={() => deleteDepartment(index)} />
	{/if}
</article>

<style lang="scss">
	.department-wrapper {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.btn {
		margin: 0;

		&.delete {
			min-width: 0 !important;
			padding: 0;
			height: 31px;
			width: 31px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
