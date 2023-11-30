<script lang="ts">
	import type { Picture } from '@/libs/customerTypes'
	import type {
		CustomerEntries,
		CustomerEntriesErrors,
		AddressAutoInfo
	} from '@/libs/customerTypes'

	import { enhance } from '$app/forms'
	import { prefectures, months, years } from '@/data/data'
	import Icon from '@/components/Icon.svelte'
	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import SelectWithInput from '@/components/SelectWithInput.svelte'
	import UploadModal from '@/views/modals/UploadModal.svelte'
	import ResultModal from '../modals/ResultModal.svelte'
	import type { Department } from '@/models/CustomerAPI'
	import { loadDepartments } from '@/libs/actions'
	import { currentApi } from '@/data/api'

	export let formType: string
	export let confirmationPageIsShown: boolean
	export let initialState: CustomerEntries
	export let formIsValid: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false
	export let departmentsList: { id: number; cd1: string; cd2: string; name: string }[]

	let uploadModalIsShown = false

	$: console.log(initialState)

	// ADDRESS AUTO FILL

	let address: AddressAutoInfo = {
		prefecture: '',
		city: '',
		address1: ''
	}

	/**
	 * Fetch the address corresponding to the postal code.
	 * @param e
	 */
	const handlePostalCodeSearchSubmit = async (e: any) => {
		e.preventDefault()
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
	}

	const assignAddressInfo = (address: AddressAutoInfo) => {
		Object.keys(address).map(key => {
			if (address[key as keyof AddressAutoInfo].length !== 0) {
				initialState[key as keyof AddressAutoInfo] = address[key as keyof AddressAutoInfo]
			}
		})

		initialState.address2 = ''
	}

	$: assignAddressInfo(address)

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
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
	 * Delete the corresponding image in the image array
	 * @param e: event to get the id corresponding to the image
	 */
	const handleDeleteImage = (e: any) => {
		const imageToDelete = e.target.closest('.card').id

		initialState.pictures = initialState.pictures.filter(
			(image: Picture) => image.file.name !== imageToDelete
		)
	}

	// MANAGE DEPARTMENTS

	interface DepartmentInput {
		index: number
		department: {
			id: number
			cd1: string
			cd2: string
			name: string
		}
		numberOfBeds: number
	}

	let departments: DepartmentInput[] = []

	// fill the departments array with the data if there is any
	if (initialState.departments.length === 0) {
		departments = [
			{
				department: {
					id: 0,
					cd1: '000',
					cd2: '00',
					name: '内科'
				},
				numberOfBeds: 0,
				index: 0
			}
		]
	} else {
		initialState.departments.map((department, index) => {
			departments = [
				...departments,
				{
					department: {
						id: department.department.id,
						cd1: department.department.cd1,
						cd2: department.department.cd2,
						name: department.department.name
					},
					numberOfBeds: department.numberOfBeds,
					index: index
				}
			]
			index++
		})
	}

	/**
	 * Update the departments array when add a department
	 * @param e
	 */
	const handleAddDepartment = (e: any): void => {
		e.preventDefault()

		departments = [
			...departments,
			{
				department: {
					id: 1,
					cd1: '010',
					cd2: '010',
					name: '内科'
				},
				numberOfBeds: 0,
				index: departments[departments.length - 1].index + 1
			}
		]
	}

	/**
	 * Delete one department form the departments array
	 * @param e: event to get the right id
	 */
	const deleteDepartment = (index: number) => {
		departments = departments.filter(department => department.index !== index)
	}

	const checkBedQuantity = (bedQuantity: number): number => {
		if (isNaN(bedQuantity) || bedQuantity < 0) {
			bedQuantity = 0
		}

		return bedQuantity
	}

	/**
	 * We go through the array of bed input and calculate the number total of beds.
	 * @param beds: array of bedInput
	 */
	const caculateTotalOfBeds = (departments: Department[]): number => {
		let sum: number = 0
		departments.map((department: Department) => {
			const numberOfBed = isNaN(department.numberOfBeds) ? 0 : department.numberOfBeds
			sum += numberOfBed
		})

		return sum
	}
	$: bedQuantityTotal = caculateTotalOfBeds(departments)
	$: initialState.departments = departments.map(department => {
		return {
			department: {
				id: department.department.id,
				cd1: department.department.cd1,
				cd2: department.department.cd2,
				name: department.department.name
			},
			numberOfBeds: department.numberOfBeds
		}
	})

	const handleSelectDepartment = (e: any) => {
		const departmentId = parseInt(e.target.value)
		const departmentIndex = parseInt(e.target.closest('.department-wrapper').id.split('-')[1])

		const seletedDepartment = departmentsList.find(department => department.id === departmentId)

		if (seletedDepartment) {
			departments[departmentIndex].department.id = seletedDepartment.id
			departments[departmentIndex].department.cd1 = seletedDepartment.cd1
			departments[departmentIndex].department.cd2 = seletedDepartment.cd2
			departments[departmentIndex].department.name = seletedDepartment.name
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
				options={['法人', '個人']}
				bind:value={initialState.businessType}
			/>
		</div>
	</fieldset>
	<!-- .fieldset--info1 -->

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
			<!-- Input -->

			<Input
				label={'市区町村'}
				name="city"
				placeholder="○○市"
				errorMsg={'正しい街をご入力ください'}
				inputSize="input--md"
				bind:value={initialState.city}
				bind:isValid={formIsValid.city}
			/>
			<!-- Input -->
		</div>
		<!-- .form-row -->

		<div class="form-row">
			<Input
				label={'住所１'}
				name="address1"
				placeholder="丁目・番地"
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
				bind:value={initialState.address1}
				bind:isValid={formIsValid.address1}
			/>
			<!-- Input -->
		</div>

		<div class="form-row">
			<Input
				label={'住所２'}
				name="address2"
				placeholder="建物名・部屋番号"
				errorMsg={'200文字以内で入力してください'}
				inputSize="input--lg"
				bind:value={initialState.address2}
				bind:isValid={formIsValid.address2}
			/>
			<!-- Input -->
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
			<!-- Input -->
			<Input
				name={'mobile-phone'}
				label={'携帯電話'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState.mobile}
			/>

			<Input
				label="FAX番号"
				name="fax"
				placeholder={'0000000000'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				inputSize="input--md"
				bind:value={initialState.fax}
				bind:isValid={formIsValid.fax}
			/>
			<!-- Input -->
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
		<!-- .containter -->
	</fieldset>
	<!-- .fieldset--address -->

	<fieldset class="fieldset fieldset--foundation">
		<legend class="legend">創立</legend>
		<div class="form-row">
			<!-- <SelectWithInput
				label={'設立年月日'}
				name={'year'}
				datas={years}
				unit="年"
				bind:value={initialState.year}
				bind:isValid={formIsValid.year}
			/>

			<Select
				options={months}
				name={'months'}
				unit="月"
				bind:value={initialState.month}
				bind:isValid={formIsValid.month}
			/> -->

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

			<!-- DateSelector -->
			<Input
				label="設立者"
				name="founder"
				placeholder={'山田　太郎'}
				errorMsg={'正しい名前を入力して下さい'}
				inputSize="input--lg"
				bind:value={initialState.founder}
				bind:isValid={formIsValid.founder}
			/>

			<!-- Input -->
		</div>
		<!-- .form-row -->
	</fieldset>
	<!-- .fieldset--foundation -->

	<fieldset class="fieldset fieldset--bed">
		<legend class="legend">病床設定</legend>
		<!-- <DepartmentSection bind:departments={initialState.departments} /> -->

		<div class="form-row bed">
			<h3 class="label">診療科目</h3>
			<div class="container">
				{#each departments as department, index}
					<div class="department-wrapper" id={'department-' + department.index.toString()}>
						<div class="input-wrapper">
							<input
								list="departments"
								bind:value={department.department.name}
								on:input={handleSelectDepartment}
							/>

							<datalist id="departments">
								{#each departmentsList as department}
									<option value={department.id}>{department.name}</option>
								{/each}
							</datalist>
						</div>

						<div class="input-wrapper">
							<label for="bed-quantity">病床数</label>
							<input type="number" min="0" bind:value={department.numberOfBeds} />
						</div>

						{#if departments.length > 1}
							<button
								type="button"
								class="btn secondary delete"
								on:click={() => deleteDepartment(department.index)}
							>
								<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
							</button>
						{/if}
					</div>
				{/each}
			</div>
			<div class="bed-total">
				<h3 class="label">'病床数合計'</h3>
				<span class="content">{bedQuantityTotal}</span>
			</div>
		</div>

		<div class="form-row">
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="label" />
			<button class="btn primary" on:click={handleAddDepartment}>+新規追加</button>
		</div>
	</fieldset>

	<fieldset class="fieldset fieldset--info2">
		<legend class="legend">情報２</legend>

		<div class="form-row">
			<Input
				label="従業員数"
				name="number-of-employees"
				unit="名"
				errorMsg={'数字で入力して下さい'}
				inputSize="input--sm"
				bind:value={initialState.numberOfEmployees}
				bind:isValid={formIsValid.numberOfEmployees}
			/>
			<!-- Input -->
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
			<!-- Input -->
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
			<!-- Input -->
		</div>

		<div class="form-row">
			<div class="input-wrapper">
				<label class="label" for="google-review"> Google評価 </label>

				<select class="select" bind:value={initialState.googleReview} id="google-review">
					<option value={false}>無し</option>
					<option value={true}>★有り</option>
				</select>
			</div>

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
			<Input
				label="関連施設拠点数"
				name="number-of-facilities"
				unit="軒"
				errorMsg={'数字で入力して下さい'}
				inputSize="input--sm"
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

	<!-- <fieldset class="fieldset">
		<legend class="legend">画像</legend>
		<div class="form-row">
			<div class="input-wrapper">
				<h3 class="label">参考書類など画像データ</h3>

				<div class="container">
					{#if initialState.pictures.length === 0}
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
								<button type="button" class="btn primary inline" on:click={handleDeleteImage}>
									削除
								</button>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
		<div class="form-row">
			<span class="label" />
			<button type="button" class="btn add primary" on:click={() => (uploadModalIsShown = true)}>
				＋画像追加
			</button>
		</div>
	</fieldset> -->
</form>

<style lang="scss">
	.legend {
		display: none;
	}

	.hidden {
		display: none;
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
		gap: 12px;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}

	.required-mark {
		color: var(--error);
	}

	.fieldset {
		margin-bottom: 2rem;
	}

	.required-legend {
		float: right;
		font-size: 14px;
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: flex-start;

		&:first-child {
			.label {
				width: 130px;
			}
		}

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

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
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

	.container {
		display: flex;
		flex-direction: column;
		gap: 18px;
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

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 10px;

		&:first-child {
			.label {
				width: 130px;
			}
		}

		.input {
			max-height: 31px;
			&::placeholder {
				color: rgb(206, 205, 205);
			}

			&:focus {
				border-color: var(--primary-color);
			}

			&--sm {
				@include responsiveInputWidth((103));
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

		.font-error {
			position: absolute;
			right: 0;
			bottom: -14px;
			font-size: 10px;
			opacity: 0;
		}
	}
</style>
