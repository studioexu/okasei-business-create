<script lang="ts">
	import Select from '../../Components/Select.svelte'
	import Input from '../../Components/Input.svelte'
	import DateInput from '../../Components/DateInput.svelte'
	import Checkbox from '../../Components/Checkbox.svelte'

	export let initialState2: any
	export let updateIndexArray: Function

	$: console.log(initialState2.estimate)

	let productIndexArray: string[] = []
	let maxProductIndex = 1
	let estimateIndexArray: {
		index: string
		productIndexArray: string[]
		maxProductIndex: number
	}[] = []
	let maxEstimateIndex = 1

	let memoIndexArray: string[] = []
	let maxMemoIndex = 1

	$: memoIndexArray = updateIndexArray(maxMemoIndex)
	$: productIndexArray = updateIndexArray(maxProductIndex)
	$: estimateIndexArray = updateEstimateIndexArray(maxEstimateIndex)

	let estimateArray = [
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

	$: estimateArray = updateEstimateIndexArray(maxEstimateIndex)

	$: initialState2.estimate = estimateArray

	$: console.log(estimateArray)

	const videoCheckbox = [
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

	const updateEstimateIndexArray = (maxIndex: number) => {
		let array = []
		for (let i = 0; i < maxIndex; i++) {
			if (estimateArray[i]) {
				array.push(estimateArray[i])
			} else {
				array.push({
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
			}
		}
		return array
	}

	const handleDeleteEstimate = (index: number) => {
		const newEstimateArray = estimateArray.slice(0, index).concat(estimateArray.slice(index + 1))
		maxEstimateIndex--

		estimateArray = newEstimateArray
	}

	const handleAddProduct = (index: number) => {
		const productArray = estimateArray[index].products
		productArray.push({
			productName: '',
			quantity: ''
		})
		estimateArray[index].products = productArray
	}
</script>

<fieldset class="fieldset">
	<legend class="fieldset__header">商談情報</legend>
	<div class="fieldset__main">
		<div class="form-row">
			<Select
				label={'ステータス'}
				name={'status'}
				options={['注文', '新規受注', '再問合せ', '見送り', '失注', '在庫無し']}
				bind:value={initialState2.status}
			/>
		</div>
		<div class="form-row">
			<DateInput
				name={'negociation-start'}
				label={'商談開始日'}
				bind:value={initialState2.startingDate}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'可能性'}
				name={'condition'}
				options={['A', 'B', 'C', 'M', 'MM']}
				bind:value={initialState2.condition}
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
				bind:value={initialState2.inflow}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'相見積もり'}
				name={'preference'}
				options={['新品・中古', '新品', '中古', '不明', '確認前', '無し']}
				bind:value={initialState2.preference}
			/>
		</div>

		<div class="form-row">
			<DateInput name={'billing'} label={'納期'} bind:value={initialState2.billingDate} />

			<label for="not-confirmed">
				<input type="checkbox" name="not-confirmed" id="not-confirmed" />
				未確定
			</label>
		</div>

		<div class="form-row">
			<Input
				label={'入金予定'}
				placeholder={'未入力'}
				name={'scheduled-deposit'}
				bind:value={initialState2.scheduledDeposit}
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
				bind:value={initialState2.paymentMethod}
			/>
		</div>

		<div class="form-row">
			<DateInput label={'成否日'} name={'outcome'} bind:value={initialState2.outcome} />

			<label for="not-confirmed">
				<input type="checkbox" name="not-confirmed" id="not-confirmed" />
				未定
			</label>
		</div>

		<div class="form-row">
			<DateInput
				label={'次回連絡日時'}
				name={'next-contact'}
				bind:value={initialState2.nextContact}
			/>

			<Select name={'time'} type={'time'} label={'時'} />
		</div>

		<div class="form-row">
			<Input
				name={'postal-code'}
				inputSize={'input--sm'}
				label={'納期先'}
				bind:value={initialState2.postalCode}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'prefecture'}
				inputSize={'input--sm'}
				label={'都道府県'}
				bind:value={initialState2.prefecture}
			/>
			<Input
				name={'city'}
				inputSize={'input--sm'}
				label={'市区町村'}
				bind:value={initialState2.city}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'address1'}
				inputSize={'input--sm'}
				label={'住所１'}
				bind:value={initialState2.address1}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'address2'}
				inputSize={'input--sm'}
				label={'住所２'}
				bind:value={initialState2.address2}
			/>
		</div>
		<div class="form-row">
			<Input label={'距離'} name={'distance'} unit={'km'} bind:value={initialState2.distanceKm} />
			<Input name={'duration'} unit={'時間'} bind:value={initialState2.distanceTime} />
		</div>

		<!-- estimation section -->
		<div class="form-row">
			<div>
				<h3 class="label">見積もり金額</h3>
				<button class="btn primary" on:click={() => maxEstimateIndex++}>＋見積追加</button>
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
								<button class="btn primary">商品選択</button>
								<Input unit={'台'} name={'quantity'} bind:value={product.quantity} />
							</div>
						{/each}

						<div class="form-row">
							<button class="btn add primary" on:click={() => handleAddProduct(index)}
								>＋商品追加</button
							>
							<button class="btn primary delete" on:click={() => handleDeleteEstimate(index)}
								>削除</button
							>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- important memo seciton  -->

		<div class="form-row">
			<h3 class="label">重要メモ</h3>
			<div class="column">
				{#each memoIndexArray as index}
					<div class="container">
						<div class="form-row">
							<DateInput name={'memo-date'} />
						</div>
						<div class="form-row">
							<textarea name={'important-memo'} id="important-memo" />
						</div>
						<div class="form-row">
							<button class="btn primary delete">削除</button>
						</div>
					</div>
				{/each}

				<button class="btn primary" on:click={() => maxMemoIndex++}>＋新規追加</button>
			</div>
		</div>

		<div class="form-row">
			<Input
				name={'representative'}
				placeholder={'未入力'}
				label={'自社担当者'}
				bind:value={initialState2.employeeInCharge}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'person-in-charge'}
				placeholder={'未入力'}
				label={'責任者'}
				bind:value={initialState2.responsiblePerson}
			/>
		</div>

		<div class="form-row">
			<Select
				label={'オカセイ便り'}
				name={'communication'}
				options={['新規依頼', '新規送付済み', '顧客登録済み']}
				bind:value={initialState2.communication}
			/>

			<Select
				label={'DM発送'}
				name={'dm'}
				options={['不要', '要(未手配)', '郵送済み', '持参']}
				bind:value={initialState2.directMessage}
			/>

			<Input name={'presentation-video'} label={'PR動画'} bind:value={initialState2.videoUrl} />
		</div>

		<div class="checkboxes-container">
			{#each videoCheckbox as element}
				<Checkbox value={element.title} bind:isChecked={element.isChecked} />
			{/each}
		</div>

		<div class="form-row">
			<label class="label" for="bottleneck">ボトルネック確認</label>
			<textarea name="bottleneck" id="bottleneck" value={initialState2.checkBottleneck} />
		</div>
		<div class="form-row">
			<label class="label" for="chance">機会（チャンス）</label>
			<textarea name="chance" id="chance" value={initialState2.occasion} />
		</div>
		<div class="form-row">
			<label class="label" for="risk">脅威（リスク）</label>
			<textarea name="risk" id="risk" value={initialState2.risk} />
		</div>
	</div>
</fieldset>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
	}

	.fieldset {
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
		width: 100%;

		.form-row {
			justify-content: space-between;
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
		// width: 100%;
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
</style>
