<script lang="ts">
	import type { CustomerEntries, Error } from '../../utils/types'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import RegisteredModal from '@/views/customersViews/modals/RegisteredModal.svelte'
	import RegistrationFooter from '@/views/customersViews/RegistrationFooter/RegistrationFooter.svelte'
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

	let noErrors: Error = {
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
		<Form
			bind:verificationPageDisplayed
			bind:initialState
			formType={'update'}
			bind:modalIsOpened
			bind:noErrors
		/>
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
