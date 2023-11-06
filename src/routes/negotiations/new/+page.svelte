<script lang="ts" context="module"></script>

<script lang="ts">
	// import Input from './Components/Input.svelte'
	import Input from '../new/Components/Input.svelte'

	let currentFieldsetDisplayed = 'customerInfo'

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
				</div>
			</fieldset>
		{/if}

		{#if currentFieldsetDisplayed === 'negociationInfo'}
			<fieldset class="fieldset">
				<legend class="fieldset__header">商談情報</legend>
				<div class="fieldset__main">
					<div class="form-row">
						<label for="status">
							ステータス
							<select name="status" id="status">
								<option value="order">注文</option>
								<option value="new">新規受注</option>

								<option value="new-demande">再問合せ</option>

								<option value="send-off">見送り</option>

								<option value="failed">失注</option>
								<option value="no-stock">在庫無し</option>
							</select>
						</label>
					</div>
					<div class="form-row">
						<h3>商談開始日</h3>
						<label for="year">
							<select name="year" id="year">
								{#each years as year}
									<option value={year}>{year}</option>
								{/each}
							</select>
							年
						</label>

						<label for="month">
							<select name="month" id="month">
								{#each months as month}
									<option value={month}>{month}</option>
								{/each}
							</select>
							月
						</label>
						<label for="day">
							<select name="day" id="day">
								{#each days as day}
									<option value={day}>{day}</option>
								{/each}
							</select>
							日
						</label>
					</div>

					<div class="form-row">
						<label for="condition">
							可能性
							<select name="condition" id="condition">
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="M">M</option>
								<option value="MM">MM</option>
							</select>
						</label>

						<label for="inflow">
							流入
							<select name="inflow" id="inflow">
								<option value="A">新規FAX</option>
								<option value="B">新規HP</option>
								<option value="C">新規メール</option>
								<option value="M">新規営業</option>
								<option value="MM">顧客</option>
								<option value="MM">顧客FAX</option>
								<option value="MM">顧客HP</option>
								<option value="MM">顧客メール</option>
								<option value="MM">確認中</option>
								<option value="MM">新規紹介</option>
								<option value="MM">失注顧客</option>
							</select>
						</label>
					</div>

					<div class="form-row">
						<label for="preference">
							相見積もり
							<select name="inflow" id="inflow">
								<option value="A">新品・中古</option>
								<option value="B">新品</option>
								<option value="C">中古</option>
								<option value="M">不明</option>
								<option value="MM">確認前</option>
								<option value="MM">無し</option>
							</select>
						</label>
					</div>

					<div class="form-row">
						<h3>納期</h3>
						<label for="year">
							<select name="year" id="year">
								{#each years as year}
									<option value={year}>{year}</option>
								{/each}
							</select>
							年
						</label>

						<label for="month">
							<select name="month" id="month">
								{#each months as month}
									<option value={month}>{month}</option>
								{/each}
							</select>
							月
						</label>
						<label for="day">
							<select name="day" id="day">
								{#each days as day}
									<option value={day}>{day}</option>
								{/each}
							</select>
							日
						</label>

						<label for="not-confirmed">
							<input type="checkbox" name="not-confirmed" id="not-confirmed" />
							未確定
						</label>
					</div>

					<div class="form-row">
						<Input label={'入金予定'} placeholder={'未入力'} name={'scheduled=deposit'} />
					</div>

					<div class="form-row">
						<label for="payment-method">
							<select name="payment-method" id="payment-method">
								<option value="">確認前</option>
								<option value="">確認中</option>
								<option value="">前払い（振込）</option>
								<option value="">前払い（代引き）</option>
								<option value="">クレジットカード</option>
								<option value="">前金＋後払い</option>
								<option value="">全額後払い</option>
							</select>
						</label>
					</div>

					<div class="form-row">
						<h3>成否日</h3>
						<label for="year">
							<select name="year" id="year">
								{#each years as year}
									<option value={year}>{year}</option>
								{/each}
							</select>
							年
						</label>

						<label for="month">
							<select name="month" id="month">
								{#each months as month}
									<option value={month}>{month}</option>
								{/each}
							</select>
							月
						</label>
						<label for="day">
							<select name="day" id="day">
								{#each days as day}
									<option value={day}>{day}</option>
								{/each}
							</select>
							日
						</label>

						<label for="not-confirmed">
							<input type="checkbox" name="not-confirmed" id="not-confirmed" />
							未定
						</label>
					</div>

					<div class="form-row">
						<h3>次回連絡日時</h3>
						<label for="year">
							<select name="year" id="year">
								{#each years as year}
									<option value={year}>{year}</option>
								{/each}
							</select>
							年
						</label>

						<label for="month">
							<select name="month" id="month">
								{#each months as month}
									<option value={month}>{month}</option>
								{/each}
							</select>
							月
						</label>
						<label for="day">
							<select name="day" id="day">
								{#each days as day}
									<option value={day}>{day}</option>
								{/each}
							</select>
							日
						</label>

						<label for="time">
							<select name="time" id="time">
								{#each hours as hour}
									<option value={hour}>{hour}</option>
								{/each}
							</select>
							日
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
						<h3>距離</h3>
						<label for="distance">
							<input type="text" name="distance" id="distance" />
							km
						</label>

						<label for="duration">
							<input type="text" name="duration" id="duration" />
							時間
						</label>
					</div>

					<!-- estimation section -->

					<!-- important memo seciton  -->

					<div class="form-row">
						<Input name={'representative'} placeholder={'未入力'} label={'自社担当者'} />
					</div>
					<div class="form-row">
						<Input name={'person-in-charge'} placeholder={'未入力'} label={'責任者'} />
					</div>

					<div class="form-row">
						<label for="news">
							オカセイ便り
							<select name="news" id="news">
								<option value="">新規依頼</option>
								<option value="">新規送付済み</option>
								<option value="">顧客登録済み</option>
							</select>
						</label>

						<label for="dm">
							DM発送
							<select name="dm" id="dm">
								<option value="">不要</option>
								<option value="">要(未手配)</option>
								<option value="">郵送済み</option>
								<option value="">持参</option>
							</select>
						</label>

						<Input name={'presentation-video'} label={'PR動画'} />
					</div>
				</div>
			</fieldset>
		{/if}

		{#if currentFieldsetDisplayed === 'negociationHistory'}
			<fieldset class="fieldset">
				<legend class="fieldset__header">商談経緯</legend>
				<div class="fieldset__main">hello</div>
			</fieldset>
		{/if}
	</div>

	<footer class="section__footer" />
</section>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		gap: 18px;
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
</style>
