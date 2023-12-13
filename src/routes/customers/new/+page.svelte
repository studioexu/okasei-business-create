<script lang="ts">
	import { goto } from '$app/navigation'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/libs/customerTypes'

	import Confirmation from '@/views/customersViews/Confirmation.svelte'
	import Form from '@/views/customersViews/Form.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	import { validationOnSubmit } from '@/libs/customerValidations'
	import { fade } from 'svelte/transition'

	let confirmationPageIsShown = false
	let isSucceeded: boolean = false
	let isShown: boolean = false

	const goBack = () => {
		goto('/customers')
	}

	let initialState: CustomerEntries = {
		custCd: '',
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
		numberOfEmployees: '',
		homepage: '',
		numberOfFacilities: '',
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
		miscellaneous: ''
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

	$: console.log(formIsValid)

	const handleSubmitForm = () => {
		const submitResult = validationOnSubmit(initialState, formIsValid)
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
