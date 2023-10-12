<script lang="ts">
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import Button from '@/components/customers/Button.svelte'

	import type { CustomerEntries } from '../utils/types'

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
		numberOfFacilities: ''
	}

	const handleEditClicked = () => {
		verificationPageDisplayed = false
	}
</script>

<section class="section section--form">
	<header class="section__header">
		{#if verificationPageDisplayed}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		<Confirmation bind:initialState bind:verificationPageDisplayed />
		<Form bind:verificationPageDisplayed bind:initialState formType={'create'} />
	</div>

	<footer class="section__footer">
		<div class="form__footer">
			{#if verificationPageDisplayed}
				<Button buttonClass={'btn--transparent'} handleClick={handleEditClicked}>修正</Button>
			{/if}
			<Button buttonClass={'btn--filled'} form="registration-form">登録</Button>
		</div>
	</footer>
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
