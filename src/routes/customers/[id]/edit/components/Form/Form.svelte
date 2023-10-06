<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import BedConfiguration from './BedConfiguration.svelte'
	import { parseBeforeUpdate } from '@/routes/customers/utils/parsers'
	import type { CompanyEntries, CompanyInfo, Error } from '../../../../utils/types'
	import { inputIsValid } from '../../../../utils/validations'
	export let company: CompanyInfo
	import { update } from '../../../../utils/actions'

	interface BedInput {
		index: number
		department: string
		quantity: string
	}

	export let verificationPageDisplayed: boolean
	export let initialState: CompanyEntries

	let totalOfBed: number = 0

	const caculateTotalOfBed = (beds: BedInput[]): number => {
		let sum: number = 0
		beds.map((bed: BedInput) => {
			sum += parseInt(bed.quantity)
		})

		return sum
	}

	const handleSubmit = (e: any) => {
		if (verificationPageDisplayed) {
			const registration = {
				status: company.registration.status,
				date: company.registration.registrationDate,
				time: company.registration.registrationTime
			}
			const updatedCompany = parseBeforeUpdate(initialState, registration)

			if (typeof company.id === 'string') {
				update(updatedCompany, 'http://localhost:3000/customers/', company.id)
			}
		}

		if (!verificationPageDisplayed) {
			e.preventDefault()

			let formIsValid = true
			formIsValid = checkIfFormIsValid(initialState)

			if (!formIsValid) {
				return
			}

			verificationPageDisplayed = true
		}
	}

	const hojinKojin = [' ', '法人', '個人']

	let bedInputArray: BedInput[] = []

	initialState.bedding.map((bed, index) => {
		bedInputArray.push({ index: index, department: bed.department, quantity: bed.quantity })
	})

	$: totalOfBed = caculateTotalOfBed(bedInputArray)

	let noErrors: Error = {
		branchNumber: true,
		facilityName: true,
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
		year: true,
		month: true,
		founder: true,
		bedding: true,
		numberOfEmployees: true,
		homepage: true,
		numberOfFacilities: true
	}

	const handleAddBed = () => {
		bedInputArray = [
			...bedInputArray,
			{ index: bedInputArray[bedInputArray.length - 1].index + 1, department: '', quantity: '' }
		]
	}
	$: initialState.bedding = bedInputArray

	const checkIfFormIsValid = (formEntries: Object): boolean => {
		let errorArray: boolean[] = []
		let isValid = true
		const companyKeys = Object.keys(formEntries)
		const companyValues = Object.values(formEntries)

		for (let i = 0; i < companyKeys.length; i++) {
			const name: string = companyKeys[i]
			const input: string = companyValues[i]

			noErrors[name as keyof Error] = inputIsValid(name, input)
			errorArray.push(!inputIsValid(name, input))
		}

		errorArray.forEach(error => {
			if (error) {
				isValid = false
			}
		})

		return isValid
	}
</script>

<form
	class="form {verificationPageDisplayed ? 'hidden' : ''}"
	method="PUT"
	action="/customers/"
	id="registration-form"
	on:submit={handleSubmit}
>
	<div class="form__form">
		<fieldset class="fieldset fieldset--info1">
			<legend class="hidden">情報１</legend>
			<div class="container">
				<Input
					additionalClass={'number--md'}
					name={'customer-number'}
					label={'顧客番号'}
					labelClass={'label-width--md'}
					bind:value={company.id}
				/>
				<Input
					additionalClass={'number--sm'}
					name={'branch-number'}
					label={'枝番'}
					bind:value={initialState.branchNumber}
					bind:isValid={noErrors.branchNumber}
				/>
			</div>

			<Input
				additionalClass={'txt--xl'}
				name="facilityName"
				label="施設名"
				autoSearch={true}
				labelClass={'label-width--md'}
				bind:value={initialState.facilityName}
				bind:isValid={noErrors.facilityName}
			/>
			<Input
				additionalClass={'txt--xl'}
				name="kana"
				label="カナ"
				labelClass={'label-width--md'}
				bind:value={initialState.kana}
				bind:isValid={noErrors.kana}
			/>

			<div class="container">
				<Input
					additionalClass="number--md"
					name="facilityNumber"
					label="医療機関番号"
					labelClass={'label-width--lg'}
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

			<div class="container">
				<Input
					additionalClass="txt--sm"
					name="postalCode"
					label="郵便番号"
					autoSearch={true}
					labelClass={'label-width--lg'}
					bind:value={initialState.postalCode}
					bind:isValid={noErrors.postalCode}
				/>

				<Input
					additionalClass="txt--sm"
					name="prefecture"
					label={'都道府県'}
					bind:value={initialState.prefecture}
					bind:isValid={noErrors.prefecture}
				/>

				<Input
					additionalClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={initialState.city}
					bind:isValid={noErrors.city}
				/>
			</div>

			<div class="address">
				<Input
					labelClass={'label-width--lg'}
					additionalClass="txt--lg"
					name="address1"
					label={'住所１'}
					placeholder="丁目・番地"
					bind:value={initialState.address1}
					bind:isValid={noErrors.address1}
				/>
				<Input
					labelClass={'label-width--lg'}
					additionalClass="txt--lg"
					name="address2"
					label={'住所２'}
					placeholder="建物名・部屋番号"
					bind:value={initialState.address2}
					bind:isValid={noErrors.address2}
				/>
			</div>

			<div class="container">
				<Input
					additionalClass="number--lg"
					name="phoneNumber"
					label="電話番号"
					labelClass={'label-width--lg'}
					bind:value={initialState.phoneNumber}
					bind:isValid={noErrors.phoneNumber}
				/>

				<Input
					additionalClass="number--lg"
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
				<DateSelector bind:year={initialState.year} bind:month={initialState.month} />
				<Input
					additionalClass="txt--lg"
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
			<div class="container">
				<label class="label" for="">診療科目</label>

				<div class="container container--vertical">
					{#each bedInputArray as bed}
						<BedConfiguration bind:bed bind:bedInputArray />
					{/each}
				</div>

				<div class="total">
					<h3 class="label">病床数合計</h3>
					<p class="total__dispay">{totalOfBed}</p>
				</div>
			</div>
			<button type="button" class="btn btn--add" on:click={handleAddBed}>＋ 新規追加</button>
		</fieldset>
		<!-- .fieldset--bed -->

		<fieldset class="fieldset fieldset--info2">
			<legend class="hidden">情報２</legend>
			<Input
				unit="名"
				additionalClass="number--lg"
				label="従業員数"
				labelClass={'label-width--lg'}
				name="employee-quantity"
				bind:value={initialState.numberOfEmployees}
				bind:isValid={noErrors.numberOfEmployees}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="homepage"
				additionalClass="txt--lg"
				label="ホームページ"
				bind:value={initialState.homepage}
				bind:isValid={noErrors.homepage}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="facility-number"
				additionalClass="number--lg"
				unit="店"
				label="関連施設拠点数"
				bind:value={initialState.numberOfFacilities}
				bind:isValid={noErrors.numberOfFacilities}
			/>
		</fieldset>
		<!-- .fieldset--info2 -->
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

	.hidden {
		display: none;
	}

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
</style>
