<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '@/utils/customers/types'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import { CustomerFactory } from '@/utils/customers/Factories/CustomerFactory'
	import ResultModal from '@/views/modals/ResultModal.svelte'
	import { goto } from '$app/navigation'
	import { inputIsValid } from '@/utils/customers/validations.js'
	import { fade } from 'svelte/transition'
	export let data

	let customer = new CustomerFactory(data.customer, 'customer')
	let confirmationPageIsShown = false

	let initialState: CustomerEntries = {
		id: customer.custCD,
		branchNumber: customer.custBranchCD,
		customerName: customer.custName,
		kana: customer.custKana,
		facilityNumber: customer.instId,
		businessType: customer.custType,
		postalCode: customer.address.postalCode,
		prefecture: customer.address.prefecture,
		city: customer.address.city,
		address1: customer.address.address1,
		address2: customer.address.address2,
		phoneNumber: customer.address.phoneNumber,
		fax: customer.address.fax,
		email: '',
		mobile: '',
		year: customer.foundation.establishDate,
		month: customer.foundation.establishDate,
		founder: customer.foundation.establishedBy,
		departments: customer.departmentDetail,
		numberOfEmployees: customer.numEmployees,
		homepage: customer.url,
		numberOfFacilities: customer.numBranch,
		isActive: customer.isActive,
		googleReview: customer.googleReview,
		reviews: customer.reviews,
		businessList: customer.businessList,
		closingMonth: customer.closingMonth,
		personInCharge: '',
		personInChargeRole: '',
		personInChargeMemo: '',
		approver: '',
		contactTime: '',
		pictures: [],
		miscellaneous: '',
		registrationDate: customer.registration.registDate,
		registeredBy: customer.registration.registBy
	}

	let formIsValid: CustomerEntriesErrors = {
		branchNumber: true,
		customerName: true,
		kana: true,
		facilityNumber: true,
		businessType: true,
		postalCode: true,
		prefecture: true,
		city: true,
		address1: true,
		address2: true,
		phoneNumber: true,
		fax: true,
		email: true,
		mobile: true,
		year: true,
		month: true,
		founder: true,
		departments: true,
		numberOfEmployees: true,
		homepage: true,
		numberOfFacilities: true,
		isActive: true,
		googleReview: true,
		reviews: true,
		businessContent: true,
		closingMonth: true,
		personInCharge: true,
		personInChargeRole: true,
		personInChargeMemo: true,
		approver: true,
		contactTime: true,
		pictures: true,
		miscellaneous: true
	}

	let isSucceeded: boolean = false
	let isShown: boolean = false
	let isNavigating: boolean = false

	const goBack = () => {
		goto('/customers')
	}

	const handleEditClicked = () => {
		confirmationPageIsShown = false
	}

	/**
	 * Take the form and check if all the entries are valid.
	 * If there is one error, the function will return false.
	 * @param formEntries: Object of entries
	 * @returns boolean
	 */
	const checkIfFormIsValid = (formEntries: Object): boolean => {
		let errorArray: boolean[] = []
		let isValid = true
		const customerKeys = Object.keys(formEntries)
		const customerValues = Object.values(formEntries)

		for (let i = 0; i < customerKeys.length; i++) {
			const name: string = customerKeys[i]
			const input: string = customerValues[i]

			formIsValid[name as keyof CustomerEntriesErrors] = inputIsValid(name, input)
			errorArray.push(!inputIsValid(name, input))
		}

		errorArray.forEach(error => {
			if (error) {
				isValid = false
			}
		})

		return isValid
	}

	const handleCheckForm = () => {
		confirmationPageIsShown = checkIfFormIsValid(initialState)
	}
</script>

<section class="section section--form">
	{#if isShown}
		<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
	{/if}

	<header class="section__header">
		{#if confirmationPageIsShown && !isShown}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		{#if !isShown && confirmationPageIsShown}
			<Confirmation bind:initialState />
		{/if}
		<Form
			bind:confirmationPageIsShown
			bind:initialState
			formType={'update'}
			bind:formIsValid
			bind:isShown
			bind:isSucceeded
		/>
	</div>

	{#if !isShown}
		<footer class="section__footer">
			{#if confirmationPageIsShown}
				<div in:fade>
					<button class="btn secondary" on:click={handleEditClicked}>修正</button>
				</div>
				<button type="submit" class="btn primary" form="registration-form">登録</button>
			{:else}
				<button type="button" class="btn primary" on:click={handleCheckForm}>登録</button>
			{/if}
		</footer>
	{/if}
</section>

<style lang="scss">
	.section {
		&__header {
			margin-bottom: 18px;
			&__title {
				font-size: 24px;
			}
		}

		&__footer {
			display: flex;
			justify-content: flex-end;
			gap: 1rem;
			margin-top: 1.5rem;
			padding-bottom: 24px;
		}
	}

	.btn {
		margin: 0;
	}
</style>
