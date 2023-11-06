<script lang="ts">
	import { goto } from '$app/navigation'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/utils/customers/types'

	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'
	import Button from '@/components/Button.svelte'

	import { inputIsValid } from '@/utils/customers/validations'
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
		year: '',
		month: '',
		founder: '',
		bedding: [],
		numberOfEmployees: '',
		homepage: '',
		numberOfFacilities: '',
		isActive: true,
		googleReview: false,
		reviews: '',
		businessList: '',
		closingMonth: ''
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
		year: true,
		month: true,
		founder: true,
		bedding: true,
		numberOfEmployees: true,
		homepage: true,
		numberOfFacilities: true
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
					<Button buttonClass={'btn--transparent'} handleClick={handleEditClicked}>修正</Button>
				</div>
				<Button buttonClass={'btn--filled'} form="registration-form">登録</Button>
			{:else}
				<Button buttonClass={'btn--filled'} handleClick={handleCheckForm}>登録</Button>
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
