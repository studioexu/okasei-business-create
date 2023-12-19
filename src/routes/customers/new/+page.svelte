<script lang="ts">
	import { goto } from '$app/navigation'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/libs/customerTypes'

	import Confirmation from '@/views/customersViews/Confirmation.svelte'
	import Form from '@/views/customersViews/Form.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	import { inputIsValid, validationOnSubmit } from '@/libs/customerValidations'
	import { fade } from 'svelte/transition'

	let confirmationPageIsShown = false
	let isSucceeded: boolean = false
	let isShown: boolean = false

	const goBack = () => {
		goto('/customers')
	}

	$: console.log(initialState)

	export let data

	let departmentsList = data.departmentsList

	let initialState: CustomerEntries = {
		id: 0,
		branchNumber: '',
		customerName: '',
		kana: '',
		facilityNumber: '',
		businessType: '',
		postalCode: '',
		prefecture: '',
		city: '',
		address1: '',
		address2: '',
		phoneNumber: '',
		fax: '',
		email: '',
		mobile: '',
		year: '',
		month: '',
		founder: '',
		departments: [],
		numberOfEmployees: 0,
		homepage: '',
		numberOfFacilities: 0,
		isActive: true,
		googleReview: false,
		reviews: '',
		business: '',
		closingMonth: '',
		personInCharge: '',
		personInChargeRole: '',
		personInChargeMemo: '',
		approver: '',
		contactTime: '',
		pictures: [],
		miscellaneous: '',
		foundationDate: ''
	}

	let formIsValid: CustomerEntriesErrors

	Object.keys(initialState).map(key => (formIsValid = { ...formIsValid, [key]: true }))

	let departmentsError: { department: boolean; numberOfBeds: boolean }[] = []

	const handleSubmitForm = () => {
		departmentsError = []

		const submitResult = validationOnSubmit(initialState, formIsValid)
		initialState.departments.map(department => {
			departmentsError.push({
				department: inputIsValid('department', department),
				numberOfBeds: !isNaN(department.numberOfBeds)
			})
		})
		confirmationPageIsShown = submitResult.isValid
		formIsValid = submitResult.formValidation
	}
</script>

<section class="section section--form">
	{#if isShown}
		<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
	{/if}

	{#if !isShown}
		<header class="section__header">
			{#if confirmationPageIsShown}
				<h2 class="section__header__title">下記の内容で登録しますか？</h2>
			{/if}
		</header>
	{/if}

	<div class="section__main">
		{#if !isShown && confirmationPageIsShown}
			<Confirmation bind:initialState />
		{/if}
		<Form
			formType={'create'}
			bind:confirmationPageIsShown
			bind:initialState
			bind:formIsValid
			bind:isShown
			bind:isSucceeded
			{departmentsList}
			bind:departmentsError
		/>
	</div>

	{#if !isShown}
		<footer class="section__footer">
			{#if confirmationPageIsShown}
				<div in:fade>
					<button
						class="btn secondary"
						on:click={() => {
							confirmationPageIsShown = false
						}}
					>
						修正
					</button>
				</div>
				<button type="submit" class="btn primary" form="registration-form">登録</button>
			{:else}
				<button type="button" class="btn primary" on:click={handleSubmitForm}> 登録 </button>
			{/if}
		</footer>
	{/if}
</section>

<style lang="scss">
	.btn {
		margin: 0;
	}

	.section {
		&__header {
			margin-bottom: 18px;
			&__title {
				font-size: 24px;
			}
		}

		&__main {
			position: relative;
		}

		&__footer {
			display: flex;
			justify-content: flex-end;
			gap: 1rem;
			margin-top: 1.5rem;
			padding-bottom: 24px;
		}
	}
</style>
