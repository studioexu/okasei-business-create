<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '../../utils/types'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import RegisteredModal from '@/views/customersViews/modals/RegisteredModal.svelte'
	import RegistrationFooter from '@/views/customersViews/RegistrationFooter/RegistrationFooter.svelte'
	import { CustomerFactory } from '../../utils/Factories/CustomerFactory'
	export let data

	let customer = new CustomerFactory(data.customer, 'customer')
	// let customer = data.customer
	// console.log('ANYAAAA')

	// console.log(data.customer)

	let verificationPageDisplayed = false
	let modalIsOpened: boolean = false

	let initialState: CustomerEntries = {
		id: customer.custCD,
		branchNumber: customer.numBranch,
		facilityName: customer.custName,
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
		year: customer.foundation.establishDate,
		month: customer.foundation.establishDate,
		founder: customer.foundation.establishedBy,
		bedding: customer.departmentDetail,
		numberOfEmployees: customer.numEmployees,
		homepage: customer.url,
		numberOfFacilities: customer.numBranch,
		registrationDate: customer.registration.registDate,
		registrationTime: customer.registration.registBy,
		isActive: customer.isActive
	}

	let noErrors: CustomerEntriesErrors = {
		branchNumber: true,
		facilityName: true,
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
		<!-- <div out:flip> -->
		<Form
			bind:verificationPageDisplayed
			bind:initialState
			formType={'update'}
			bind:modalIsOpened
			bind:noErrors
		/>
		<!-- </div> -->
	</div>

	{#if !modalIsOpened}
		<RegistrationFooter bind:initialState bind:noErrors bind:verificationPageDisplayed />
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
</style>
