<script lang="ts">
	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import SelectDate from '@/components/SelectDate.svelte'
	import DateInput from '@/components/DateInput.svelte'
	import CustomCheckbox from '@/components/CustomCheckbox.svelte'
	import type { CustomerFactory } from '@/Factories/CustomerFactory'

	export let initialState: any
	export let customers: CustomerFactory[]
	export let isSucceeded: boolean
	export let isShown: boolean
	export let confirmationPageIsShown: boolean

	let currentCustomerId: number | undefined

	let maxEstimateIndex = 1
	let maxMemoIndex = 1
	let maxHistoryIndex = 1

	let historyMemo = [
		{
			date: '',
			memo: ''
		}
	]

	let estimateArray: Estimate[] = [
		{
			issueDate: '',
			dueDate: '',
			estimateWithoutTax: '',
			tax: '',
			products: [
				{
					productName: '',
					quantity: ''
				}
			]
		}
	]

	let memoArray = [
		{
			date: '',
			memo: ''
		}
	]

	interface Estimate {
		issueDate: string
		dueDate: string
		estimateWithoutTax: string
		tax: string
		products: Product[]
	}

	interface Product {
		productName: string
		quantity: string
	}

	$: estimateArray = updateArray(maxEstimateIndex, estimateArray)
	$: historyMemo = updateArray(maxHistoryIndex, historyMemo)
	$: memoArray = updateArray(maxMemoIndex, memoArray)
	$: initialState.importantMemo = memoArray
	$: initialState.outcomeHistory = historyMemo
	$: initialState.estimate = estimateArray

	$: initialState.checkboxes = videoCheckbox

	$: maxHistoryIndex

	const videoCheckbox: any[] = [
		{ title: '動画視聴　依頼', isChecked: false },
		{ title: '動画視聴　確認', isChecked: false },
		{ title: '新品　購入経験', isChecked: false },
		{ title: '増台提案', isChecked: false },
		{ title: '値上げ：全世界の値上げ傾向。物流・保管・電気等の徹底', isChecked: false },
		{
			title: '傷、色あせ：中古商材の為、多少の傷や色あせ有り。洗浄・メンテの徹底',
			isChecked: false
		},
		{ title: '商品確保：中古商材の為、購入契約者優先の商品確保', isChecked: false },
		{ title: '締め支払い：契約書締結による締め支払い', isChecked: false },
		{ title: '前払い（特別値引き）の説明', isChecked: false },
		{ title: '中古　購入経験', isChecked: false }
	]

	const handleAddProduct = (index: number) => {
		const productArray = estimateArray[index].products
		productArray.push({
			productName: '',
			quantity: ''
		})
		estimateArray[index].products = productArray
	}

	const handleDeleteItemFromArray = (index: number, maxIndex: number, arrayToUpdate: any[]) => {
		const newArray = arrayToUpdate.slice(0, index).concat(arrayToUpdate.slice(index + 1))

		for (let i = 0; i < newArray.length; i++) {
			arrayToUpdate[i] = newArray[i]
		}

		maxIndex--
	}

	const updateArray = (maxIndex: number, arrayToUpdate: any[]) => {
		let newArray: any[] = []
		for (let i = 0; i < maxIndex; i++) {
			if (arrayToUpdate[i]) {
				newArray.push(arrayToUpdate[i])
			} else {
				switch (arrayToUpdate) {
					case memoArray:
						newArray.push({
							date: '',
							memo: ''
						})
						break
					case historyMemo:
						newArray.push({
							date: '',
							memo: ''
						})
						break
					case estimateArray:
						newArray.push({
							issueDate: '',
							dueDate: '',
							estimateWithoutTax: '',
							tax: '',
							products: [
								{
									productName: '',
									quantity: ''
								}
							]
						})

					default:
						break
				}
			}
		}

		return newArray
	}

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
		console.log(confirmationPageIsShown)

		if (confirmationPageIsShown) {
			isShown = true
			isSucceeded = true
		}
	}
</script>

