<script lang="ts" context="module"></script>

<script lang="ts">
	// import Input from './Components/Input.svelte'
	import Selector from '@/views/customersViews/Form/Selector.svelte'
	import Input from '../new/Components/Input.svelte'
	import DateInput from './Components/DateInput.svelte'
	import Select from './Components/Select.svelte'

	let currentFieldsetDisplayed = 'customerInfo'

	const clickOnAdd = () => {}

	const years: string[] = ['']
	const months: string[] = ['']
	const days: string[] = ['']
	const hours: string[] = ['']
	const currentYear = new Date().getFullYear()
	const minYear = 2000

	for (let i = minYear; i < currentYear; i++) {
		years.push(i.toString())
	}

	for (let i = 1; i <= 12; i++) {
		months.push(i.toString())
	}

	for (let i = 1; i <= 31; i++) {
		days.push(i.toString())
	}

	for (let i = 0; i <= 23; i++) {
		hours.push(i.toString())
	}

	const videoCheckbox = [
		'動画視聴　依頼',
		'動画視聴　確認',
		'新品　購入経験',
		'増台提案',
		'値上げ：全世界の値上げ傾向。物流・保管・電気等の徹底',
		'傷、色あせ：中古商材の為、多少の傷や色あせ有り。洗浄・メンテの徹底',
		'商品確保：中古商材の為、購入契約者優先の商品確保',
		'締め支払い：契約書締結による締め支払い',
		'前払い（特別値引き）の説明',
		'中古　購入経験'
	]
</script>

