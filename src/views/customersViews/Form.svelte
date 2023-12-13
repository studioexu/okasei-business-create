<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { Picture } from '@/libs/customerTypes'
	import type {
		CustomerEntries,
		CustomerEntriesErrors,
		AddressAutoInfo
	} from '@/libs/customerTypes'

	import { enhance } from '$app/forms'
	import { prefectures, months } from '@/data/data'
	import { getTotalOfBeds, toKebab } from '@/libs/utils'

	import Icon from '@/components/Icon.svelte'
	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import SelectWithInput from '@/components/SelectWithInput.svelte'
	import UploadModal from '@/views/modals/UploadModal.svelte'
	import ResultModal from '../modals/ResultModal.svelte'
	import NumberInput from '@/components/NumberInput.svelte'

	export let formType: string
	export let confirmationPageIsShown: boolean
	export let initialState: CustomerEntries
	export let formIsValid: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false
	export let departmentsList: { id: number; cd1: string; cd2: string; name: string }[]

	let uploadModalIsShown = false

	interface Row {
		id: string
		type: string
		list?: string
		options?: string[] | { value: boolean; text: string }[]
		text: string
		isError?: boolean
		errorText?: string
		inputSize?: string
		required?: boolean
		unit?: string
		placeholder?: string
	}

	interface Fieldset {
		legend: string
		fieldset: Row[][]
	}

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
	const handleSubmit = (): void => {
		if (confirmationPageIsShown) {
			isShown = true
			isSucceeded = true
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

	/**
	 * Delete one department with the corresponding index in the "departments" array.
	 * DepartmentsのArrayから分科を消す。
	 * @param index: number, corresponding to the position of the department we want to delete in the "departments" array. 削除したい分科のインデックスである。
	 *
	 */
	const deleteDepartment = (index: number) => {
		initialState.departments = initialState.departments.filter(
			department => initialState.departments.indexOf(department) !== index
		)
	}

	$: bedTotal = getTotalOfBeds(initialState.departments)

	/**
	 * The user selects a department, the function will update the "departments" array and, by extension, the initialState.departments.
	 * ユザーが分科を選択すると、DepartmentsのArrayとInitialState.departementsのArrayをアップデートする。
	 * @param e: event, form the event, we will get the name of the department. イベントから、から分科名を貰う。
	 * @param index：number, index of the department in the departments array. DepartmentsのArrayで分科のインデックスである。
	 */
	const handleSelectDepartment = (e: Event, index: number): void => {
		const departmentName: string = (e.target as HTMLOptionElement).value

		if (departmentName) {
			const departmentId = (
				document.querySelector(
					"#departments option[value='" + departmentName + "']"
				) as HTMLOptionElement
			)?.dataset.value

			const selectedDepartment = departmentsList.find(
				department => departmentId && department.id === parseInt(departmentId)
			)

			if (selectedDepartment) {
				initialState.departments[index].departmentId = selectedDepartment.id
				initialState.departments[index].departmentName = selectedDepartment.name
			}
		}
	}
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
			<Input
				label={'枝番'}
				name={'branch-number'}
				errorMsg={'数字４桁で入力して下さい'}
				inputSize={'input--sm'}
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
			<Input
				label="施設名"
				name="customer-name"
				placeholder={'株式会社○○'}
				errorMsg={'施設名を入力して下さい'}
				inputSize={'input--xl'}
				required={true}
				bind:value={initialState.customerName}
				bind:isValid={formIsValid.customerName}
			/>
		</div>

		<div class="form-row">
			<Input
				label="カナ"
				name="kana"
				placeholder={'カナ'}
				errorMsg={'カタカナで入力してください'}
				inputSize={'input--xl'}
				required={true}
				bind:value={initialState.kana}
				bind:isValid={formIsValid.kana}
			/>
		</div>

		<div class="form-row">
			<Input
				label="医療機関番号"
				name="facility-number"
				errorMsg={'正しい医療機関番号を入力して下さい'}
				inputSize="input--sm"
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
			<Input
				label="郵便番号"
				name="postal-code"
				placeholder={'0000000'}
				errorMsg={"郵便番号を入力して下さい（'〒'や'ー'なし）"}
				inputSize="input--sm"
				required={true}
				bind:value={initialState.postalCode}
				bind:isValid={formIsValid.postalCode}
			/>

			<button class="btn primary inline" on:click={handlePostalCodeSearchSubmit}>自動検索</button>
		</div>

		<div class="form-row">
			<SelectWithInput
				label={'都道府県'}
				name="prefecture"
				datas={prefectures}
				placeholder="○○県"
				errorMsg={'都道府県を一つ選んでください'}
				required={true}
				bind:value={initialState.prefecture}
				bind:isValid={formIsValid.prefecture}
			/>

			<Input
				label={'市区町村'}
				name="city"
				placeholder="○○市"
				errorMsg={'正しい街をご入力ください'}
				inputSize="input--md"
				required={true}
				bind:value={initialState.city}
				bind:isValid={formIsValid.city}
			/>
		</div>

		<div class="form-row">
			<Input
				label={'住所１'}
				name="address1"
				placeholder="丁目・番地"
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
				required={true}
				bind:value={initialState.address1}
				bind:isValid={formIsValid.address1}
			/>
		</div>

		<div class="form-row">
			<Input
				label={'住所２'}
				name="address2"
				placeholder="建物名・部屋番号"
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
				required={true}
				bind:value={initialState.address2}
				bind:isValid={formIsValid.address2}
			/>
		</div>

		<div class="form-row">
			<Input
				label="電話番号"
				name="phone-number"
				placeholder={'0000000000'}
				errorMsg={'正しい電話番号を入力して下さい（「ー」なし）'}
				inputSize="input--md"
				required={true}
				bind:value={initialState.phoneNumber}
				bind:isValid={formIsValid.phoneNumber}
			/>
			<Input
				name={'mobile-phone'}
				label={'携帯電話'}
				placeholder={'未入力'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				inputSize={'input--md'}
				bind:value={initialState.mobile}
				bind:isValid={formIsValid.mobile}
			/>

			<Input
				label="FAX番号"
				name="fax"
				placeholder={'0000000000'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				inputSize="input--md"
				required={true}
				bind:value={initialState.fax}
				bind:isValid={formIsValid.fax}
			/>
		</div>

		<div class="form-row">
			<Input
				name={'email'}
				label={'メール'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState.email}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--foundation">
		<legend class="legend">創立</legend>
		<div class="form-row">
			<div class="input-wrapper">
				<label class="label" for="foundation-date">設立年月日</label>
				<input
					class="input"
					type="date"
					id="foundation-date"
					name="foundation-date"
					bind:value={initialState.foundationDate}
				/>
			</div>

			<Input
				label="設立者"
				name="founder"
				placeholder={'山田　太郎'}
				errorMsg={'正しい名前を入力して下さい'}
				inputSize="input--lg"
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
					{#each initialState.departments as selectedDepartment, index}
						<div class="department-wrapper" id={'department-' + index}>
							<div class="input-wrapper">
								<input
									list="departments"
									bind:value={selectedDepartment.departmentName}
									on:input={e => handleSelectDepartment(e, index)}
								/>

								<datalist id="departments">
									{#each departmentsList as department}
										<option
											class="department-option"
											data-value={department.id}
											value={department.name}
										/>
									{/each}
								</datalist>
							</div>

							<NumberInput
								name={'bed-quantity'}
								label={'病床数'}
								bind:value={selectedDepartment.numberOfBeds}
							/>

							{#if initialState.departments.length > 1}
								<button
									type="button"
									class="btn secondary delete"
									on:click={() => deleteDepartment(index)}
								>
									<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
								</button>
							{/if}
						</div>
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
			<NumberInput
				name={'number-of-employees'}
				label={'従業員数'}
				errorMsg={'入力してください'}
				required={true}
				bind:value={initialState.numberOfEmployees}
				bind:isValid={formIsValid.numberOfEmployees}
			/>
		</div>

		<div class="form-row">
			<Input
				label="事業内容"
				name="business-content"
				placeholder={'未入力'}
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
				bind:value={initialState.business}
			/>
		</div>

		<div class="form-row">
			<Input
				label="ホームページ"
				name="homepage"
				placeholder={'www.homepage.com'}
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
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
				<Input
					label="口コミ"
					name="commnents"
					placeholder={'件数、内容など'}
					errorMsg={'200文字以内で入力してください'}
					inputSize="input--lg"
					bind:value={initialState.reviews}
				/>
			{/if}
		</div>

		<div class="form-row">
			<NumberInput
				name={'number-of-branches'}
				label={'関連施設拠点数'}
				errorMsg={'入力してください'}
				required={true}
				bind:value={initialState.numberOfFacilities}
				bind:isValid={formIsValid.numberOfFacilities}
			/>
		</div>

		<div class="form-row">
			<Input
				name={'miscellaneous'}
				label={'その他'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
				bind:value={initialState.miscellaneous}
			/>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">担当者</legend>
		<div class="form-row">
			<Input
				name={'person-in-charge'}
				label={'ご担当者名'}
				placeholder={'未入力'}
				inputSize={'input--md'}
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
			<Input
				name={'person-in-charge-memo'}
				label={'ご担当メモ'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
				bind:value={initialState.personInChargeMemo}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'approver'}
				label={'決裁者'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState.approver}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'prefered-contact-time'}
				label={'連絡の取りやすい時間'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
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

								<Input
									placeholder="メモ"
									name={'image-description'}
									inputSize={'input--lg'}
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
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}
	.hidden {
		display: none;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

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
		gap: 18px;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}

	.fieldset {
		margin-bottom: 2rem;

		.legend {
			display: none;
		}
	}

	.required-legend {
		float: right;
		font-size: 14px;
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		// width: 140px;
	}

	:global(.required-mark) {
		color: var(--error);
	}

	:global(.input-wrapper) {
		position: relative;
		display: flex;
		gap: 10px;
		align-items: flex-start;

		.input {
			&--sm {
				@include responsiveInputWidth((103));
				width: 103px;
			}
			&--md {
				@include responsiveInputWidth((152));
			}
			&--lg {
				@include responsiveInputWidth((359));
			}
			&--xl {
				@include responsiveInputWidth((534));
			}
		}
	}

	:global(.input-wrapper:first-child > .label) {
		width: 140px;
	}

	:global(.input-wrapper > .label) {
		width: fit-content;
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

	.input-wrapper {
		.select {
			height: 32px;
			width: calc(((106 - 10 - 2) / 1366) * 100vw);
			padding-left: 10px;
			font-size: 18px;
			color: var(--black);
			border: 1px solid var(--gray);
			border-radius: 8px;
			outline: none;

			&:focus {
				border-color: var(--primary-color);
			}
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

	.btn {
		margin: 0;

		&.delete {
			min-width: 0 !important;
			padding: 0;
			height: 32px;
			width: 32px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.bed-total {
		display: flex;
		align-items: center;
		height: 32px;
		align-self: flex-end;
	}

	.department-wrapper {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}

	// .input {
	// 	width: calc(((103 - 10 - 2) / 1366) * 100vw);
	// }

	.input-wrapper {
		width: fit-content;
		.input {
			max-height: 31px;
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

	.input-wrapper {
		.select {
			width: calc(((103 - 10 - 2) / 1366) * 100vw);
			height: 31px;
			font-size: 18px;
			color: var(--black);

			&:focus {
				border-color: var(--primary-color);
			}
		}

		.unit {
			height: 32px;
			display: flex;
			align-items: center;
		}
	}

	.error {
		.select {
			border-color: var(--error);
		}
	}
</style>
