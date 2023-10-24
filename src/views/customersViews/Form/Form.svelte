<script lang="ts">
	import { prefectures } from '@/routes/customers/data/data.js'
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/routes/customers/utils/types'
	import Seletector from './Selector.svelte'
	import { enhance } from '$app/forms'
	import DepartmentSection from './DepartmentSection.svelte'

	export let formType: string
	export let verificationPageDisplayed: boolean
	export let initialState: CustomerEntries
	export let modalIsOpened: boolean
	export let noErrors: CustomerEntriesErrors

	interface AddressInfo {
		prefecture: string
		city: string
		address1: string
	}

	let address: AddressInfo = {
		prefecture: '',
		city: '',
		address1: ''
	}

	const assignAddressInfo = (address: AddressInfo) => {
		if (address.prefecture.length !== 0) {
			initialState.prefecture = address.prefecture
		}
		if (address.city.length !== 0) {
			initialState.city = address.city
		}
		if (address.address1.length !== 0) {
			initialState.address1 = address.address1
		}
	}

	$: assignAddressInfo(address)

	const hojinKojin = ['', '法人', '個人']

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
		if (verificationPageDisplayed) {
			modalIsOpened = true
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
	<div class="form__form">
		<fieldset class="fieldset fieldset--info1">
			<legend class="hidden">情報１</legend>
			<div class="container">
				<Input
					inputClass={'number--md'}
					name={'customer-number'}
					label={'顧客番号'}
					labelClass={'label-width--md'}
					bind:value={initialState.id}
				/>
				<Input
					inputClass={'number--sm'}
					name={'branch-number'}
					label={'枝番'}
					bind:value={initialState.branchNumber}
					bind:isValid={noErrors.branchNumber}
					required={true}
					errorMsg={'数字４桁で入力して下さい'}
				/>
			</div>

			<Input
				inputClass={'txt--xl'}
				name="customerName"
				label="施設名"
				autoSearch={true}
				labelClass={'label-width--md'}
				bind:value={initialState.customerName}
				bind:isValid={noErrors.customerName}
				required={true}
				placeholder={'株式会社○○'}
				errorMsg={'施設名を入力して下さい'}
			/>
			<Input
				inputClass={'txt--xl'}
				name="kana"
				label="カナ"
				labelClass={'label-width--md'}
				bind:value={initialState.kana}
				bind:isValid={noErrors.kana}
				required={true}
				placeholder={'カナ'}
				errorMsg={'カタカナで入力してください'}
			/>

			<div class="container">
				<Input
					inputClass="number--md"
					name="facilityNumber"
					label="医療機関番号"
					labelClass={'label-width--lg'}
					required={true}
					bind:value={initialState.facilityNumber}
					bind:isValid={noErrors.facilityNumber}
					errorMsg={'正しい医療機関番号を入力して下さい'}
				/>

				<Select
					options={hojinKojin}
					label="個人／法人"
					bind:value={initialState.businessType}
					name={'businessType'}
					errorMsg={'一つを選んで下さい'}
					required={true}
				/>
			</div>
		</fieldset>
		<!-- .fieldset--info1 -->

		<fieldset class="fieldset fieldset--address">
			<legend class="hidden">住所</legend>

			<Input
				inputClass="txt--sm"
				name="postalCode"
				label="郵便番号"
				autoSearch={true}
				labelClass={'label-width--lg'}
				placeholder={'0000000'}
				bind:value={initialState.postalCode}
				bind:isValid={noErrors.postalCode}
				bind:address
				required={true}
				errorMsg={"正しい郵便番号を入力して下さい（'〒'や'ー'なし）"}
			/>

			<div class="container">
				<Seletector
					labelClass={'label-width--lg'}
					dataType="prefecture"
					datas={prefectures}
					label={'都道府県'}
					placeholder="○○県"
					bind:value={initialState.prefecture}
					bind:isValid={noErrors.prefecture}
					required={true}
					errorMsg={'都道府県を一つ選んでください'}
				/>
				<!-- Input -->

				<Input
					inputClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={initialState.city}
					bind:isValid={noErrors.city}
					placeholder="○○市"
					errorMsg={'正しい街をご入力ください'}
				/>
				<!-- Input -->
			</div>
			<!-- .container -->

			<div class="address">
				<Input
					labelClass={'label-width--lg'}
					inputClass="txt--lg"
					name="address1"
					label={'住所１'}
					placeholder="丁目・番地"
					bind:value={initialState.address1}
					bind:isValid={noErrors.address1}
				/>
				<!-- Input -->

				<Input
					labelClass={'label-width--lg'}
					inputClass="txt--lg"
					name="address2"
					label={'住所２'}
					placeholder="建物名・部屋番号"
					bind:value={initialState.address2}
					bind:isValid={noErrors.address2}
				/>
				<!-- Input -->
			</div>
			<!-- .address -->

			<div class="container">
				<Input
					inputClass="number--lg"
					name="phoneNumber"
					label="電話番号"
					labelClass={'label-width--lg'}
					placeholder={'0000000000'}
					bind:value={initialState.phoneNumber}
					bind:isValid={noErrors.phoneNumber}
					required={true}
					errorMsg={'正しい電話番号を入力して下さい（「ー」なし）'}
				/>
				<!-- Input -->

				<Input
					inputClass="number--lg"
					name="fax"
					label="FAX番号"
					placeholder={'0000000000'}
					bind:value={initialState.fax}
					bind:isValid={noErrors.fax}
					errorMsg={'正しいFAX番号を入力して下さい（「ー」なし）'}
				/>
				<!-- Input -->
			</div>
			<!-- .containter -->
		</fieldset>
		<!-- .fieldset--address -->

		<fieldset class="fieldset fieldset--foundation">
			<legend class="hidden">創立</legend>
			<div class="container">
				<DateSelector
					bind:year={initialState.year}
					bind:month={initialState.month}
					bind:monthIsValid={noErrors.month}
					bind:yearIsValid={noErrors.year}
				/>
				<!-- DateSelector -->
				<Input
					inputClass="txt--lg"
					name="founder"
					label="設立者"
					placeholder={'山田　太郎'}
					bind:value={initialState.founder}
					bind:isValid={noErrors.founder}
					errorMsg={'正しい名前を入力して下さい'}
				/>
				<!-- Input -->
			</div>
			<!-- .container -->
		</fieldset>
		<!-- .fieldset--foundation -->

		<fieldset class="fieldset fieldset--bed">
			<legend class="hidden">病床設定</legend>
			<DepartmentSection bind:bedding={initialState.bedding} />
		</fieldset>
		<!-- .fieldset--bed -->

		<fieldset class="fieldset fieldset--info2">
			<legend class="hidden">情報２</legend>
			<Input
				unit="名"
				inputClass="number--lg"
				label="従業員数"
				labelClass={'label-width--lg'}
				name="employee-quantity"
				bind:value={initialState.numberOfEmployees}
				bind:isValid={noErrors.numberOfEmployees}
				errorMsg={'数字で入力して下さい'}
			/>
			<!-- Input -->

			<Input
				labelClass={'label-width--lg'}
				name="homepage"
				inputClass="txt--lg"
				label="ホームページ"
				placeholder={'www.homepage.com'}
				bind:value={initialState.homepage}
				bind:isValid={noErrors.homepage}
			/>
			<!-- Input -->

			<Input
				labelClass={'label-width--lg'}
				name="facility-number"
				inputClass="number--lg"
				unit="店"
				label="関連施設拠点数"
				bind:value={initialState.numberOfFacilities}
				bind:isValid={noErrors.numberOfFacilities}
				errorMsg={'数字で入力して下さい'}
			/>
			<!-- Input -->
		</fieldset>
		<!-- .fieldset--info2 -->

		<span class="required-legend">* 必須</span>
	</div>
</form>

<style lang="scss">
	.hidden {
		display: none;
	}

	.form {
		font-family: 'Noto Sans JP';
		&__form {
			padding: 0 37px;
			padding-top: 28px;
			padding-bottom: 48px;
			background-color: #fff;
			width: calc(((1240 - 74) / 1366) * 100vw);
			width: calc(((1240 - 74) / 1366) * 100vw);
			width: auto;
			box-shadow: 0px 8px 8px rgb(200, 200, 200);
		}
	}

	.container {
		display: flex;
		column-gap: 2rem;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;
		row-gap: 1rem;
	}

	.fieldset {
		margin-bottom: 2rem;

		&--foundation {
			.container:last-child {
				margin-left: auto;
			}
		}
	}

	.required-legend {
		float: right;
	}
</style>
