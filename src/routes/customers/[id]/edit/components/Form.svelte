<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import BedConfiguration from './BedConfiguration.svelte'
	import { parseCompanyInfo } from '@/routes/customers/utils/parsers'
	import type { CompanyInfo } from '../../../utils/types'
	export let company: CompanyInfo

	export let checkIsTrue: boolean

	const hojinKojin = [' ', '法人', '個人']

	// let numberOfBedInput = 1
	let bedInputArray: number[] = [1]
	// // $: bedInputArray = []

	// $: for (let i = 1; i <= numberOfBedInput; i++) {
	// 	// bedInputArray = [...bedInputArray, i.toString()]
	// 	bedInputArray.push(i)
	// 	bedInputArray = bedInputArray
	// 	console.log(bedInputArray)
	// }

	const handleAddBed = () => {
		bedInputArray.push(bedInputArray.length + 1)
		bedInputArray = bedInputArray
	}

	$: console.log(bedInputArray)

	// $: console.log(numberOfBedInput)

	const edit = (updatedCompany: CompanyInfo) => {
		fetch('http://localhost:3000/customers/' + company.id, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json;charset=UTF-8' },
			body: JSON.stringify(updatedCompany)
		})
			.then(() => console.log('yeah'))
			.catch(err => console.log(err))
	}

	const handleSubmit = (e: any) => {
		if (checkIsTrue) {
			console.log(edit)
			const updatedCompany = parseCompanyInfo(company, 'update')
			edit(updatedCompany)
		}

		if (!checkIsTrue) {
			console.log('heho')
			e.preventDefault()
			checkIsTrue = true
		}
		// edit()
	}
</script>

<form
	class="form {checkIsTrue ? 'hidden' : ''}"
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
					bind:value={company.customerNumber}
				/>
				<Input
					additionalClass={'number--sm'}
					name={'branch-number'}
					label={'枝番'}
					bind:value={company.branchNumber}
				/>
			</div>

			<Input
				additionalClass={'txt--xl'}
				name="facility-name"
				label="施設名"
				autoSearch={true}
				labelClass={'label-width--md'}
				bind:value={company.facilityName}
			/>
			<Input
				additionalClass={'txt--xl'}
				name="kana"
				label="カナ"
				labelClass={'label-width--md'}
				bind:value={company.kana}
			/>

			<div class="container">
				<Input
					additionalClass="number--md"
					name="instition-number"
					label="医療機関番号"
					labelClass={'label-width--lg'}
					bind:value={company.facilityNumber}
				/>

				<Select options={hojinKojin} label="個人／法人" bind:value={company.businessType} />
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--address">
			<legend class="hidden">住所</legend>

			<div class="container">
				<Input
					additionalClass="txt--sm"
					name="postal"
					label="郵便番号"
					autoSearch={true}
					labelClass={'label-width--lg'}
					bind:value={company.address.postalCode}
				/>

				<Input
					additionalClass="txt--sm"
					name="region"
					label={'都道府県'}
					bind:value={company.address.prefecture}
				/>

				<Input
					additionalClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={company.address.city}
				/>

				<div class="address">
					<Input
						additionalClass="txt--lg"
						name="address1"
						label={'住所１'}
						placeholder="丁目・番地"
						bind:value={company.address.address1}
					/>
					<Input
						additionalClass="txt--lg"
						name="address2"
						label={'住所２'}
						placeholder="建物名・部屋番号"
						bind:value={company.address.address2}
					/>
				</div>
			</div>

			<div class="container">
				<Input
					additionalClass="number--lg"
					name="phone"
					label="電話番号"
					labelClass={'label-width--lg'}
					bind:value={company.address.phoneNumber}
				/>

				<Input
					additionalClass="number--lg"
					name="fax"
					label="FAX番号"
					bind:value={company.address.fax}
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--foundation">
			<legend class="hidden">創立</legend>
			<div class="container">
				<DateSelector bind:year={company.foundation.year} bind:month={company.foundation.month} />
				<Input
					additionalClass="txt--lg"
					name="founder"
					label="設立者"
					bind:value={company.foundation.founder}
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--bed">
			<legend class="hidden">病床設定</legend>
			<div class="container">
				<label class="label" for="">診療科目</label>

				<div class="container container--vertical">
					{#each bedInputArray as index}
						<BedConfiguration />
					{/each}
				</div>

				<div class="total">
					<h3 class="label">病床数合計</h3>
					<p class="total__dispay">0</p>
				</div>
			</div>
			<button type="button" class="btn btn--add" on:click={handleAddBed}>＋ 新規追加</button>
		</fieldset>

		<fieldset class="fieldset fieldset--info2">
			<legend class="hidden">情報２</legend>
			<Input
				unit="名"
				additionalClass="number--lg"
				label="従業員数"
				labelClass={'label-width--lg'}
				name="employee-quantity"
				bind:value={company.numberOfEmployees}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="homepage"
				additionalClass="txt--lg"
				label="ホームページ"
				bind:value={company.homepage}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="facility-number"
				additionalClass="number--lg"
				unit="店"
				label="関連施設拠点数"
				bind:value={company.numberOfFacilities}
			/>
		</fieldset>
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
		gap: 2rem;
		align-items: flex-start;
		justify-content: flex-start;
		flex-wrap: wrap;

		&--vertical {
			flex-direction: column;
		}
	}

	.fieldset {
		&--bed {
			margin-bottom: 20px;
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
