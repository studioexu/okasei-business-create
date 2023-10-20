<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '../utils/types'

	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import RegisteredModal from '@/views/customersViews/modals/RegisteredModal.svelte'
	import RegistrationFooter from '@/views/customersViews/RegistrationFooter/RegistrationFooter.svelte'
	import { fade, fly } from 'svelte/transition'

	let modalIsOpened: boolean = false
	let verificationPageDisplayed = false

	let initialState: CustomerEntries = {
		branchNumber: '',
		facilityName: '',
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
		isActive: true
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

	{#if !modalIsOpened}
		<header class="section__header">
			{#if verificationPageDisplayed}
				<h2 class="section__header__title">下記の内容で登録しますか？</h2>
			{/if}
		</header>
	{/if}

	<div class="section__main">
		<!-- {#if verificationPageDisplayed} -->
		{#if !modalIsOpened}
			<!-- <div in:fly={{ x: 200, duration: 2000 }} style="position: absolute; top:0; left: 0;"> -->
			<Confirmation bind:initialState bind:verificationPageDisplayed />
			<!-- </div> -->
		{/if}
		<!-- {:else}
			<div out:fade style="position: absolute; top:0; left: 0;"> -->
		<Form
			bind:verificationPageDisplayed
			bind:initialState
			formType={'create'}
			bind:modalIsOpened
			bind:noErrors
		/>
		<!-- </div> -->
		<!-- {/if} -->
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

		&__main {
			position: relative;
		}
	}
</style>
