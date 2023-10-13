<script lang="ts">
	import type { CustomerEntries } from '../../utils/types'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import RegisteredModal from '@/views/customersViews/modals/RegisteredModal.svelte'
	import Button from '@/components/customers/Button.svelte'
	export let data

	let customer = data.customer
	let verificationPageDisplayed = false
	let modalIsOpened: boolean = false

	let initialState: CustomerEntries = {
		id: customer.id,
		branchNumber: customer.branchNumber,
		facilityName: customer.facilityName,
		kana: customer.kana,
		facilityNumber: customer.facilityNumber,
		businessType: customer.businessType,
		postalCode: customer.address.postalCode,
		prefecture: customer.address.prefecture,
		city: customer.address.city,
		address1: customer.address.address1,
		address2: customer.address.address2,
		phoneNumber: customer.address.phoneNumber,
		fax: customer.address.fax,
		year: customer.foundation.year,
		month: customer.foundation.month,
		founder: customer.foundation.founder,
		bedding: customer.bedding,
		numberOfEmployees: customer.numberOfEmployees,
		homepage: customer.homepage,
		numberOfFacilities: customer.numberOfFacilities,
		registrationDate: customer.registration.registrationDate,
		registrationTime: customer.registration.registrationTime
	}

	const handleEditClicked = () => {
		verificationPageDisplayed = false
	}
</script>

<section class="section section--form">
	<RegisteredModal bind:isOpened={modalIsOpened} />

	<header class="section__header">
		{#if verificationPageDisplayed && !modalIsOpened}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		{#if !modalIsOpened}
			<Confirmation bind:verificationPageDisplayed bind:initialState />
		{/if}
		<Form bind:verificationPageDisplayed bind:initialState formType={'update'} bind:modalIsOpened />
	</div>

	{#if !modalIsOpened}
		<footer class="section__footer">
			<div class="form__footer">
				{#if verificationPageDisplayed}
					<Button buttonClass={'btn--transparent'} handleClick={handleEditClicked}>修正</Button>
				{/if}
				<Button buttonClass={'btn--filled'} form="registration-form">登録</Button>
			</div>
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
	}

	.form__footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1.5rem;
		padding-bottom: 24px;
	}
</style>