<form class="form" action="POST" id="negociation" on:submit={handleSubmit}>
	<h3 class="form__header">商談情報</h3>

	<fieldset class="fieldset">
		<legend class="legend hidden">顧客選択</legend>

		<div class="form-row">
			<div class="input-wrapper">
				<label class="label" for="select-customer">顧客選択</label>
				<select
					class="select"
					name="select-customer"
					id="select-customer"
					bind:value={currentCustomerId}
				>
					<option value=" " selected disabled class="placeholder">未選択</option>
					{#each customers as customer}
						<option value={customer.custCD}>{customer.custName}</option>
					{/each}
				</select>
			</div>

			<button
				type="button"
				class="primary inline btn"
				on:click={() => window.open('/customers/new', '_blank')}>＋顧客追加</button
			>
			{#if currentCustomerId !== undefined}
				<button
					type="button"
					class="secondary inline btn"
					on:click={() => window.open('/customers/' + currentCustomerId, '_blank')}
					>顧客情報を確認</button
				>
			{/if}
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">商談ステータス</legend>
		<div class="form-row">
			<Select
				label={'ステータス'}
				name={'status'}
				options={['注文', '新規受注', '再問合せ', '見送り', '失注', '在庫無し']}
				bind:value={initialState.status}
			/>
		</div>
		<div class="form-row">
			<DateInput
				name={'negociation-start'}
				label={'商談開始日'}
				bind:value={initialState.startingDate}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'可能性'}
				name={'condition'}
				options={['A', 'B', 'C', 'M', 'MM']}
				bind:value={initialState.condition}
			/>

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
				bind:value={initialState.inflow}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'相見積もり'}
				name={'preference'}
				options={['新品・中古', '新品', '中古', '不明', '確認前', '無し']}
				bind:value={initialState.preference}
			/>
		</div>

		<div class="form-row">
			<DateInput name={'billing'} label={'納期'} bind:value={initialState.billingDate} />

			<CustomCheckbox value={'未確定'} />
		</div>

		<div class="form-row">
			<Input
				label={'入金予定'}
				placeholder={'未入力'}
				name={'scheduled-deposit'}
				bind:value={initialState.scheduledDeposit}
			/>
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
				bind:value={initialState.paymentMethod}
			/>
		</div>

		<div class="form-row">
			<DateInput label={'成否日'} name={'outcome'} bind:value={initialState.outcome} />

			<CustomCheckbox value={'未定'} />
		</div>

		<div class="form-row">
			<DateInput
				label={'次回連絡日時'}
				name={'next-contact'}
				bind:value={initialState.nextContact}
			/>

			<SelectDate name={'time'} label={'時'} />
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">納期先</legend>
		<div class="form-row">
			<Input
				name={'postal-code'}
				inputSize={'input--sm'}
				label={'納期先'}
				bind:value={initialState.postalCode}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'prefecture'}
				inputSize={'input--sm'}
				label={'都道府県'}
				bind:value={initialState.prefecture}
			/>
			<Input
				name={'city'}
				inputSize={'input--sm'}
				label={'市区町村'}
				bind:value={initialState.city}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'address1'}
				inputSize={'input--sm'}
				label={'住所１'}
				bind:value={initialState.address1}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'address2'}
				inputSize={'input--sm'}
				label={'住所２'}
				bind:value={initialState.address2}
			/>
		</div>
		<div class="form-row">
			<Input label={'距離'} name={'distance'} unit={'km'} bind:value={initialState.distanceKm} />
			<Input name={'duration'} unit={'時間'} bind:value={initialState.distanceTime} />
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden estimate">見積もり</legend>

		<div class="form-row">
			<div>
				<h3 class="label">見積もり金額</h3>
				<button type="button" class="btn primary" on:click={() => maxEstimateIndex++}
					>＋見積追加</button
				>
			</div>
			<div class="column">
				{#each estimateArray as estimate, index}
					<div class="container">
						<div class="form-row">
							<DateInput label={'発行日'} name={'issue-date'} bind:value={estimate.issueDate} />
						</div>
						<div class="form-row">
							<DateInput
								label={'見積期日'}
								name={'estimation-due-date'}
								bind:value={estimate.dueDate}
							/>
						</div>
						<div class="form-row">
							<Input
								label={'税抜価格'}
								name={'price-without-tax'}
								unit="円"
								bind:value={estimate.estimateWithoutTax}
							/>
							<Input label={'消費税'} name={'tax'} unit="円" bind:value={estimate.tax} />
						</div>

						{#each estimate.products as product}
							<div class="form-row">
								<Input label={'商品'} name={'product'} bind:value={product.productName} />
								<button type="button" class="btn primary">商品選択</button>
								<Input unit={'台'} name={'quantity'} bind:value={product.quantity} />
							</div>
						{/each}

						<div class="form-row">
							<button type="button" class="btn add primary" on:click={() => handleAddProduct(index)}
								>＋商品追加</button
							>
							<button
								type="button"
								class="btn primary delete"
								on:click={() => handleDeleteItemFromArray(index, maxEstimateIndex--, estimateArray)}
								>削除</button
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">重要メモ</legend>
		<div class="form-row">
			<h3 class="label">重要メモ</h3>
			<div class="column">
				{#each memoArray as memo, index}
					<div class="container">
						<div class="form-row">
							<DateInput name={'memo-date'} bind:value={memo.date} />
						</div>
						<div class="form-row">
							<textarea name={'important-memo'} id="important-memo" bind:value={memo.memo} />
						</div>
						<div class="form-row">
							<button
								type="button"
								class="btn primary delete"
								on:click={() => handleDeleteItemFromArray(index, maxMemoIndex--, memoArray)}
								>削除</button
							>
						</div>
					</div>
				{/each}

				<button type="button" class="btn primary" on:click={() => maxMemoIndex++}>＋新規追加</button
				>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">コミュニケーション</legend>
		<div class="form-row">
			<Input
				name={'representative'}
				placeholder={'未入力'}
				label={'自社担当者'}
				bind:value={initialState.employeeInCharge}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'person-in-charge'}
				placeholder={'未入力'}
				label={'責任者'}
				bind:value={initialState.responsiblePerson}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'オカセイ便り'}
				name={'communication'}
				options={['新規依頼', '新規送付済み', '顧客登録済み']}
				bind:value={initialState.communication}
			/>

			<Select
				label={'DM発送'}
				name={'dm'}
				options={['不要', '要(未手配)', '郵送済み', '持参']}
				bind:value={initialState.directMessage}
			/>

			<Input name={'presentation-video'} label={'PR動画'} bind:value={initialState.videoUrl} />
		</div>
	</fieldset>

	<fieldset class=" fieldset checkboxes-container">
		<legend class="legend hidden">チェックボックス</legend>
		{#each videoCheckbox as element}
			<CustomCheckbox value={element.title} bind:isChecked={element.isChecked} />
		{/each}
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">コメント</legend>
		<div class="form-row">
			<div class="textarea-wrapper">
				<label class="label" for="bottleneck">ボトルネック確認</label>
				<textarea name="bottleneck" id="bottleneck" bind:value={initialState.checkBottleneck} />
			</div>
		</div>
		<div class="form-row">
			<div class="textarea-wrapper">
				<label class="label" for="chance">機会（チャンス）</label>
				<textarea name="chance" id="chance" bind:value={initialState.occasion} />
			</div>
		</div>
		<div class="form-row">
			<div class="textarea-wrapper">
				<label class="label" for="risk">脅威（リスク）</label>
				<textarea name="risk" id="risk" bind:value={initialState.risk} />
			</div>
		</div>
	</fieldset>
	<!-- </fieldset> -->

	<fieldset class="fieldset">
		<legend class="legend hidden">商談経緯</legend>
		<div class="fieldset__main">
			<div class="form-row">
				<div class="column">
					{#each historyMemo as memo, index}
						<div class="wrapper">
							<DateInput name={'history-day'} bind:value={memo.date} />
							<Input
								name={'history-memo'}
								placeholder={'未入力'}
								inputSize={'input--xl'}
								bind:value={memo.memo}
							/>
							<button
								type="button"
								class="primary btn delete"
								on:click={() => handleDeleteItemFromArray(index, maxHistoryIndex--, historyMemo)}
								>削除</button
							>
						</div>
					{/each}
				</div>
			</div>

			<div class="form-row">
				<button type="button" class="btn primary" on:click={() => maxHistoryIndex++}
					>＋新規追加</button
				>
			</div>
		</div>
	</fieldset>
</form>

<style lang="scss">
	.hidden {
		display: none;
	}
	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
	}

	.form {
		&__header {
			color: var(--primary);
			font-weight: 700;
			margin-bottom: 18px;
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
		width: fit-content;

		.form-row {
			justify-content: space-between;
			// flex-wrap: wrap;
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.checkbox-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		width: 100%;
		margin-bottom: 12px;
		gap: 18px;
		font-size: 18px;
		cursor: pointer;
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
			display: none;
		}

		.checkmark {
			display: flex;
			align-items: center;
			justify-content: center;
			top: 0;
			left: 0;
			height: 20px;
			width: 20px;
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
			height: 0;
			width: 0;
			opacity: 0;
			cursor: pointer;

			&:checked ~ .checkmark {
				background-color: var(--primary);

				&:after {
					display: block;
				}
			}
		}
	}

	.btn {
		margin: 0;
		align-self: flex-start;
		padding: 0;
		padding-top: 0;
		padding-bottom: 0;
		height: 32px;

		&.delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			height: 32px;
			width: 70px;
			min-width: 0;
			margin-left: auto;
		}
	}

	.legend {
		color: var(--primary);
	}

	.fieldset {
		margin-bottom: 20px;
	}

	.textarea-wrapper {
		display: flex;
		width: 100%;

		.label {
			width: 190px;
		}
	}

	.wrapper {
		padding: 16px 26px;
		border-radius: 8px;
		// width: calc(100% - 52px);
		display: flex;
		justify-content: space-between;
		gap: 18px;
		flex-wrap: wrap;
		background-color: #f4f4f4;
		// margin-bottom: 20px;
	}

	// .container--vertical {
	// 	gap: 20px;
	// }

	.input-wrapper {
		display: flex;
		gap: 12px;

		&:first-child {
			.label {
				width: 130px;
			}
		}
	}
	.select {
		height: 31px;

		&:focus {
			border-color: var(--primary-color);
		}

		&:required:invalid {
			color: #969696;
		}

		option[value=''][disabled] {
			display: none;
		}
	}

	.btn {
		margin: 0;
	}
</style>
