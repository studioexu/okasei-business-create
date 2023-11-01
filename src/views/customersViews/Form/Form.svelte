<script lang="ts">
	import { enhance } from '$app/forms'
	import { prefectures } from '@/routes/customers/data/prefectures.js'

	import type {
		CustomerEntries,
		CustomerEntriesErrors,
		AddressAutoInfo
	} from '@/routes/customers/utils/types'

	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import Selector from './Selector.svelte'
	import DepartmentSection from './DepartmentSection.svelte'
	import Button from '@/components/customers/Button.svelte'

	export let formType: string
	export let verificationPageDisplayed: boolean
	export let initialState: CustomerEntries
	export let noErrors: CustomerEntriesErrors
	export let isShown: boolean = false
	export let isSucceeded: boolean = false

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
		if (noErrors.postalCode) {
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

	const hojinKojin = ['法人', '個人']

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
		if (verificationPageDisplayed) {
			isShown = true
			isSucceeded = true
		}
	}
</script>

<form
	class="form {verificationPageDisplayed ? 'hidden' : ''}"
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
		<legend class="hidden">情報１</legend>
		<div class="form-row">
			<Input
				label={'枝番'}
				name={'branch-number'}
				errorMsg={'数字４桁で入力して下さい'}
				inputSize={'input--sm'}
				required={true}
				bind:value={initialState.branchNumber}
				bind:isValid={noErrors.branchNumber}
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
				bind:isValid={noErrors.customerName}
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
				bind:isValid={noErrors.kana}
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
				bind:isValid={noErrors.facilityNumber}
			/>

			<Select
				label="個人／法人"
				name={'business-type'}
				errorMsg={'一つを選んで下さい'}
				required={true}
				options={hojinKojin}
				bind:value={initialState.businessType}
			/>
		</div>
	</fieldset>
	<!-- .fieldset--info1 -->

	<fieldset class="fieldset fieldset--address">
		<legend class="hidden">住所</legend>

		<div class="form-row">
			<Input
				label="郵便番号"
				name="postal-code"
				placeholder={'0000000'}
				errorMsg={"正しい郵便番号を入力して下さい（'〒'や'ー'なし）"}
				inputSize="input--sm"
				required={true}
				bind:value={initialState.postalCode}
				bind:isValid={noErrors.postalCode}
			/>

			<Button buttonClass={'btn--sm btn--filled'} handleClick={handlePostalCodeSearchSubmit}>
				自動検索
			</Button>
		</div>

		<div class="form-row">
			<Selector
				label={'都道府県'}
				dataType="prefecture"
				datas={prefectures}
				placeholder="○○県"
				errorMsg={'都道府県を一つ選んでください'}
				required={true}
				bind:value={initialState.prefecture}
				bind:isValid={noErrors.prefecture}
			/>
			<!-- Input -->

			<Input
				label={'市区町村'}
				name="city"
				placeholder="○○市"
				errorMsg={'正しい街をご入力ください'}
				inputSize="input--md"
				bind:value={initialState.city}
				bind:isValid={noErrors.city}
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
				bind:isValid={noErrors.address1}
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
				bind:isValid={noErrors.address2}
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
				bind:isValid={noErrors.phoneNumber}
			/>
			<!-- Input -->

			<Input
				label="FAX番号"
				name="fax"
				placeholder={'0000000000'}
				errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				inputSize="input--md"
				bind:value={initialState.fax}
				bind:isValid={noErrors.fax}
			/>
			<!-- Input -->
		</div>
		<!-- .containter -->
	</fieldset>
	<!-- .fieldset--address -->

	<fieldset class="fieldset fieldset--foundation">
		<legend class="hidden">創立</legend>
		<div class="form-row">
			<DateSelector
				bind:year={initialState.year}
				bind:month={initialState.month}
				bind:monthIsValid={noErrors.month}
				bind:yearIsValid={noErrors.year}
			/>
			<!-- DateSelector -->
			<Input
				label="設立者"
				name="founder"
				placeholder={'山田　太郎'}
				errorMsg={'正しい名前を入力して下さい'}
				inputSize="input--lg"
				bind:value={initialState.founder}
				bind:isValid={noErrors.founder}
			/>
			<!-- Input -->
		</div>
		<!-- .form-row -->
	</fieldset>
	<!-- .fieldset--foundation -->

	<fieldset class="fieldset fieldset--bed">
		<legend class="hidden">病床設定</legend>
		<DepartmentSection bind:bedding={initialState.bedding} />
	</fieldset>
	<!-- .fieldset--bed -->

	<fieldset class="fieldset fieldset--info2">
		<legend class="hidden">情報２</legend>

		<div class="form-row">
			<Input
				label="従業員数"
				name="number-of-employees"
				unit="名"
				errorMsg={'数字で入力して下さい'}
				inputSize="input--md"
				bind:value={initialState.numberOfEmployees}
				bind:isValid={noErrors.numberOfEmployees}
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
				bind:isValid={noErrors.homepage}
			/>
			<!-- Input -->
		</div>

		<div class="form-row">
			<Input
				label="関連施設拠点数"
				name="number-of-facilities"
				unit="店"
				errorMsg={'数字で入力して下さい'}
				inputSize="number--lg"
				bind:value={initialState.numberOfFacilities}
				bind:isValid={noErrors.numberOfFacilities}
			/>
			<!-- Input -->
		</div>
	</fieldset>
	<!-- .fieldset--info2 -->
</form>

<style lang="scss">
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
</style>
