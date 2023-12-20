<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { Picture } from '@/libs/customerTypes'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/libs/customerTypes'

	import { enhance } from '$app/forms'
	import { prefectures, months } from '@/data/data'
	import { getTotalOfBeds } from '@/libs/utils'

	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import UploadModal from '@/views/modals/UploadModal.svelte'
	import ResultModal from '../modals/ResultModal.svelte'
	import InputNumber from '@/components/InputNumber.svelte'
	import InputDepartment from '@/components/InputDepartment.svelte'
	import InputAddress from '@/components/InputAddress.svelte'
	import InputDate from '@/components/InputDate.svelte'
	import InputSelect from '@/components/InputSelect.svelte'
	import InputTextNumber from '@/components/InputTextNumber.svelte'
	import InputName from '@/components/InputName.svelte'
	import InputFreeText from '@/components/InputFreeText.svelte'
	import type { Department } from '@/models/Customer'
	import { inputIsValid, validationOnSubmit } from '@/libs/customerValidations'

	export let formType: string
	export let confirmationPageIsShown: boolean
	export let initialState: CustomerEntries
	// export let formIsValid: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false
	export let departmentsList: { id: number; cd1: string; cd2: string; name: string }[]
	// export let departmentsError: { department: boolean; numberOfBeds: boolean }[] = []

	$: isShown
	$: isSucceeded

	interface AddressAutoInfo {
		prefecture: string
		city: string
		address1: string
	}

	let uploadModalIsShown = false

	let formIsValid: CustomerEntriesErrors = {
		branchNumber: true,
		customerName: true,
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
		email: true,
		mobile: true,
		year: true,
		month: true,
		founder: true,
		departments: true,
		numberOfEmployees: true,
		homepage: true,
		numberOfFacilities: true,
		isActive: true,
		googleReview: true,
		reviews: true,
		businessContent: true,
		closingMonth: true,
		personInCharge: true,
		personInChargeRole: true,
		personInChargeMemo: true,
		approver: true,
		contactTime: true,
		pictures: true,
		miscellaneous: true,
		foundationDate: true
	}

	let departmentsError: { department: boolean; numberOfBeds: boolean }[] = []

	// ADDRESS AUTO FILL

	/**
	 * Fetch the address corresponding to the postal code and assign it to the initialState.address.
	 * APIから郵便番号とマッチしている住所を読み込んで、InitialState.addressをアップデートする。
	 * @param e
	 */
	const handlePostalCodeSearchSubmit = async (e: Event): Promise<void> => {
		e.preventDefault()

		let address: { prefecture: string; city: string; address1: string } = {
			prefecture: '',
			city: '',
			address1: ''
		}

		if (formIsValid.postalCode) {
			const api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
			const postalCode = initialState.postalCode
			const url = api + postalCode

			await fetch(url)
				.then(res => res.json())
				.then(data => {
					const results = data.results[0]

					address.prefecture = results.address1
					address.city = results.address2
					address.address1 = results.address3
				})
				.catch(err => console.log(err))
		}

		assignAddressInfo(address)
	}

	/**
	 * This will assign the address information in the address object in InitialState.
	 * @param address: corresponding to an address object with the prefecture, the city and the street
	 */
	const assignAddressInfo = (address: AddressAutoInfo): void => {
		Object.keys(address).map(key => {
			if (address[key as keyof AddressAutoInfo].length !== 0) {
				initialState[key as keyof AddressAutoInfo] = address[key as keyof AddressAutoInfo]
			}
		})

		initialState.address2 = ''
	}

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 *
	 */
	// const handleSubmit = (): void => {
	// 	if (confirmationPageIsShown) {
	// 		isShown = true
	// 		isSucceeded = true
	// 	}
	// }

	$: console.log(isShown)

	const handleSubmit = (e: Event): void => {
		// const form = document.getElementById('registration-form') as HTMLFormElement
		// form.addEventListener('submit', e => {
		// 	console.log('hi')

		// 	e.preventDefault()
		// 	isShown = true
		// 	isSucceeded = true
		// })
		// if (confirmationPageIsShown) {
		// 	// form.submit()
		// 	// e.preventDefault()
		// 	console.log('ho')

		// 	isShown = true
		// 	isSucceeded = true
		// }

		isShown = true
		isSucceeded = true

		// e.preventDefault()

		if (!confirmationPageIsShown) {
			console.log('hello')
			console.log(initialState)
			e.preventDefault()
			departmentsError = []
			const submitResult = validationOnSubmit(initialState, formIsValid)
			initialState.departments.map(department => {
				departmentsError.push({
					department: inputIsValid('department', department),
					numberOfBeds: !isNaN(department.numberOfBeds)
				})
			})
			confirmationPageIsShown = submitResult.isValid
			formIsValid = submitResult.formValidation

			return
		}
	}

	// UPLOAD PICTURES

	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onClick = (event: { detail: { key: string; fileToUpload: File } }) => {
		switch (event.detail.key) {
			case 'cancel':
				uploadModalIsShown = false
				break

			case 'upload':
				try {
					if (event.detail.fileToUpload !== undefined) {
						let newArray = initialState.pictures
						newArray.push({ file: event.detail.fileToUpload, memo: '' })
						initialState.pictures = newArray
						phase = 'success'
					} else {
						phase = 'error'
					}
				} catch (error) {
					phase = 'error'
				}
				break

			case 'success':
				uploadModalIsShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}

	$: {
		if (uploadModalIsShown && phase === 'success') {
			uploadModalIsShown = false
			phase = 'shown'
		}
	}

	/**
	 * Delete the corresponding image in the picture array in initialState.
	 * Initial State.picturesのArrayからユザーが削除したい写真を削除する。
	 * @param index: index of the picture in the "pictures" array. PicturesのArrayで写真のインデックスである。
	 */
	const handleDeleteImage = (index: number): void => {
		initialState.pictures = initialState.pictures.filter(
			(image: Picture) => initialState.pictures.indexOf(image) !== index
		)
	}

	// MANAGE DEPARTMENTS

	if (initialState.departments.length === 0) {
		initialState.departments = [
			{
				departmentId: 1,
				departmentName: '内科',
				numberOfBeds: 0
			}
		]
	}

	/**
	 * Add a department in the departements array.
	 * departementsのArrayni分科を追加する。
	 * @param e
	 */
	const handleAddDepartment = (e: Event): void => {
		e.preventDefault()

		initialState.departments = [
			...initialState.departments,
			{
				departmentId: 1,
				departmentName: '内科',
				numberOfBeds: 0
			}
		]
	}

	$: bedTotal = getTotalOfBeds(initialState.departments)
</script>

{#if uploadModalIsShown}
	<UploadModal {phase} on:click={onClick} />

	{#if phase === 'error'}
		<ResultModal isSucceeded={false} on:click={() => (phase = 'shown')} />
	{/if}
{/if}

<form
	class="form {confirmationPageIsShown ? 'hidden' : ''}"
	method={'POST'}
	action={formType === 'create'
		? '/customers/new?/create'
		: '/customers/' + initialState.id + '/edit?/update'}
	id="registration-form"
	on:submit={handleSubmit}
	use:enhance
>
	<input type="hidden" name="initialState" value={JSON.stringify(initialState)} />
	<p class="required-legend"><span class="required-mark">*</span> 必須</p>

	<fieldset class="fieldset fieldset--info1">
		<legend class="legend">情報１</legend>
		<div class="form-row">
			<InputTextNumber
				label={'枝番'}
				name={'branch-number'}
				errorMsg={'数字４桁で入力して下さい'}
				required={true}
				bind:value={initialState.branchNumber}
				bind:isValid={formIsValid.branchNumber}
			/>

			<Select
				label={'決算月'}
				options={months}
				name={'closing-month'}
				unit="月"
				bind:value={initialState.closingMonth}
			/>
		</div>

		<div class="form-row">
			<InputFreeText
				label="施設名"
				name="customer-name"
				placeholder={'株式会社○○'}
				errorMsg={'施設名を入力して下さい'}
				required={true}
				bind:value={initialState.customerName}
				bind:isValid={formIsValid.customerName}
			/>
		</div>

		<div class="form-row">
			<InputFreeText
				label="カナ"
				name="kana"
				placeholder={'カナ'}
				errorMsg={'カタカナで入力してください'}
				required={true}
				bind:value={initialState.kana}
				bind:isValid={formIsValid.kana}
			/>
		</div>

		<div class="form-row">
			<InputTextNumber
				label="医療機関番号"
				name="facility-number"
				errorMsg={'正しい医療機関番号を入力して下さい'}
				required={true}
				bind:value={initialState.facilityNumber}
				bind:isValid={formIsValid.facilityNumber}
			/>

			<Select
				label="個人／法人"
				name={'business-type'}
				errorMsg={'一つを選んで下さい'}
				required={true}
				options={[
					{ value: 'C', text: '法人' },
					{ value: 'I', text: '個人' }
				]}
				bind:value={initialState.businessType}
				bind:isValid={formIsValid.businessType}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--address">
		<legend class="legend">住所</legend>

		<div class="form-row">
			<InputTextNumber
				label="郵便番号"
				name="postal-code"
				placeholder={'0000000'}
				errorMsg={"郵便番号を入力して下さい（'〒'や'ー'なし）"}
				required={true}
				bind:value={initialState.postalCode}
				bind:isValid={formIsValid.postalCode}
			/>

			<button class="btn primary inline" on:click={handlePostalCodeSearchSubmit}>自動検索</button>
		</div>

		<div class="form-row">
			<InputSelect
				label={'都道府県'}
				name="prefecture"
				list={prefectures}
				placeholder="○○県"
				errorMsg={'都道府県を一つ選んでください'}
				required={true}
				bind:value={initialState.prefecture}
				bind:isValid={formIsValid.prefecture}
			/>

			<InputAddress
				label={'市区町村'}
				name="city"
				errorMsg={'正しい街をご入力ください'}
				required={true}
				bind:value={initialState.city}
				bind:isValid={formIsValid.city}
			/>
		</div>

		<div class="form-row">
			<InputAddress
				label={'住所１'}
				name="address1"
				errorMsg={'200文字以内で入力してください'}
				required={true}
				bind:value={initialState.address1}
				bind:isValid={formIsValid.address1}
			/>
		</div>

		<div class="form-row">
			<InputAddress
				label={'住所２'}
				name="address2"
				errorMsg={'200文字以内で入力してください'}
				required={true}
				bind:value={initialState.address2}
				bind:isValid={formIsValid.address2}
			/>
		</div>

		<div class="form-row">
			<InputTextNumber
				label="電話番号"
				name="phone-number"
				placeholder={'0000000000'}
				errorMsg={'正しい電話番号を入力して下さい（「ー」なし）'}
				required={true}
				bind:value={initialState.phoneNumber}
				bind:isValid={formIsValid.phoneNumber}
			/>
			<InputTextNumber
				name={'mobile-phone'}
				label={'携帯電話'}
				placeholder={'未入力'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				bind:value={initialState.mobile}
				bind:isValid={formIsValid.mobile}
			/>

			<InputTextNumber
				label="FAX番号"
				name="fax"
				placeholder={'0000000000'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				required={true}
				bind:value={initialState.fax}
				bind:isValid={formIsValid.fax}
			/>
		</div>

		<div class="form-row">
			<InputAddress name={'email'} label={'メール'} bind:value={initialState.email} />
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--foundation">
		<legend class="legend">創立</legend>
		<div class="form-row">
			<InputDate
				label={'設立年月日'}
				name={'foundation-date'}
				bind:value={initialState.foundationDate}
			/>

			<InputName
				label="設立者"
				name="founder"
				bind:value={initialState.founder}
				bind:isValid={formIsValid.founder}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--bed">
		<legend class="legend">病床設定</legend>

		<div class="form-row bed">
			<div class="input-wrapper">
				<h3 class="label">診療科目</h3>
				<div class="container">
					{#each initialState.departments as department, index}
						<InputDepartment
							bind:departments={initialState.departments}
							bind:department
							{index}
							{departmentsList}
							bind:isValid={departmentsError[index]}
						/>
					{/each}
				</div>
				<div class="input-wrapper bed-total">
					<h3 class="label">病床数合計</h3>
					<span class="content">{bedTotal}</span>
				</div>
			</div>
		</div>

		<div class="form-row">
			<div class="input-wrapper">
				<span class="label" />
				<button class="btn primary" on:click={handleAddDepartment}>+新規追加</button>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--info2">
		<legend class="legend">情報２</legend>

		<div class="form-row">
			<InputNumber
				name={'number-of-employees'}
				label={'従業員数'}
				required={true}
				bind:value={initialState.numberOfEmployees}
				bind:isValid={formIsValid.numberOfEmployees}
			/>
		</div>

		<div class="form-row">
			<InputFreeText
				label="事業内容"
				name="business-content"
				placeholder={'未入力'}
				errorMsg={'200文字以内で入力してください'}
				bind:value={initialState.business}
			/>
		</div>

		<div class="form-row">
			<InputAddress
				label="ホームページ"
				name="homepage"
				errorMsg={'200文字以内で入力してください'}
				bind:value={initialState.homepage}
				bind:isValid={formIsValid.homepage}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'Google評価'}
				name={'"google-review"'}
				options={[
					{ value: false, text: '無し' },
					{ value: true, text: '★有り' }
				]}
				bind:value={initialState.googleReview}
			/>

			{#if initialState.googleReview}
				<InputFreeText
					label="口コミ"
					name="commnents"
					placeholder={'件数、内容など'}
					errorMsg={'200文字以内で入力してください'}
					bind:value={initialState.reviews}
				/>
			{/if}
		</div>

		<div class="form-row">
			<InputNumber
				name={'number-of-branches'}
				label={'関連施設拠点数'}
				required={true}
				bind:value={initialState.numberOfFacilities}
				bind:isValid={formIsValid.numberOfFacilities}
			/>
		</div>

		<div class="form-row">
			<InputFreeText
				name={'miscellaneous'}
				label={'その他'}
				placeholder={'未入力'}
				bind:value={initialState.miscellaneous}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">担当者</legend>
		<div class="form-row">
			<InputName
				name={'person-in-charge'}
				label={'ご担当者名'}
				bind:value={initialState.personInCharge}
			/>
			<Input
				name={'role'}
				label={'役職'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				bind:value={initialState.personInChargeRole}
			/>
		</div>

		<div class="form-row">
			<InputFreeText
				name={'person-in-charge-memo'}
				label={'ご担当メモ'}
				placeholder={'未入力'}
				bind:value={initialState.personInChargeMemo}
			/>
		</div>
		<div class="form-row">
			<InputName name={'approver'} label={'決裁者'} bind:value={initialState.approver} />
		</div>
		<div class="form-row">
			<InputFreeText
				name={'prefered-contact-time'}
				label={'連絡の取りやすい時間'}
				placeholder={'未入力'}
				bind:value={initialState.contactTime}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">画像</legend>

		<div class="form-row">
			<div class="input-wrapper">
				<h3 class="label">参考書類など画像データ</h3>

				<div class="container">
					{#if initialState.pictures === undefined || initialState.pictures.length === 0}
						<div class="card">
							<button class="image-empty" on:click={() => (uploadModalIsShown = true)}>
								<span>+</span>
							</button>
							<p class="image-description">画像がアップロードされていません。</p>
						</div>
					{:else}
						{#each initialState.pictures as image, index}
							<div class="card" id={image.file.name}>
								<div class="image-wrapper">
									<img src={URL.createObjectURL(image.file)} alt="" />
								</div>

								<InputFreeText
									placeholder="メモ"
									name={'image-description'}
									bind:value={image.memo}
								/>
								<button
									type="button"
									class="btn primary inline"
									on:click={() => handleDeleteImage(index)}
								>
									削除
								</button>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="input-wrapper">
				<span class="label" />
				<button type="button" class="btn add primary" on:click={() => (uploadModalIsShown = true)}>
					＋画像追加
				</button>
			</div>
		</div>
	</fieldset>
</form>

<style lang="scss">
	.form {
		width: auto;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		border-radius: 16px;
		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.form-row {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 18px;
		margin-bottom: 20px;
	}

	.btn {
		margin: 0;
	}

	.fieldset {
		margin-bottom: 2rem;

		.legend {
			display: none;
		}
	}

	.hidden {
		// display: none;
		visibility: hidden;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.required-legend {
		float: right;
		font-size: 14px;
	}

	:global(.required-mark) {
		color: var(--error);
	}

	:global(.input-wrapper) {
		position: relative;
		display: flex;
		gap: 10px;
		align-items: flex-start;
	}

	:global(.input-wrapper > .label) {
		width: fit-content;
		font-size: 18px;
		font-weight: 400;
	}

	:global(.input-wrapper:first-child > .label) {
		width: 140px;
	}

	:global(.input-wrapper .input::placeholder) {
		color: rgb(206, 205, 205);
	}
	:global(.input-wrapper .input:focus) {
		border-color: var(--primary-color);
	}

	:global(.input-wrapper .font-error) {
		position: absolute;
		right: 0;
		bottom: -14px;
		font-size: 10px;
		opacity: 0;
	}

	:global(.error .input) {
		transition: border 300ms;
		border-color: var(--error);
		animation: buzz 100ms;
		animation-iteration-count: 3;
	}

	:global(.error .font-error) {
		opacity: 1;
		transition: all 300ms;
	}

	:global(.input-wrapper .unit) {
		height: 31px;
		display: flex;
		align-items: center;
	}

	.input-wrapper {
		.input {
			max-height: 31px;
		}
	}

	.image-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 124px;
		width: 200px;
		border: 2px dashed var(--primary);
		border-radius: 8px;
		margin: 0;

		span {
			font-size: 48px;
			color: var(--primary);
		}
	}

	.card {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		width: 100%;
		padding: 10px 21px;
		gap: 12px;
		flex-wrap: wrap;
		background-color: #f4f4f4;
		border-radius: 8px;
	}

	.image-wrapper {
		position: relative;
		min-height: 124px;
		width: 200px;
		border-radius: 4px;
		overflow: hidden;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			object-fit: contain;
		}
	}

	.bed-total {
		align-self: flex-end;
	}

	@keyframes buzz {
		0% {
			transform: translateX(0px);
		}

		50% {
			transform: translateX(-10px);
		}

		100% {
			transform: translateX(10px);
		}
	}
</style>
