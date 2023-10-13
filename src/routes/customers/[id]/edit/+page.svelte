<script lang="ts">
	import type { CustomerEntries } from '../../utils/types'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import RegisteredModal from '../../RegisteredModal.svelte'
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
					<button class="btn btn--edit" on:click={handleEditClicked}>修正</button>
				{/if}
				<button type="submit" class="btn btn--submit" form="registration-form">登録</button>
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

	.btn {
		width: 108px;
		height: 45px;
		margin: 0;

		background-color: #2fa8e1;
		color: #fff;

		&--submit {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: #fff;
				left: 0;
				top: 0;
				opacity: 0;
				transition: opacity 300ms;
			}

			&:hover {
				&::after {
					opacity: 0.3;
				}
			}
		}

		&--edit {
			background-color: transparent;
			color: #2fa8e1;
			border: #2fa8e1 1px solid;
			transition: all 300ms;

			&:hover {
				background-color: #2fa8e1;
				color: #fff;
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
