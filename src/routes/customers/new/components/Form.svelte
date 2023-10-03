<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import DateSelector from './DateSelector.svelte'
	import BedConfiguration from './BedConfiguration.svelte'

	const hojinKojin: string[] = ['', '個人', '法人']

	interface Info {
		title: string
		class: string
		data: string
	}

	export let checkIsTrue: boolean
	export let info1: Info[]
	export let info2: Info[]
	export let foundation: Info[]
	export let address: Info[]

	let date = {
		year: { title: '年', data: '', class: 'year' },
		month: { title: '月', data: '', class: 'month' }
	}

	$: foundation[0].data = date.year.data
	$: foundation[1].data = date.month.data

	const handleSubmit = (e: any) => {
		e.preventDefault()
		console.log(e.target)
		console.log(info1)

		checkIsTrue = !checkIsTrue

		// console.log(info1)
		// console.log(address)
		// console.log(foundation)
		// console.log(info2)
	}
</script>

<form class="form" method="POST" id="registration-form" on:submit={handleSubmit}>
	<div class="form__form">
		<fieldset class="fieldset fieldset--info1">
			<legend class="hidden">info1</legend>
			<div class="container">
				<Input
					additionalClass={'number--md'}
					name={'customer-number'}
					label={'顧客番号'}
					labelClass={'label-width--md'}
					bind:value={info1[0].data}
				/>
				<Input
					additionalClass={'number--sm'}
					name={'branch-number'}
					label={'枝番'}
					bind:value={info1[1].data}
				/>
			</div>

			<Input
				additionalClass={'txt--xl'}
				name="facility-name"
				label="施設名"
				autoSearch={true}
				labelClass={'label-width--md'}
				bind:value={info1[2].data}
			/>
			<Input
				additionalClass={'txt--xl'}
				name="kana"
				label="カナ"
				labelClass={'label-width--md'}
				bind:value={info1[3].data}
			/>

			<div class="container">
				<Input
					additionalClass="number--md"
					name="instition-number"
					label="医療機関番号"
					labelClass={'label-width--lg'}
					bind:value={info1[4].data}
				/>

				<Select options={hojinKojin} label="個人／法人" bind:value={info1[5].data} />
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--address">
			<legend class="hidden">Address</legend>

			<div class="container">
				<Input
					additionalClass="txt--sm"
					name="postal"
					label="郵便番号"
					autoSearch={true}
					labelClass={'label-width--lg'}
					bind:value={address[0].data}
				/>

				<Input
					additionalClass="txt--sm"
					name="region"
					label={'都道府県'}
					bind:value={address[1].data}
				/>

				<Input
					additionalClass="txt--sm"
					name="city"
					label={'市区町村'}
					bind:value={address[2].data}
				/>

				<div class="address">
					<Input
						additionalClass="txt--lg"
						name="address1"
						label={'住所１'}
						placeholder="丁目・番地"
						bind:value={address[3].data}
					/>
					<Input
						additionalClass="txt--lg"
						name="address2"
						label={'住所２'}
						placeholder="建物名・部屋番号"
						bind:value={address[4].data}
					/>
				</div>
			</div>

			<div class="container">
				<Input
					additionalClass="number--lg"
					name="phone"
					label="電話番号"
					labelClass={'label-width--lg'}
					bind:value={address[5].data}
				/>

				<Input
					additionalClass="number--lg"
					name="fax"
					label="FAX番号"
					bind:value={address[6].data}
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--foundation">
			<legend class="hidden">foundation</legend>
			<div class="container">
				<DateSelector bind:value={date} />
				<Input
					additionalClass="txt--lg"
					name="founder"
					label="設立者"
					bind:value={foundation[2].data}
				/>
			</div>
		</fieldset>

		<fieldset class="fieldset fieldset--bed">
			<legend class="hidden">bed setting</legend>
			<div class="container">
				<label class="label" for="">診療科目</label>

				<div class="container container--vertical">
					<BedConfiguration />
				</div>

				<div class="total">
					<h3 class="label">病床数合計</h3>
					<p class="total__dispay">0</p>
				</div>
			</div>
			<button class="btn btn--add">＋ 新規追加</button>
		</fieldset>

		<fieldset class="fieldset fieldset--info2">
			<Input
				unit="名"
				additionalClass="number--lg"
				label="従業員数"
				labelClass={'label-width--lg'}
				name="employee-quantity"
				bind:value={info2[0].data}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="homepage"
				additionalClass="txt--lg"
				label="ホームページ"
				bind:value={info2[1].data}
			/>

			<Input
				labelClass={'label-width--lg'}
				name="facility-number"
				additionalClass="number--lg"
				unit="店"
				label="関連施設拠点数"
				bind:value={info2[2].data}
			/>
		</fieldset>
	</div>
</form>

<style lang="scss">
	.form {
		font-family: 'Noto Sans JP';
	}
	.form__form {
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: auto;

		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.select {
		padding-left: 10px;
		height: 32px;
		width: calc(106px - 10px);
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
</style>