<section class="section">
	<header class="section__header">
		<div class="display-form">
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'customerInfo')}>お客様情報登録</button
			>
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'negociationInfo')}>商談情報登録</button
			>
			<button
				class="btn btn--select secondary"
				on:click={() => (currentFieldsetDisplayed = 'negociationHistory')}>商談経緯登録</button
			>
		</div>
	</header>

	<div class="section__main">
		{#if currentFieldsetDisplayed === 'customerInfo'}
			<fieldset class="fieldset">
				<legend class="fieldset__header"> お客様情報 </legend>
				<div class="fieldset__main">
					<div class="form-row">
						<Input name={'name'} label={'施設名'} placeholder={'未入力'} inputSize={'input--lg'} />
					</div>
					<div class="form-row">
						<Input
							name={'customer-number'}
							label={'顧客番号'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
						<Input
							name={'branch-number'}
							label={'枝番'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
						<Input
							name={'institution-number'}
							label={'医療機関番号'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'business'}
							label={'事業内容'}
							placeholder={'未入力'}
							inputSize={'input--lg'}
						/>
					</div>
					<div class="form-row">
						<Input name={'homepage'} label={'HP'} placeholder={'未入力'} inputSize={'input--lg'} />
					</div>
					<div class="form-row">
						<Input
							name={'google-reviews'}
							label={'Google評価'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
						<Input
							name={'reviews'}
							label={'口コミ'}
							placeholder={'未入力'}
							inputSize={'input--lg'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'direct-line'}
							label={'固定回線'}
							placeholder={'未入力'}
							inputSize={'input--md'}
						/>
					</div>
					<div class="form-row">
						<Input name={'fax'} label={'FAX番号'} placeholder={'未入力'} inputSize={'input--md'} />
					</div>
					<div class="form-row">
						<Input name={'email'} label={'メール'} placeholder={'未入力'} inputSize={'input--lg'} />
					</div>
					<div class="form-row">
						<Input
							name={'mobile-phone'}
							label={'携帯電話'}
							placeholder={'未入力'}
							inputSize={'input--md'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'number-of-employees'}
							label={'従業員数'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'number-of-branches'}
							label={'関連施設拠点数'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
					</div>

					<div class="form-row">
						<Input
							name={'miscellaneous'}
							label={'その他'}
							placeholder={'未入力'}
							inputSize={'input--xl'}
						/>
					</div>

					<div class="form-row">
						<Input
							name={'べっぢんg'}
							label={'診療科目'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
						<Input name={'name'} label={'病床数'} placeholder={'未入力'} inputSize={'input--sm'} />
						<Input
							name={'name'}
							label={'病床数合計'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
						/>
					</div>

					<div class="form-row">
						<Input
							name={'person-in-charge'}
							label={'ご担当者名'}
							placeholder={'未入力'}
							inputSize={'input--md'}
						/>
						<Input name={'role'} label={'役職'} placeholder={'未入力'} inputSize={'input--sm'} />
					</div>

					<div class="form-row">
						<Input
							name={'person-in-charge-memo'}
							label={'ご担当メモ'}
							placeholder={'未入力'}
							inputSize={'input--xl'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'approver'}
							label={'決裁者'}
							placeholder={'未入力'}
							inputSize={'input--md'}
						/>
					</div>
					<div class="form-row">
						<Input
							name={'prefered-contact-time'}
							label={'連絡の取りやすい時間'}
							placeholder={'未入力'}
							inputSize={'input--xl'}
						/>
					</div>

					<div class="form-row">
						<h3 class="label">参考書類など 画像データ</h3>
						<div>
							<div class="container">
								<img class="image" src="" alt="" />
								<p class="image-description">no image</p>
							</div>
							<input name="file" id="file" type="file" />
							<label for="file">画像追加</label>
							<input type="text" placeholder="memo" />
							<button class="primary">保存</button>
						</div>
					</div>
				</div>
			</fieldset>
		{/if}

		{#if currentFieldsetDisplayed === 'negociationInfo'}
			<fieldset class="fieldset">
				<legend class="fieldset__header">商談情報</legend>
				<div class="fieldset__main">
					<div class="form-row">
						<Select
							label={'ステータス'}
							name={'status'}
							options={['注文', '新規受注', '再問合せ', '見送り', '失注', '在庫無し']}
						/>
					</div>
					<div class="form-row">
						<DateInput name={'negociation-start'} label={'商談開始日'} />
					</div>

					<div class="form-row">
						<Select label={'可能性'} name={'condition'} options={['A', 'B', 'C', 'M', 'MM']} />

						<Select
							name={'inflow'}
							label={'流入'}
							options={[
								'新規FAX',
								'新規HP',
								'新規メール',
								'新規営業',
								'顧客',
								'顧客FAX',
								'顧客HP',
								'顧客メール',
								'確認中',
								'新規紹介',
								'失注顧客'
							]}
						/>
					</div>

					<div class="form-row">
						<Select
							label={'相見積もり'}
							name={'preference'}
							options={['新品・中古', '新品', '中古', '不明', '確認前', '無し']}
						/>
					</div>

					<div class="form-row">
						<DateInput name={'billing'} label={'納期'} />

						<label for="not-confirmed">
							<input type="checkbox" name="not-confirmed" id="not-confirmed" />
							未確定
						</label>
					</div>

					<div class="form-row">
						<Input label={'入金予定'} placeholder={'未入力'} name={'scheduled=deposit'} />
					</div>

					<div class="form-row">
						<Select
							name={'payment-method'}
							label={'支払い方法'}
							options={[
								'確認前',
								'確認中',
								'前払い（振込）',
								'前払い（代引き）',
								'クレジットカード',
								'前金＋後払い',
								'全額後払い'
							]}
						/>
					</div>

					<div class="form-row">
						<DateInput label={'成否日'} name={'outcome'} />

						<label for="not-confirmed">
							<input type="checkbox" name="not-confirmed" id="not-confirmed" />
							未定
						</label>
					</div>

					<div class="form-row">
						<DateInput label={'次回連絡日時'} name={'next-contact'} />

						<label for="time">
							<select name="time" id="time">
								{#each hours as hour}
									<option value={hour}>{hour}</option>
								{/each}
							</select>
							時
						</label>
					</div>

					<div class="form-row">
						<Input name={'postal-code'} inputSize={'input--sm'} label={'納期先'} />
					</div>
					<div class="form-row">
						<Input name={'prefecture'} inputSize={'input--sm'} label={'都道府県'} />
						<Input name={'city'} inputSize={'input--sm'} label={'市区町村'} />
					</div>
					<div class="form-row">
						<Input name={'address1'} inputSize={'input--sm'} label={'住所１'} />
					</div>
					<div class="form-row">
						<Input name={'address2'} inputSize={'input--sm'} label={'住所２'} />
					</div>
					<div class="form-row">
						<Input label={'距離'} name={'distance'} unit={'km'} />
						<Input name={'duration'} unit={'時間'} />
					</div>

					<!-- estimation section -->
					<div class="form-row">
						<div>
							<h3 class="label">見積もり金額</h3>
							<button class="btn primary">＋見積追加</button>
						</div>
						<div class="container">
							<div class="form-row">
								<DateInput label={'発行日'} name={'issue-date'} />
							</div>
							<div class="form-row">
								<DateInput label={'見積期日'} name={'estimation-due-date'} />
							</div>
							<div class="form-row">
								<Input label={'税抜価格'} name={'price-without-tax'} unit="円" />
								<Input label={'消費税'} name={'tax'} unit="円" />
							</div>
							<div class="form-row">
								<Input label={'商品'} name={'product'} />
								<button class="btn primary">商品選択</button>
								<Input unit={'台'} name={'quantity'} />
							</div>
							<div class="form-row">
								<button class="btn primary">＋商品追加</button>
							</div>
							<button class="btn primary delete-btn">削除</button>
						</div>
					</div>

					<!-- important memo seciton  -->

					<div class="form-row">
						<h3 class="label">重要メモ</h3>
						<div>
							<div class="container">
								<DateInput name={'memo-date'} />
								<textarea name={'important-meme'} id="important-memo" />
								<button class="btn primary delete-btn">削除</button>
							</div>

							<button class="btn primary">＋新規追加</button>
						</div>
					</div>

					<div class="form-row">
						<Input name={'representative'} placeholder={'未入力'} label={'自社担当者'} />
					</div>
					<div class="form-row">
						<Input name={'person-in-charge'} placeholder={'未入力'} label={'責任者'} />
					</div>

					<div class="form-row">
						<Select
							label={'オカセイ便り'}
							name={'news'}
							options={['新規依頼', '新規送付済み', '顧客登録済み']}
						/>

						<Select
							label={'DM発送'}
							name={'dm'}
							options={['不要', '要(未手配)', '郵送済み', '持参']}
						/>

						<Input name={'presentation-video'} label={'PR動画'} />
					</div>

					<div class="checkboxes-container">
						{#each videoCheckbox as element}
							<label class="checkbox-container" for={element}>
								{element}
								<input class="checkbox" type="checkbox" name={element} id={element} />
								<span class="checkmark" />
							</label>
						{/each}
					</div>

					<div class="form-row">
						<label class="label" for="bottleneck">ボトルネック確認</label>
						<textarea name="bottleneck" id="bottleneck" cols="30" rows="10" />
					</div>
					<div class="form-row">
						<label class="label" for="chance">機会（チャンス）</label>
						<textarea name="chance" id="chance" cols="30" rows="10" />
					</div>
					<div class="form-row">
						<label class="label" for="risk">脅威（リスク）</label>
						<textarea name="risk" id="risk" />
					</div>
				</div>
			</fieldset>
		{/if}

		{#if currentFieldsetDisplayed === 'negociationHistory'}
			<fieldset class="fieldset">
				<legend class="fieldset__header">商談経緯</legend>
				<div class="fieldset__main">
					<div class="form-row">
						<DateInput label={'成否日'} name={'outcome-day'} />

						<Input name={'history-memo'} />

						<button class="btn primary">削除</button>
					</div>
				</div>
			</fieldset>
		{/if}
	</div>

	<footer class="section__footer" />
</section>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		gap: 12px;
		margin-bottom: 20px;
	}

	.display-form {
		display: flex;
		justify-content: flex-start;
		gap: 18px;
	}

	.fieldset {
		&__header {
			color: var(--primary);
			font-weight: 700;
			margin-bottom: 18px;
		}
	}

	.btn {
		margin: 0;
	}

	.section {
		&__main {
			background-color: #fff;
			border-radius: 16px;
			padding: 0 37px;
			padding-top: 28px;
			padding-bottom: 48px;
			margin-top: 20px;
		}
	}

	.checkboxes-container {
		display: flex;
		flex-direction: column;
	}

	textarea {
		resize: none;
		width: calc(100% - 24px);
		height: calc(100px - 24px);
		border-radius: 8px;
		padding: 12px;
	}

	.container {
		position: relative;
		background-color: #f4f4f4;
		padding: 10px 21px;
		border-radius: 8px;
		width: 100%;
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.delete-btn {
		position: absolute;
		bottom: 10px;
		right: 21px;
	}

	.checkbox-container {
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		position: relative;
		// padding-left: 35px;
		gap: 18px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 18px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		& :hover {
			.checkbox ~ .checkmark {
				background-color: #ccc;
			}
		}

		& :after {
			content: '';
			// position: absolute;
			display: none;
		}

		.checkmark {
			// position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
			// background-color: #eee;
			border: 1px solid var(--black);
			border-radius: 3px;

			&:after {
				width: 3px;
				height: 8px;
				border: solid white;
				border-width: 0 3px 3px 0;
				-webkit-transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}

		.checkbox {
			position: absolute;
			opacity: 0;
			cursor: pointer;
			height: 0;
			width: 0;

			&:checked ~ .checkmark {
				background-color: var(--primary);

				&:after {
					display: block;
				}
			}
		}
	}

	.image {
		height: 100px;
		width: 100px;
		background-color: pink;
	}

	#file {
		// width: 0;
		// height: 0;
		// opacity: 0;

		& ~ label {
			background-color: var(--primary);
			color: #fff;
		}
	}
</style>
