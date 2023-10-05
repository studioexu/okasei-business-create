<script lang="ts">
	// import type { CompanyInfo } from '../+page.svelte'
	import ConfirmationBis from './components/ConfirmationBis.svelte'
	import Form from './components/Form.svelte'
	import type { CompanyInfo, CompanyEntries } from '../utils/types'

	console.log('hello')

	import { Company } from '../utils/classes'

	// export let data

	// let company = data.company
	let company: CompanyInfo = {
		id: '',
		customerNumber: '',
		branchNumber: '',
		facilityName: '',
		kana: '',
		facilityNumber: '',
		businessType: '',
		address: {
			postalCode: '',
			prefecture: '',
			city: '',
			address1: '',
			address2: '',
			phoneNumber: '',
			fax: ''
		},
		numberOfEmployees: '',
		homepage: '',
		numberOfFacilities: '',
		foundation: {
			month: '',
			year: '',
			founder: ''
		},
		bedding: [
			{
				department: '',
				quantity: ''
			},
			{
				department: '',
				quantity: ''
			}
		],
		registration: {
			status: '',
			registrationDate: '',
			registrationTime: ''
		},
		update: {
			status: '',
			lastUpdatedDate: '',
			lastUpdatedTime: ''
		},
		delete: {
			status: ' ',
			deletedDate: '',
			deletedTime: ''
		}
	}

	let initialState: CompanyEntries = {
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

	// console.log(initialState)

	// const newCompany = new Company(initialState)

	// console.log(newCompany)

	// $: console.log(initialState)

	let checkIsTrue = false

	const handleEditClicked = () => {
		checkIsTrue = false
	}
</script>

<section class="section section--form">
	<header class="section__header">
		{#if checkIsTrue}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		<ConfirmationBis bind:initialState bind:checkIsTrue />
		<Form bind:checkIsTrue bind:initialState />
	</div>

	<footer class="section__footer">
		<div class="form__footer">
			{#if checkIsTrue}
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
