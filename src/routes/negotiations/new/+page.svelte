<script lang="ts" context="module"></script>

<script lang="ts">
	import UploadModal from '@/views/modals/UploadModal.svelte'
	import Input from '../new/Components/Input.svelte'
	import DateInput from './Components/DateInput.svelte'
	import NegociationInfo from './views/Form/NegociationInfo.svelte'
	import CustomerInfo from './views/Form/CustomerInfo.svelte'
	let isShown = false

	interface Picture {
		file: File
		memo: string
	}

	interface Department {
		department: string
		bedQuantity: string
	}

	let currentFieldsetDisplayed = 'customerInfo'

	const updateIndexArray = (maxIndex: number) => {
		const array: string[] = []
		for (let i = 0; i < maxIndex; i++) {
			array.push(i.toString())
		}

		return array
	}

	// const updatePictures = (pictureArrayToAdd: File[]) => {
	// 	let array = []
	// 	for (let i = 0; i < imagesToUpload.length; i++) {
	// 		array.push({ file: imagesToUpload[i], memo: '' })
	// 	}

	// 	return array
	// }

	// $: initialState1.pictures = imagesToUpload

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
		persoInChargeMemo: '',
		approver: '',
		contactTime: '',
		pictures: []
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
		persoInChargeMemo: string
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

	let initialState3 = {
		negociationHistory: []
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
			setTimeout(() => {
				isShown = false
				phase = 'shown'
			}, 2000)
	}
</script>

{#if isShown}
	<UploadModal {phase} on:click={onClick} />
{/if}

<section class="section">
	<header class="section__header">
		<div class="select-form-container">
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'customerInfo')}>お客様情報登録</button
			>
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'negociationInfo')}>商談情報登録</button
			>
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'negociationHistory')}>商談経緯登録</button
			>
		</div>
	</header>

	<div class="section__main">
		<form action="">
			{#if currentFieldsetDisplayed === 'customerInfo'}
				<CustomerInfo bind:initialState1 {updateIndexArray} bind:isShown />
			{/if}

			{#if currentFieldsetDisplayed === 'negociationInfo'}
				<NegociationInfo bind:initialState2 {updateIndexArray} />
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

		&.delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			height: 32px;
			width: 70px;
			min-width: 0;
			margin-left: auto;
		}
	}
</style>
