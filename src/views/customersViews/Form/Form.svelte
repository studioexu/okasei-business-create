<script lang="ts">
	import { prefectures } from '@/routes/customers/data/data.js'
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import type { CustomerEntries, CustomerEntriesErrors } from '@/routes/customers/utils/types'
	import Seletector from './Selector.svelte'
	import { enhance } from '$app/forms'
	import DepartmentSection from './DepartmentSection.svelte'
	import { fly } from 'svelte/transition'

	export let formType: string
	export let verificationPageDisplayed: boolean
	export let initialState: CustomerEntries
	export let modalIsOpened: boolean
	export let noErrors: CustomerEntriesErrors

	const hojinKojin = [' ', '法人', '個人']

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

<!-- {#if !verificationPageDisplayed} -->
<form
	class="form {verificationPageDisplayed ? 'disappear' : ''}"
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
				/>
			</div>

			<Input
				inputClass={'txt--xl'}
				name="facilityName"
				label="施設名"
				autoSearch={true}
				labelClass={'label-width--md'}
				bind:value={initialState.facilityName}
				bind:isValid={noErrors.facilityName}
				required={true}
				placeholder={'株式会社○○'}
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
				/>

				<Select
					options={hojinKojin}
					label="個人／法人"
					bind:value={initialState.businessType}
					name={'businessType'}
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
				bind:value={initialState.postalCode}
				bind:isValid={noErrors.postalCode}
				required={true}
			/>

			<div class="container">
				<!-- <Input
					inputClass="txt--sm"
					name="prefecture"
					label={'都道府県'}
					bind:value={initialState.prefecture}
					bind:isValid={noErrors.prefecture}
					required={true}
				/> -->

				<Seletector
					labelClass={'label-width--lg'}
					dataType="prefecture"
					datas={prefectures}
					label={'都道府県'}
					bind:value={initialState.prefecture}
					bind:isValid={noErrors.prefecture}
					required={true}
					placeholder="○○県"
				/>

				<Input
					inputClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={initialState.city}
					bind:isValid={noErrors.city}
					required={true}
					placeholder="○○市"
				/>
			</div>

			<div class="address">
				<Input
					labelClass={'label-width--lg'}
					inputClass="txt--lg"
					name="address1"
					label={'住所１'}
					placeholder="丁目・番地"
					bind:value={initialState.address1}
					bind:isValid={noErrors.address1}
					required={true}
				/>
				<Input
					labelClass={'label-width--lg'}
					inputClass="txt--lg"
					name="address2"
					label={'住所２'}
					placeholder="建物名・部屋番号"
					bind:value={initialState.address2}
					bind:isValid={noErrors.address2}
					required={true}
				/>
			</div>

			<div class="container">
				<Input
					inputClass="number--lg"
					name="phoneNumber"
					label="電話番号"
					labelClass={'label-width--lg'}
					bind:value={initialState.phoneNumber}
					bind:isValid={noErrors.phoneNumber}
					required={true}
					placeholder={'0000000000'}
				/>

				<Input
					inputClass="number--lg"
					name="fax"
					label="FAX番号"
					bind:value={initialState.fax}
					bind:isValid={noErrors.fax}
				/>
			</div>
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
				<Input
					inputClass="txt--lg"
					name="founder"
					label="設立者"
					bind:value={initialState.founder}
					bind:isValid={noErrors.founder}
				/>
			</div>
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
			/>

			<Input
				labelClass={'label-width--lg'}
				name="homepage"
				inputClass="txt--lg"
				label="ホームページ"
				bind:value={initialState.homepage}
				bind:isValid={noErrors.homepage}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="facility-number"
				inputClass="number--lg"
				unit="店"
				label="関連施設拠点数"
				bind:value={initialState.numberOfFacilities}
				bind:isValid={noErrors.numberOfFacilities}
			/>
		</fieldset>
		<!-- .fieldset--info2 -->

		<span class="required-legend">* 必須</span>
	</div>
</form>

<!-- {/if} -->

<style lang="scss">
	.hidden {
		display: none;
		// animation: out 2000ms forwards;
		// position: absolute;
		// top: 0;
		// left: 0;
		// width: 100%;
		// height: 100%;
		// opacity: 0;
		// // transform: translateX(-1000px);
		// animation: out 2000ms forwards;
	}

	.disappear {
		display: none;
		animation: out 2000ms forwards;
	}

	.appear {
		display: block;
		animation: in 2000ms forwards;
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

		&--vertical {
			flex-direction: column;
		}
	}

	.fieldset {
		margin-bottom: 2rem;
		&--bed {
			.container {
				column-gap: 10px;
				row-gap: 11px;
				.label {
					min-width: 130px;
				}
			}
		}

		&--foundation {
			.container:last-child {
				margin-left: auto;
			}
		}
	}

	.total {
		position: relative;
		display: flex;
		gap: 2.25rem;
		align-items: center;
		align-self: flex-end;
		.title {
			margin: 0;
		}

		&__display {
			margin: 0;
		}
	}

	// .hidden {
	// 	display: none;
	// }

	.btn {
		background-color: #2fa8e1;
		color: #fff;
		margin: 0;

		&--add {
			padding: 0 11px;
			margin-top: 14px;
			height: 32px;
			border-radius: 3px;
			margin-left: 140px;
		}
	}

	.required-legend {
		float: right;
	}

	@keyframes out {
		0% {
			opacity: 1;
			transform: translateX(0);
		}

		80% {
			opacity: 0;
			transform: translateX(1000px);
		}

		100% {
			transform: translateX(1000px);
			display: none;
		}
	}

	@keyframes in {
		0% {
			opacity: 0;
			transform: translateX(400px);
		}

		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
