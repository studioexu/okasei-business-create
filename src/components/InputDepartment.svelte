<script lang="ts">
	import type { Department } from '@/models/CustomerAPI'
	import NumberInput from './NumberInput.svelte'
	import Icon from './Icon.svelte'

	export let index: number
	export let department: Department
	export let departmentsList: any
	export let departments: Department[]

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
	const handleSelectDepartment = (e: Event, index: number): void => {
		const departmentName: string = (e.target as HTMLOptionElement).value

		if (departmentName) {
			const departmentId = (
				document.querySelector(
					"#departments option[value='" + departmentName + "']"
				) as HTMLOptionElement
			)?.dataset.value

			const selectedDepartment = departmentsList.find(
				(department: any) => departmentId && department.id === parseInt(departmentId)
			)

			if (selectedDepartment) {
				departments[index].departmentId = selectedDepartment.id
				departments[index].departmentName = selectedDepartment.name
			}
		}
	}
</script>

<div class="department-wrapper" id={'department-' + index}>
	<div class="input-wrapper">
		<input
			list="departments"
			bind:value={department.departmentName}
			on:input={e => handleSelectDepartment(e, index)}
		/>

		<datalist id="departments">
			{#each departmentsList as department}
				<option class="department-option" data-value={department.id} value={department.name} />
			{/each}
		</datalist>
	</div>

	<NumberInput name={'bed-quantity'} label={'病床数'} bind:value={department.numberOfBeds} />

	{#if departments.length > 1}
		<button
			type="button"
			class="btn secondary delete inline"
			on:click={() => deleteDepartment(index)}
		>
			<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
		</button>
	{/if}
</div>

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
