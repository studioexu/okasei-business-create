<script lang="ts" context="module"></script>

<script lang="ts">
	import UploadModal from '@/views/modals/UploadModal.svelte'
	import Input from '../new/Components/Input.svelte'
	import DateInput from './Components/DateInput.svelte'
	import NegociationInfo from './views/Form/NegociationInfo.svelte'
	import CustomerInfo from './views/Form/CustomerInfo.svelte'
	import { inputIsValid } from '@/routes/customers/utils/validations'
	import CustomerInfoConfirmation from './views/Confirmation/CustomerInfoConfirmation.svelte'
	import NegociationInfoConfirmation from './views/Confirmation/NegociationInfoConfirmation.svelte'
	let isShown = false

	interface Picture {
		file: File
		memo: string
	}

	interface Department {
		department: string
		bedQuantity: string
	}

	let currentFieldsetDisplayed = 'negociationInfo'

	const updateIndexArray = (maxIndex: number) => {
		const array: string[] = []
		for (let i = 0; i < maxIndex; i++) {
			array.push(i.toString())
		}

		return array
	}

	let initialState1: custInfo1 = {
		name: '',
		cd: '',
		branchNumber: '',
		institutionCd: '',
		business: '',
		url: '',
		googleReview: '',
		directLine: '',
		fax: '',
		email: '',
		mobile: '',
		numberOfEmployees: '',
		numberOfBranches: '',
		miscellaneous: '',
		departments: [],
		personInCharge: '',
		personInChargeRole: '',
		personInChargeMemo: '',
		approver: '',
		contactTime: '',
		pictures: []
	}

	let initialState1Errors = {
		name: false,
		cd: false,
		branchNumber: false,
		institutionCd: false,
		business: false,
		url: false,
		googleReview: false,
		directLine: false,
		fax: false,
		email: false,
		mobile: false,
		numberOfEmployees: false,
		numberOfBranches: false,
		miscellaneous: false,
		departments: false,
		personInCharge: false,
		personInChargeRole: false,
		personInChargeMemo: false,
		approver: false,
		contactTime: false,
		pictures: false
	}

	interface initialState1ErrorsType {
		name: boolean
		cd: boolean
		branchNumber: boolean
		institutionCd: boolean
		business: boolean
		url: boolean
		googleReview: boolean
		directLine: boolean
		fax: boolean
		email: boolean
		mobile: boolean
		numberOfEmployees: boolean
		numberOfBranches: boolean
		miscellaneous: boolean
		departments: boolean
		personInCharge: boolean
		personInChargeRole: boolean
		personInChargeMemo: boolean
		approver: boolean
		contactTime: boolean
		pictures: boolean
	}

	interface custInfo1 {
		name: string
		cd: string
		branchNumber: string
		institutionCd: string
		business: string
		url: string
		googleReview: string
		directLine: string
		fax: string
		email: string
		mobile: string
		numberOfEmployees: string
		numberOfBranches: string
		miscellaneous: string
		departments: Department[]
		personInCharge: string
		personInChargeRole: string
		personInChargeMemo: string
		approver: string
		contactTime: string
		pictures: Picture[]
	}

	let initialState2 = {
		status: '',
		startingDate: '',
		condition: '',
		inflow: '',
		preference: '',
		billingDate: '',
		scheduledDeposit: '',
		paymentMethod: '',
		outcome: '',
		nextContact: '',
		lastContact: '',
		postalCode: '',
		prefecture: '',
		city: '',
		address1: '',
		address2: '',
		distanceKm: '',
		distanceTime: '',
		estimate: [],
		importantMemo: [],
		employeeInCharge: '',
		responsiblePerson: '',
		communication: '',
		directMessage: '',
		videoUrl: '',
		checkboxes: [],
		checkBottleneck: '',
		occasion: '',
		risk: ''
	}

	let initialState2Errors = {
		status: false,
		startingDate: false,
		condition: false,
		inflow: false,
		preference: false,
		billingDate: false,
		scheduledDeposit: false,
		paymentMethod: false,
		outcome: false,
		nextContact: false,
		postalCode: false,
		prefecture: false,
		city: false,
		address1: false,
		address2: false,
		distanceKm: false,
		distanceTime: false,
		estimate: false,
		importantMemo: false,
		employeeInCharge: false,
		responsiblePerson: false,
		communication: false,
		directMessage: false,
		videoUrl: false,
		checkboxes: false,
		checkBottleneck: false,
		occasion: false,
		risk: false
	}

	let initialState3 = {
		negociationHistory: []
	}

	$: console.log(initialState1Errors)

	let displayClass: string = ''
	$: displayClass

	const switchFieldSetDisplayed = (e: any) => {
		console.log(e.target.id)
		const targetBtn = e.target
		const fieldsetToDisplay = targetBtn.id
		const currentBtn = document.getElementById(currentFieldsetDisplayed)
		const errorMessage = document.querySelector('.error-message')
		let isValid = true

		console.log(currentBtn)

		if (fieldsetToDisplay !== currentFieldsetDisplayed) {
			switch (currentFieldsetDisplayed) {
				case 'customerInfo':
					// Object.keys(initialState1).forEach(key => {
					// 	if (initialState1[key as keyof Object]) {
					// 		initialState1
					// 	}
					// })
					initialState1Errors.name = !inputIsValid('customerName', initialState1.name)

					isValid = initialStateIsValid(initialState1Errors)

					break
				case 'negociationInfo':
					isValid = initialStateIsValid(initialState2Errors)
					break

				default:
					break
			}

			if (!isValid) {
				currentBtn?.classList.add('error')
				displayClass = 'display'
			} else {
				currentBtn?.classList.remove('error')
				displayClass = ''
			}

			if (isValid) {
				currentFieldsetDisplayed = fieldsetToDisplay
			}
		}
	}

	const initialStateIsValid = (initialStateErrors: Object) => {
		let isValid = true
		Object.keys(initialStateErrors).forEach(key => {
			console.log(initialStateErrors[key as keyof Object])
			if (initialStateErrors[key as keyof Object]) {
				return (isValid = false)
			}
		})

		return isValid
	}

	$: console.log(initialState1)

	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onClick = (event: { detail: { key: string; fileToUpload: File } }) => {
		switch (event.detail.key) {
			case 'cancel':
				isShown = false
				break

			case 'upload':
				let newArray = initialState1.pictures
				newArray.push({ file: event.detail.fileToUpload, memo: '' })
				initialState1.pictures = newArray
				phase = 'success'
				break

			case 'success':
				isShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}

	$: {
		if (isShown && phase === 'success')
			// setTimeout(() => {
			isShown = false
		phase = 'shown'
		// }, 2000)
	}
</script>

{#if isShown}
	<UploadModal {phase} on:click={onClick} />
{/if}

<section class="section">
	<header class="section__header">
		<div class="select-form-container">
			<button class="btn btn--select secondary" id="customerInfo" on:click={switchFieldSetDisplayed}
				>お客様情報登録</button
			>
			<button
				class="btn btn--select secondary"
				id="negociationInfo"
				on:click={switchFieldSetDisplayed}>商談情報登録</button
			>
			<button
				class="btn btn--select secondary"
				id="negociationHistory"
				on:click={switchFieldSetDisplayed}>商談経緯登録</button
			>
		</div>
		<p class="error-message {displayClass}">フォームには必須な項目を入力してください</p>
	</header>

	<div class="section__main">
		<form action="">
			{#if currentFieldsetDisplayed === 'customerInfo'}
				<CustomerInfo bind:initialState1 {updateIndexArray} bind:isShown />
				<CustomerInfoConfirmation {initialState1} />
			{/if}

			{#if currentFieldsetDisplayed === 'negociationInfo'}
				<NegociationInfo bind:initialState2 {updateIndexArray} />
				<NegociationInfoConfirmation {initialState2} />
			{/if}

			{#if currentFieldsetDisplayed === 'negociationHistory'}
				<fieldset class="fieldset">
					<legend class="fieldset__header">商談経緯</legend>
					<div class="fieldset__main">
						<div class="form-row">
							<DateInput label={'成否日'} name={'outcome-day'} />

							<Input name={'history-memo'} placeholder={'未入力'} />

							<button class="primary btn">削除</button>
						</div>
					</div>
				</fieldset>
			{/if}
		</form>
	</div>

	<footer class="section__footer" />
</section>

<style lang="scss">
	.section {
		font-family: 'Noto Sans JP';
		&__header {
			.select-form-container {
				display: flex;
				justify-content: flex-start;
				gap: 18px;
			}
		}

		&__main {
			background-color: #fff;
			border-radius: 16px;
			padding: 0 37px;
			padding-top: 28px;
			padding-bottom: 48px;
			margin-top: 20px;
		}
	}

	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
	}

	.fieldset {
		&__header {
			color: var(--primary);
			font-weight: 700;
			margin-bottom: 18px;
		}
	}

	.container {
		position: relative;
		background-color: #f4f4f4;
		padding: 10px 21px;
		border-radius: 8px;
		width: 100%;

		.form-row {
			justify-content: space-between;
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 18px;
		// width: 100%;
	}

	.btn {
		margin: 0;
		align-self: flex-start;
		padding: 0;
		padding-top: 0;
		padding-bottom: 0;
		height: 32px;

		// &.delete {
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: center;
		// 	padding: 0;
		// 	height: 32px;
		// 	width: 70px;
		// 	min-width: 0;
		// 	margin-left: auto;
		// }
	}

	:global(button.error) {
		color: var(--error);
		border-color: var(--error);
	}

	.error-message {
		display: none;
		font-size: 13px;
		color: var(--error);

		&.display {
			display: inline;
		}
	}
</style>
