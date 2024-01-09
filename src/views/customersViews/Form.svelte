<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { CustomerEntries, CustomerEntriesErrors } from '@/libs/customerTypes'
	import type { CustomerImageFactory } from '@/Factories/CustomerFactory'

	import { applyAction, enhance } from '$app/forms'
	import { prefectures, months } from '@/data/data'
	import { getTotalOfBeds } from '@/libs/utils'
	import { convertDataToBase64, formatCustomer } from '@/libs/formatters'
	import { inputIsValid, validationOnSubmit } from '@/libs/customerValidations'

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
	import Row from '@/components/Row.svelte'
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import ButtonDelete from '@/components/ButtonDelete.svelte'
	import { updateCustomer } from '@/libs/actions'
	import { currentApi } from '@/data/api'

	export let formType: string
	export let confirmationPageIsShown: boolean
	export let initialState: CustomerEntries
	export let formIsValid: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false
	export let departmentsList: { id: number; cd1: string; cd2: string; name: string }[]
	export let departmentsError: { department: boolean; numberOfBeds: boolean }[] = []
	export let isSubmittable: boolean

	let uploadModalIsShown = false

	// ADDRESS AUTO FILL

	/**
	 * Fetch the address corresponding to the postal code and assign it to the initialState.address.
	 * APIから郵便番号とマッチしている住所を読み込んで、InitialState.addressをアップデートする。
	 * @param e
	 */
	const getAddressWithPostalCode = async (e: Event): Promise<void> => {
		e.preventDefault()

		if (formIsValid.postalCode) {
			const api = 'https://zipcloud.ibsnet.co.jp/api/search?zipcode='
			const postalCode = initialState.postalCode
			const url = api + postalCode

			await fetch(url)
				.then(res => res.json())
				.then(data => {
					const results = data.results[0]

					initialState.prefecture = results.address1
					initialState.city = results.address2
					initialState.address1 = results.address3

					initialState.address2 = ''
				})
				.catch(err => console.log(err))
		}
	}

	/**
	 * Triggered when the form is submitted by the user (when the confirmation page is displayed).
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 *
	 */
	const handleSubmit = (e: Event): void => {
		if (confirmationPageIsShown) {
			// isShown = true
			// isSucceeded = true
			isSubmittable = true

			// const updatedCustomer = formatCustomer('update', initialState)

			// if (initialState.id) {
			// 	try {
			// 		updateCustomer(updatedCustomer, currentApi, initialState.id)
			// 		isSucceeded = true
			// 		isShown = true
			// 	} catch (error) {
			// 		console.log(error)
			// 		isSucceeded = false
			// 		isShown = true
			// 	}
			// }
		}
		if (!confirmationPageIsShown) {
			e.preventDefault()
			console.log('not shown')
			const submitResult = validationOnSubmit(formIsValid)
			departmentsError = []
			initialState.departments.map(department => {
				departmentsError.push({
					department: inputIsValid('department', department),
					numberOfBeds: !isNaN(department.numberOfBeds)
				})
			})
			confirmationPageIsShown = submitResult.isValid
			formIsValid = submitResult.formValidation
		}
	}

	$: console.log(initialState)

	// UPLOAD PICTURES

	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onClick = async (event: { detail: { key: string; fileToUpload: File } }) => {
		switch (event.detail.key) {
			case 'cancel':
				uploadModalIsShown = false
				break

			case 'upload':
				try {
					if (event.detail.fileToUpload !== undefined) {
						function escapeBase64String(base64String: string) {
							// Escape double quotes in the Base64 string
							return base64String.replace(/"/g, '\\"')
						}

						let newArray = initialState.pictures
						const convertedFile = await convertDataToBase64(event.detail.fileToUpload)
						const escapedBase64 = escapeBase64String(convertedFile)

						// const newPicture: CustomerImageFactory = {
						// 	memo: '',
						// 	data: escapedBase64
						// }

						const newPicture: CustomerImageFactory = {
							memo: '',
							data: convertedFile
						}

						newArray.push(newPicture)
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
			(image: CustomerImageFactory) => initialState.pictures.indexOf(image) !== index
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
	enctype="multipart/form-data"
	on:submit|preventDefault={handleSubmit}
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		//submit the form, only once it succeeded.
		isSubmittable ? submitter : cancel()
		// //Don't reset the form, if there are any errors during the validation.
		return async ({ result, update }) => {
			// await update({ reset: false })
			console.log(result)
			if (result.type === 'success') {
				isSucceeded = true
				isShown = true
			}
			if (result.type === 'error') {
				isSucceeded = false
				isShown = true
			}

			await update()
		}
	}}
>
	<!-- <form
	class="form {confirmationPageIsShown ? 'hidden' : ''}"
	method={'POST'}
	on:submit|preventDefault={handleSubmit}
	id="registration-form"
> -->
	<!-- <form
	class="form {confirmationPageIsShown ? 'hidden' : ''}"
	method={'POST'}
	action={formType === 'create'
		? '/customers/new?/create'
		: '/customers/' + initialState.id + '/edit?/update'}
	id="registration-form"
	enctype="multipart/form-data"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		//submit the form, only once it succeeded.
		// confirmationPageIsShown ? submitter?.click() : cancel()
		// cancel()

		console.log(formData.get('initial-state'))

		const updatedCustomer = formatCustomer('update', initialState)

		if (initialState.id) {
			try {
				updateCustomer(updatedCustomer, currentApi, initialState.id)
				isSucceeded = true
				isShown = true
			} catch (error) {
				console.log(error)
				isSucceeded = false
				isShown = true
			}
		}

		//Don't reset the form, if there are any errors during the validation.
		return async ({ result, update }) => {
			await update({ reset: false })

			if (result.type === 'success') {
				isSucceeded = true
				isShown = true
			}

			if (result.type === 'error') {
				isSucceeded = false
				isShown = true
			}
		}
	}}
> -->
	<input hidden id="initial-state" name="initial-state" value={JSON.stringify(initialState)} />
	<input hidden id="pictures" name="pictures" value={JSON.stringify(initialState.pictures)} />
	<p class="required-legend"><span class="required-mark">*</span> 必須</p>

	<fieldset class="fieldset fieldset--info1">
		<legend class="legend">情報１</legend>

		<Row>
			{#if initialState.businessType === 'C'}
				<InputTextNumber
					label={'枝番'}
					name={'branch-number'}
					errorMsg={'数字４桁で入力して下さい'}
					required={true}
					bind:value={initialState.branchNumber}
					bind:isValid={formIsValid.branchNumber}
				/>
			{/if}

			<Select
				label={'決算月'}
				options={months}
				name={'closing-month'}
				unit="月"
				bind:value={initialState.closingMonth}
			/>
		</Row>

		{#if initialState.businessType === 'C'}
			<Row>
				<InputFreeText
					label="法人名"
					name="corporate-name"
					placeholder={'○○法人'}
					errorMsg={'法人名を入力して下さい'}
					bind:value={initialState.corporateName}
					bind:isValid={formIsValid.corporateName}
				/>
			</Row>
		{/if}

		<Row>
			<InputFreeText
				label={initialState.businessType === 'C' ? '施設名' : '名前'}
				name="customer-name"
				placeholder={'株式会社○○'}
				errorMsg={initialState.businessType === 'C'
					? '施設名を入力して下さい'
					: '顧客様の名前を入力して下さい'}
				required={true}
				bind:value={initialState.customerName}
				bind:isValid={formIsValid.customerName}
			/>
		</Row>

		<Row>
			<InputFreeText
				label="カナ"
				name="kana"
				placeholder={'カナ'}
				errorMsg={'カタカナで入力してください'}
				required={true}
				bind:value={initialState.kana}
				bind:isValid={formIsValid.kana}
			/>
		</Row>

		<Row>
			{#if initialState.businessType === 'C'}
				<InputTextNumber
					label="医療機関番号"
					name="facility-number"
					errorMsg={'正しい医療機関番号を入力して下さい'}
					required={true}
					bind:value={initialState.facilityNumber}
					bind:isValid={formIsValid.facilityNumber}
				/>
			{/if}

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
		</Row>
	</fieldset>

	<fieldset class="fieldset fieldset--address">
		<legend class="legend">住所</legend>

		<Row>
			<InputTextNumber
				label="郵便番号"
				name="postal-code"
				placeholder={'0000000'}
				errorMsg={"郵便番号を入力して下さい（'〒'や'ー'なし）"}
				required={true}
				bind:value={initialState.postalCode}
				bind:isValid={formIsValid.postalCode}
			/>

			<button class="btn primary inline" on:click={getAddressWithPostalCode}>自動検索</button>
		</Row>

		<Row>
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
		</Row>

		<Row>
			<InputAddress
				label={'住所１'}
				name="address1"
				errorMsg={'200文字以内で入力してください'}
				required={true}
				bind:value={initialState.address1}
				bind:isValid={formIsValid.address1}
			/>
		</Row>

		<Row>
			<InputAddress
				label={'住所２'}
				name="address2"
				errorMsg={'200文字以内で入力してください'}
				required={true}
				bind:value={initialState.address2}
				bind:isValid={formIsValid.address2}
			/>
		</Row>

		<Row>
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
				name={'mobile'}
				label={'携帯電話'}
				placeholder={'0000000000'}
				errorMsg={'正しい携帯電話番号を入力して下さい'}
				bind:value={initialState.mobile}
				bind:isValid={formIsValid.mobile}
			/>

			<InputTextNumber
				label="FAX番号"
				name="fax"
				placeholder={'0000000000'}
				errorMsg={'正しいFAX番号を入力して下さい'}
				bind:value={initialState.fax}
				bind:isValid={formIsValid.fax}
			/>
		</Row>

		<Row>
			<InputAddress name={'email'} label={'メール'} bind:value={initialState.email} />
		</Row>
	</fieldset>

	<fieldset class="fieldset fieldset--foundation">
		<legend class="legend">創立</legend>
		<Row>
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
		</Row>
	</fieldset>

	<fieldset class="fieldset fieldset--bed">
		<legend class="legend">病床設定</legend>
		<Row>
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

				<DetailWrapper id={'bed-total'} content={bedTotal.toString()} label={'病床数合計'} />
			</div>
		</Row>

		<Row>
			<div class="input-wrapper">
				<span class="label" />
				<button class="btn primary" on:click={handleAddDepartment}>+新規追加</button>
			</div>
		</Row>
	</fieldset>

	<fieldset class="fieldset fieldset--info2">
		<legend class="legend">情報２</legend>

		{#if initialState.businessType === 'C'}
			<Row>
				<InputNumber
					name={'number-of-employees'}
					label={'従業員数'}
					required={true}
					bind:value={initialState.numberOfEmployees}
					bind:isValid={formIsValid.numberOfEmployees}
				/>
			</Row>
			<Row>
				<InputFreeText
					label="事業内容"
					name="business-content"
					placeholder={'未入力'}
					errorMsg={'200文字以内で入力してください'}
					bind:value={initialState.business}
				/>
			</Row>
			<Row>
				<InputAddress
					label="ホームページ"
					name="homepage"
					errorMsg={'200文字以内で入力してください'}
					bind:value={initialState.homepage}
					bind:isValid={formIsValid.homepage}
				/>
			</Row>
			<Row>
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
			</Row>
			<Row>
				<InputNumber
					name={'number-of-branches'}
					label={'関連施設拠点数'}
					required={true}
					bind:value={initialState.numberOfFacilities}
					bind:isValid={formIsValid.numberOfFacilities}
				/>
			</Row>
		{/if}

		<Row>
			<InputFreeText
				name={'miscellaneous'}
				label={'その他'}
				placeholder={'未入力'}
				bind:value={initialState.miscellaneous}
			/>
		</Row>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">担当者</legend>
		<Row>
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
		</Row>
		<Row>
			<InputFreeText
				name={'person-in-charge-memo'}
				label={'ご担当メモ'}
				placeholder={'未入力'}
				bind:value={initialState.personInChargeMemo}
			/>
		</Row>
		<Row>
			<InputName name={'approver'} label={'決裁者'} bind:value={initialState.approver} />
		</Row>
		<Row>
			<InputFreeText
				name={'prefered-contact-time'}
				label={'連絡の取りやすい時間'}
				placeholder={'未入力'}
				bind:value={initialState.contactTime}
			/>
		</Row>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">画像</legend>

		<Row>
			<div class="input-wrapper">
				<h3 class="label">参考書類など画像データ</h3>

				<div class="container">
					{#if initialState.pictures === undefined || initialState.pictures.length === 0}
						<article class="card">
							<button
								type="button"
								class="image-empty"
								on:click={() => (uploadModalIsShown = true)}
							>
								<span>+</span>
							</button>
							<p class="image-description">画像がアップロードされていません。</p>
						</article>
					{:else}
						{#each initialState.pictures as image, index}
							<article class="card">
								<div class="image-wrapper">
									<img src={image.data} alt="" />
									<!-- svelte-ignore a11y-img-redundant-alt -->
									<!-- <img src={URL.createObjectURL(image.data)} alt="image" /> -->
								</div>

								<InputFreeText
									placeholder="メモ"
									name={'image-description' + index.toString()}
									bind:value={image.memo}
								/>
								<ButtonDelete on:delete={() => handleDeleteImage(index)} />
							</article>
						{/each}
					{/if}
				</div>
			</div>
		</Row>
		<Row>
			<div class="input-wrapper">
				<span class="label" />
				<button type="button" class="btn add primary" on:click={() => (uploadModalIsShown = true)}>
					＋画像追加
				</button>
			</div>
		</Row>
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
		display: none;
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

	:global(.input-wrapper:first-child > .label) {
		width: 140px;
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		.label {
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 31px;
			font-weight: 400;
			font-size: 18px;
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
