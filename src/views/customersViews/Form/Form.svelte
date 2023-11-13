<script lang="ts">
	import type { Picture } from '@/utils/customers/types'
	import { enhance } from '$app/forms'
	import { prefectures, months, years } from '@/data/data'

	import UploadModal from '@/views/modals/UploadModal.svelte'

	import type {
		CustomerEntries,
		CustomerEntriesErrors,
		AddressAutoInfo
	} from '@/utils/customers/types'

	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import SelectInput from './SelectInput.svelte'
	import DepartmentSection from './DepartmentSection.svelte'
	import Button from '@/components/Button.svelte'

	export let formType: string
	export let confirmationPageIsShown: boolean
	export let initialState: CustomerEntries
	export let formIsValid: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false

	let address: AddressAutoInfo = {
		prefecture: '',
		city: '',
		address1: ''
	}

	let businessContent = ''
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
		if (address.prefecture.length !== 0) {
			initialState.prefecture = address.prefecture
		}
		if (address.city.length !== 0) {
			initialState.city = address.city
		}
		if (address.address1.length !== 0) {
			initialState.address1 = address.address1
		}

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

	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onClick = (event: { detail: { key: string; fileToUpload: File } }) => {
		switch (event.detail.key) {
			case 'cancel':
				isShown = false
				break

			case 'upload':
				let newArray = initialState.pictures
				newArray.push({ file: event.detail.fileToUpload, memo: '' })
				initialState.pictures = newArray
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

	const handleDeleteImage = (e: any) => {
		const imageToDelete = e.target.closest('.image-wrapper').id

		initialState.pictures = initialState.pictures.filter(
			(image: Picture) => image.file.name !== imageToDelete
		)
	}
</script>

{#if isShown}
	<UploadModal {phase} on:click={onClick} />
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
				errorMsg={"正しい郵便番号を入力して下さい（'〒'や'ー'なし）"}
				inputSize="input--sm"
				required={true}
				bind:value={initialState.postalCode}
				bind:isValid={formIsValid.postalCode}
			/>

			<Button buttonClass={'btn--sm btn--filled'} handleClick={handlePostalCodeSearchSubmit}>
				自動検索
			</Button>
		</div>

		<div class="form-row">
			<SelectInput
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
			<SelectInput
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
			/>
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
		<DepartmentSection bind:departments={initialState.departments} />
	</fieldset>
	<!-- .fieldset--bed -->

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
				bind:value={businessContent}
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
			<!-- Input -->
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

		<!-- <div class="form-row bed">
			<h3 class="label">診療科目</h3>
			<div class="column">
				{#each initialState1.departments as department}
					<div class="department-wrapper">
						<Select
							options={['内科', '外科', '診療内科']}
							name={'departments'}
							bind:value={department.department}
						/>
						<Input
							name={'bed-quatity'}
							label={'病床数'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
							bind:value={department.bedQuantity}
						/>
					</div>
				{/each}
			</div>
			<div class="bed-total">
				<h3 class="label">'病床数合計'</h3>
				<span class="content">{total}</span>
			</div> -->

		<!-- </div> -->
		<!-- <div class="form-row">
			<h3 class="label" />
			<button class="btn primary" on:click={handleAddDepartment}>+新規追加</button>
		</div> -->
	</fieldset>
	<!-- .fieldset--info2 -->

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
			<h3 class="label">参考書類など 画像データ</h3>
			<div class="container">
				{#if initialState.pictures.length === 0}
					<div class="image-wrapper">
						<button class="image-empty" on:click={() => (isShown = true)}>
							<span>+</span>
						</button>
						<p class="image-description">画像がアップロードされていません。</p>
					</div>
				{:else}
					{#each initialState.pictures as image, index}
						<div class="image-wrapper" id={image.file.name}>
							<img class="image" src={URL.createObjectURL(image.file)} alt="" />
							<Input
								placeholder="メモ"
								name={'image-description'}
								inputSize={'input--lg'}
								bind:value={image.memo}
							/>
							<button class="btn primary delete" on:click={handleDeleteImage}>削除</button>
						</div>
					{/each}
				{/if}
				<button class="btn add primary" on:click={() => (isShown = true)}>＋画像追加</button>
			</div>
		</div>
	</fieldset>
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
		column-gap: 2rem;
		flex-wrap: wrap;
		row-gap: 1rem;
	}

	.fieldset {
		margin-bottom: 2rem;

		&--foundation {
			.form-row:last-child {
				margin-left: auto;
			}
		}
	}

	.required-legend {
		float: right;
		font-size: 14px;
		.required-mark {
			color: var(--error);
		}
	}

	.input-wrapper {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 20px;

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

		.unit {
			height: 32px;
			display: flex;
			align-items: center;
		}

		.error-msg {
			position: absolute;
			right: 0;
			bottom: -14px;
			color: var(--error);
			font-size: 10px;
			font-weight: 600;
			min-width: 250px;
			text-align: right;
			opacity: 0;
		}
	}

	.error {
		.select {
			transition: border 300ms;
			border: 1.5px solid var(--error);
			animation: buzz 100ms;
			animation-iteration-count: 3;
		}

		.error-msg {
			opacity: 1;
			transition: all 300ms;
		}
	}

	.required-mark {
		color: var(--error);
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

	.image-description {
		height: 32px;
		width: 100%;
	}

	.bed-total {
		display: flex;
		align-items: center;
		height: 32px;
		align-self: flex-end;
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.image {
		height: 124px;
		width: 200px;
		object-fit: contain;
	}

	.image-wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 18px;
		background-color: #f4f4f4;
		padding: 10px 21px;
		border-radius: 8px;
		margin-bottom: 12px;
	}

	.btn {
		margin: 0;

		&.delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			height: 32px;
			width: 70px;
			min-width: 0;
			margin-left: auto;
			// align-self: flex-end;
			margin-bottom: 20px;
		}
	}

	.container {
		display: block;
		width: fit-content;
	}
</style>
