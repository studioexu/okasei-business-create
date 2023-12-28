<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '@/libs/customerTypes.js'

	import { CustomerFactory, CustomerImageFactory } from '@/Factories/CustomerFactory'

	import { fade } from 'svelte/transition'
	import { goto } from '$app/navigation'

	import Confirmation from '@/views/customersViews/Confirmation.svelte'
	import Form from '@/views/customersViews/Form.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	export let data

	let customer = new CustomerFactory(data.customer, 'newApi')
	let images = data.images.map((image: any) => new CustomerImageFactory(image, 'newApi'))

	let confirmationPageIsShown = false
	let departmentsList = data.departmentsList

	let initialState: CustomerEntries = {
		id: customer.id,
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
		email: customer.address.email,
		mobile: customer.address.mobile,
		year: customer.foundationDate.year,
		month: customer.foundationDate.month,
		foundationDate: customer.foundation.establishDate,
		founder: customer.foundation.establishBy,
		departments: customer.departments,
		numberOfEmployees: customer.numEmployees === undefined ? 0 : customer.numEmployees,
		homepage: customer.url,
		numberOfFacilities: customer.numBranch === undefined ? 0 : customer.numBranch,
		isActive: customer.isActive,
		googleReview: customer.googleReview,
		reviews: customer.reviews,
		business: customer.business,
		closingMonth: customer.closingMonth,
		personInCharge: customer.personInCharge,
		personInChargeRole: customer.personInChargeRole,
		personInChargeMemo: customer.personInChargeMemo,
		approver: customer.approver,
		contactTime: customer.contactTime,
		pictures: images.map((image: CustomerImageFactory) => ({
			data: image.data,
			memo: image.memo,
			id: image.id
		})),
		miscellaneous: customer.miscellaneous,
		registrationDate: customer.registration.registDate,
		registeredBy: customer.registration.registDateTime,
		updateDate: customer.update.updateDate,
		updateBy: customer.update.updateBy,
		deleteDate: customer.delete.deleteDate,
		deleteBy: customer.delete.deleteBy
	}

	let isSucceeded: boolean = false
	let isShown: boolean = false
	let isNavigating: boolean = false

	const goBack = () => {
		goto('/customers')
	}

	// FORM VALIDATIONS
	let formIsValid: CustomerEntriesErrors
	let departmentsError: { department: boolean; numberOfBeds: boolean }[] = []

	Object.keys(initialState).map(key => (formIsValid = { ...formIsValid, [key]: true }))
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
			formType={'update'}
			bind:confirmationPageIsShown
			bind:departmentsList
			bind:initialState
			bind:isShown
			bind:isSucceeded
			bind:formIsValid
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
			{/if}
			<button type={'submit'} class="btn primary" form="registration-form">登録</button>
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
