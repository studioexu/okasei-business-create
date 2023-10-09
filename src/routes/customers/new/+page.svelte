<script lang="ts">
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'
	// import Form from './components/Form/Form.svelte'
	import Form from '@/views/customersViews/Form/Form.svelte'
	import type { CustomerEntries } from '../utils/types'

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

	let verificationPageDisplayed = false

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
				left: 0;
				top: 0;

				background-color: #fff;
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
