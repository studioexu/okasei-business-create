<script lang="ts">
	import type { CompanyEntries } from '../../utils/types'
	import ConfirmationBis from './components/Confirmation/ConfirmationBis.svelte'
	import Form from './components/Form/Form.svelte'
	export let data

	let company = data.company
	let verificationPageDisplayed = false

	let initialState: CompanyEntries = {
		id: company.id,
		branchNumber: company.branchNumber,
		facilityName: company.facilityName,
		kana: company.kana,
		facilityNumber: company.facilityNumber,
		businessType: company.businessType,
		postalCode: company.address.postalCode,
		prefecture: company.address.prefecture,
		city: company.address.city,
		address1: company.address.address1,
		address2: company.address.address2,
		phoneNumber: company.address.phoneNumber,
		fax: company.address.fax,
		year: company.foundation.year,
		month: company.foundation.month,
		founder: company.foundation.founder,
		bedding: company.bedding,
		numberOfEmployees: company.numberOfEmployees,
		homepage: company.homepage,
		numberOfFacilities: company.numberOfFacilities
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
		<ConfirmationBis bind:verificationPageDisplayed bind:initialState />
		<Form bind:verificationPageDisplayed bind:company bind:initialState />
	</div>

	<footer class="section__footer">
		<div class="form__footer">
			{#if verificationPageDisplayed}
				<button class="btn btn--edit" on:click={handleEditClicked}>修正</button>
			{/if}
			<button class="btn btn--submit" form="registration-form">登録</button>
		</div>
	</footer>
</section>

<style lang="scss">
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
