<script lang="ts">
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import BedConfiguration from './BedConfiguration.svelte'
	import DateSelector from './DateSelector.svelte'
	const hojinKojin: string[] = ['', '個人', '法人']

	let numberOfBedInput = 1

	let checkIsTrue = false

	interface Info {
		title: string
		class: string
		data: string
	}

	let info1: Info[] = [
		{ title: '顧客番号', class: 'customer-number', data: '' },
		{ title: '枝番', data: '', class: 'branch-number' },
		{ title: '施設名', data: '', class: 'name' },
		{ title: 'カナ', data: '', class: 'kana' },
		{ title: '医療機関番号', data: '', class: 'institution-number' },
		{ title: '区分', data: '', class: 'company-type' }
	]

	// let info1 = {
	// 	customerNumber: { title: '顧客番号', class: 'customer-number', data: '' },
	// 	branchNumber: { title: '枝番', data: '', class: 'branch-number' },
	// 	name: { title: '施設名', data: '', class: 'name' },
	// 	kana: { title: 'カナ', data: '', class: 'kana' },
	// 	companyType: { title: '医療機関番号', data: '', class: 'company-type' },
	// 	institutionNumber: { title: '区分', data: '', class: 'institution-number' }
	// }

	let address: Info[] = [
		{ title: '郵便番号', data: '', class: 'postal' },
		{ title: '都道府県', data: '', class: 'region' },
		{ title: '市区町村', data: '', class: 'city' },
		{ title: '住所１', data: '', class: 'address1' },
		{ title: '住所2', data: '', class: 'address2' },
		{ title: '電話番号', data: '', class: 'phone' },
		{ title: 'FAX番号', data: '', class: 'fax' }
	]

	// let foundation = [
	// 	{ title: '年', data: '', class: 'year' },
	// 	{ title: '月', data: '', class: 'month' },
	// 	{ title: '設立者', data: '', class: 'founder' }
	// ]

	let foundation = [
		{ title: '年', data: '', class: 'year' },
		{ title: '月', data: '', class: 'month' },
		{ title: '設立者', data: '', class: 'founder' }
	]

	let info2: Info[] = [
		{ title: '従業員数', data: '', class: 'number-employee' },
		{ title: 'ホームページ', data: '', class: 'homepage' },
		{ title: '関連施設拠点数', data: '', class: 'facility-quantity' }
	]

	let date = {
		year: { title: '年', data: '', class: 'year' },
		month: { title: '月', data: '', class: 'month' }
	}

	$: foundation[0].data = date.year.data
	$: foundation[1].data = date.month.data

	// const handleAdd = () => {
	// 	numberOfBedInput += 1
	// }

	// console.log(year)

	const handleSubmit = (e: any) => {
		e.preventDefault()

		checkIsTrue = !checkIsTrue

		console.log(info1)
		console.log(address)
		console.log(foundation)
		console.log(info2)
	}
</script>

<!-- <h1>下記の内容で登録しますか？</h1> -->

