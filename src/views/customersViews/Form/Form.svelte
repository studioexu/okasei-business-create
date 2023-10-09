<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import BedConfiguration from './BedConfiguration.svelte'
	import { parseBeforeUpdate, parseBeforePost } from '@/routes/customers/utils/parsers'
	import type { CustomerEntries, CustomerInfo, Error } from '@/routes/customers/utils/types'
	import { inputIsValid } from '@/routes/customers/utils/validations'
	import { update, create } from '@/routes/customers/utils/actions'

	interface BedInput {
		index: number
		department: string
		quantity: string
	}

	export let formType: string
	export let verificationPageDisplayed: boolean
	export let initialState: CustomerEntries

	// if (typeOfForm === 'update') {
	// 	export let customer: CustomerInfo
	// }

	let totalOfBed: number = 0

	const caculateTotalOfBed = (beds: BedInput[]): number => {
		let sum: number = 0
		beds.map((bed: BedInput) => {
			sum += parseInt(bed.quantity)
		})

		return sum
	}

	// if (formType === 'update') {
	// export let customer: CustomerInfo

	const handleSubmit = (e: any) => {
		if (verificationPageDisplayed) {
			if (formType === 'create') {
				let newcustomer = parseBeforePost(initialState)
				create(newcustomer, 'http://localhost:3000/customers/')
			}

			if (formType === 'update') {
				const registration = {
					status: '登録',
					date: initialState.registrationDate,
					time: initialState.registrationTime
				}
				const updatedcustomer = parseBeforeUpdate(initialState, registration)

				if (typeof initialState.id === 'string') {
					update(updatedcustomer, 'http://localhost:3000/customers/', initialState.id)
				}
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
	// }

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
		const customerKeys = Object.keys(formEntries)
		const customerValues = Object.values(formEntries)

		for (let i = 0; i < customerKeys.length; i++) {
			const name: string = customerKeys[i]
			const input: string = customerValues[i]

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
	method={'PUT'}
	action="/customers/"
	id="registration-form"
	on:submit={handleSubmit}
>
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
			/>
			<Input
				inputClass={'txt--xl'}
				name="kana"
				label="カナ"
				labelClass={'label-width--md'}
				bind:value={initialState.kana}
				bind:isValid={noErrors.kana}
			/>

			<div class="container">
				<Input
					inputClass="number--md"
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
					inputClass="txt--sm"
					name="postalCode"
					label="郵便番号"
					autoSearch={true}
					labelClass={'label-width--lg'}
					bind:value={initialState.postalCode}
					bind:isValid={noErrors.postalCode}
				/>

				<Input
					inputClass="txt--sm"
					name="prefecture"
					label={'都道府県'}
					bind:value={initialState.prefecture}
					bind:isValid={noErrors.prefecture}
				/>

				<Input
					inputClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={initialState.city}
					bind:isValid={noErrors.city}
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
				/>
				<Input
					labelClass={'label-width--lg'}
					inputClass="txt--lg"
					name="address2"
					label={'住所２'}
					placeholder="建物名・部屋番号"
					bind:value={initialState.address2}
					bind:isValid={noErrors.address2}
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
				<DateSelector bind:year={initialState.year} bind:month={initialState.month} />
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