<form class="form" method="POST" on:submit={handleSubmit}>
	{#if checkIsTrue === false}
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
	{/if}

	{#if checkIsTrue === true}
		<section class="section section__confirmation">
			<div class="info1 container">
				{#each info1 as info}
					<div class="info-wrapper {info.class}">
						<h3 class="title">{info.title}</h3>
						<p class="data">{info.data}</p>
					</div>
				{/each}
			</div>

			<div class="address container">
				{#each address as info}
					<div class="info-wrapper {info.class}">
						<h3 class="title">{info.title}</h3>
						<p class="data">{info.data}</p>
					</div>
				{/each}
			</div>

			<div class="foundation container">
				<!-- {#each foundation as info}
					<div class="info-wrapper {info.class}">
						<h3 class="title">{info.title}</h3>
						<p class="data">{info.data}</p>
					</div>
				{/each} -->

				<div class="info-wrapper date">
					<h3 class="title">設立年月日</h3>
					<p class="data">{foundation[0].data}</p>
					<span class="unit">{foundation[0].title}</span>
					<p class="data">{foundation[1].data}</p>
					<span class="unit">{foundation[1].title}</span>
				</div>

				<div class="info-wrapper founder">
					<h3 class="title">{foundation[2].title}</h3>
					<p class="data">{foundation[2].data}</p>
				</div>
			</div>

			<div class="info2 container">
				{#each info2 as info}
					<div class="info-wrapper {info.class}">
						<h3 class="title">{info.title}</h3>
						<p class="data">{info.data}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<div class="form__footer">
		<button class="btn btn--submit">登録</button>
	</div>
</form>

<!-- let address: Info[] = [
		{ title: '郵便番号', data: '', class: 'postal' },
		{ title: '都道府県', data: '', class: 'region' },
		{ title: '市区町村', data: '', class: 'city' },
		{ title: '住所１', data: '', class: 'address1' },
		{ title: '住所2', data: '', class: 'address2' },
		{ title: '電話番号', data: '', class: 'phone' },
		{ title: 'FAX番号', data: '', class: 'fax' }
	]

	let foundation = [
		{ title: '年', data: '', class: 'year' },
		{ title: '月', data: '', class: 'month' },
		{ title: '設立者', data: '', class: 'founder' }
	]

	let info2: Info[] = [
		{ title: '従業員数', data: '', class: 'number-employee' },
		{ title: 'ホームページ', data: '', class: 'homepage' },
		{ title: '関連施設拠点数', data: '', class: 'facility-quantity' }
	]

	let date = {
		year: { title: '年', data: '', class: 'year' },
		month: { title: '月', data: '', class: 'month' }
	} -->

<style lang="scss">
	.form {
		font-family: 'Noto Sans JP';
	}
	.form__form,
	.section {
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: calc(((1240 - 74) / 1366) * 100vw);

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

		&--submit {
			width: 108px;
			height: 45px;
			margin-left: auto;
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

	.form__footer {
		margin-top: 1.5rem;
	}

	.hidden {
		display: none;
	}

	.section__confirmation {
		.title {
			color: #707070;
			font-size: 18px;
			font-weight: 500;
		}

		.info-wrapper {
			position: relative;
			display: flex;
			padding: 11px 0;
			.title {
				width: 130px;
			}
			column-gap: 18px;
			align-items: center;
			// border-bottom: 1px red solid;
			// gap: 130px;
		}

		.container {
			// .name,
			// .kana,
			// .postal,
			// .homepage,
			// .number-employees,
			// .facility-quantity {
			// 	width: 100%;
			// }

			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;
			// margin-bottom: 22px;
			gap: 0;
		}

		.info1 {
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;

			.info-wrapper {
				.title {
					width: 74px;
				}
				gap: calc((27 / 1366) * 100vw);
			}

			.customer-number {
				grid-column: 1 / span 2;
				grid-row: 1;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}

			.branch-number {
				grid-column: 3 / span 2;
				grid-row: 1;
			}

			.name,
			.kana {
				grid-column: 1 / span 12;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}

			.company-type {
				grid-column: 4 / span 3;
			}

			.institution-number {
				grid-column: 1 / span 3;
				.title {
					width: 130px;
				}
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}
		}

		.address {
			.postal {
				grid-column: 1 / span 12;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}

			.region {
				grid-column: 1 / span 3;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}

			.city {
				grid-column: 4 / span 3;
			}

			.address1 {
				grid-column: 7 / span 3;
			}

			.address2 {
				grid-column: 10 / span 3;
			}

			.phone {
				grid-column: 1 / span 3;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}

			.fax {
				grid-column: 4 / span 3;
			}
		}

		.foundation {
			// .year {
			// 	grid-column: 2 / span 1;
			// }
			// .month {
			// 	grid-column: 3 / span 1;
			// }
			.date {
				grid-column: 1 / span 3;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}
			.founder {
				grid-column: 4 / span 3;
			}
		}

		.info2 {
			.number-employee,
			.homepage,
			.facility-quantity {
				grid-column: 1 / span 12;
				&::after {
					content: ' ';
					position: absolute;
					width: calc(((1092) / 1366) * 100vw);
					left: 0;
					bottom: 0;
					height: 2px;
					background-color: #707070;
				}
			}
		}
	}

	// let address: Info[] = [
	// 	{ title: '郵便番号', data: '', class: 'postal' },
	// 	{ title: '都道府県', data: '', class: 'region' },
	// 	{ title: '市区町村', data: '', class: 'city' },
	// 	{ title: '住所１', data: '', class: 'address1' },
	// 	{ title: '住所2', data: '', class: 'address2' },
	// 	{ title: '電話番号', data: '', class: 'phone' },
	// 	{ title: 'FAX番号', data: '', class: 'fax' }
	// ]

	// let foundation = [
	// 	{ title: '年', data: '', class: 'year' },
	// 	{ title: '月', data: '', class: 'month' },
	// 	{ title: '設立者', data: '', class: 'founder' }
	// ]

	// let info2: Info[] = [
	// 	{ title: '従業員数', data: '', class: 'number-employee' },
	// 	{ title: 'ホームページ', data: '', class: 'homepage' },
	// 	{ title: '関連施設拠点数', data: '', class: 'facility-quantity' }
	// ]

	// let date = {
	// 	year: { title: '年', data: '', class: 'year' },
	// 	month: { title: '月', data: '', class: 'month' }
	// }
</style>
