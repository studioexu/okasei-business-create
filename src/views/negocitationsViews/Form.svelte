<script lang="ts">
	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import SelectDate from '@/components/SelectDate.svelte'
	import DateInput from '@/components/DateInput.svelte'
	import CustomCheckbox from '@/components/CustomCheckbox.svelte'
	import type { CustomerFactory } from '@/Factories/CustomerFactory'
	import { negociations } from '@/stores/negociations'
	import { NegociationBackend, type Estimate } from '@/libs/negociationTypes'
	import Icon from '@/components/Icon.svelte'
	import type { Item, Memo, OutcomeHistory } from '@/libs/negociationTypes'
	import SelectWithInput from '@/components/SelectWithInput.svelte'
	import DatePicker from '@/components/DatePicker.svelte'

	export let initialState: any
	export let customers: CustomerFactory[]
	export let isSucceeded: boolean
	export let isShown: boolean
	export let confirmationPageIsShown: boolean
	export let formType: string
	export let currentCustomerId: number

	let currentCustomer: CustomerFactory | undefined

	$: console.log(initialState)

	const tax = 0.1

	const products = [
		{
			id: 1,
			name: 'item A',
			price: '10000'
		},
		{
			id: 2,
			name: 'item B',
			price: '15000'
		},
		{
			id: 3,
			name: 'item C',
			price: '20000'
		}
	]

	$: currentCustomer = customers.filter(customer => {
		if (customer.custCD === currentCustomerId) {
			return customer
		}
	})

	let maxEstimateIndex = initialState.estimate.length > 1 ? initialState.estimate.length : 1
	let maxMemoIndex = initialState.memo.length > 1 ? initialState.memo.length : 1
	let maxHistoryIndex =
		initialState.outcomeHistory.length > 1 ? initialState.outcomeHistory.length : 1

	/**
	 * calculate the total of the estimates
	 */
	const calculateEstimateTotal = (): string => {
		let estimateTotal = 0
		initialState.estimate.map((estimate: Estimate) => {
			estimateTotal += parseInt(estimate.estimateWithoutTax)
		})

		return estimateTotal.toString()
	}

	$: initialState.billingEstimation = calculateEstimateTotal().toString()
	$: initialState.estimate = updateArray(maxEstimateIndex, initialState.estimate, 'estimate')
	$: initialState.outcomeHistory = updateArray(
		maxHistoryIndex,
		initialState.outcomeHistory,
		'historyMemo'
	)
	$: initialState.memo = updateArray(maxMemoIndex, initialState.memo, 'memo')
	$: maxHistoryIndex

	/**
	 * Add an item to the items array in a specific estimate object
	 * @param index: corresponding to the index of the right estimate object.
	 */
	const addItem = (index: number): void => {
		const productArray = initialState.estimate[index].items
		productArray.push({
			productName: '',
			quantity: ''
		})
		initialState.estimate[index].items = productArray
	}

	/**
	 * Remove an item in the items array of one estimate array.
	 * @param index:corresponding to the index of the right estimate object we want to remove an item.
	 * @param itemIndex: index of the item we want to remove.
	 */
	const removeItem = (index: number, itemIndex: number): void => {
		const newItemArray = initialState.estimate[index].items.filter(
			(item: Item) => initialState.estimate[index].items[itemIndex] !== item && item
		)
		initialState.estimate[index].items = newItemArray
	}

	/**
	 * Remove one object from the corresponding array.
	 * @param index: index of the object in the array
	 * @param maxIndex: number of items in the array
	 * @param arrayToUpdate: the array we want to update
	 */
	const handleDeleteItemFromArray = (
		index: number,
		maxIndex: number,
		arrayToUpdate: Memo[] | OutcomeHistory[] | Estimate[]
	): void => {
		const newArray = arrayToUpdate.slice(0, index).concat(arrayToUpdate.slice(index + 1))

		for (let i = 0; i < newArray.length; i++) {
			arrayToUpdate[i] = newArray[i]
		}

		maxIndex--
	}

	/**
	 * We add an item in the array.
	 * @param maxIndex: number of items in the array
	 * @param arrayToUpdate: the array where we want to add an item
	 * @param arrayType: the type of the array.
	 */
	const updateArray = (
		maxIndex: number,
		arrayToUpdate: Memo[] | OutcomeHistory[] | Estimate[],
		arrayType: string
	): Memo[] | OutcomeHistory[] | Estimate[] => {
		let newArray: any[] = []
		for (let i = 0; i < maxIndex; i++) {
			if (arrayToUpdate[i]) {
				newArray.push(arrayToUpdate[i])
			} else {
				switch (arrayType) {
					case 'memo':
						newArray.push({
							date: '',
							memo: ''
						})
						break
					case 'historyMemo':
						newArray.push({
							date: '',
							memo: ''
						})
						break
					case 'estimate':
						newArray.push({
							issueDate: '',
							dueDate: '',
							estimateWithoutTax: '',
							tax: '',
							items: [
								{
									name: '',
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

	const getTotalBeds = () => {
		let total = 0

		initialState.estimate.map((estimate: Estimate) => {
			estimate.items.map(item => {
				total += parseInt(item.quantity)
			})
		})

		return total.toString() + '台'
	}

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
		e.preventDefault()

		if (confirmationPageIsShown) {
			isShown = true
			isSucceeded = true

			initialState.numberOfBeds = getTotalBeds()
			initialState.billingEstimation = calculateEstimateTotal()

			if (formType === 'create') {
				let customer = customers.find(customer => customer.custCD === currentCustomerId)
				initialState.customerName = customer?.custName
				negociations.set([...$negociations, new NegociationBackend(initialState)])
			}

			if (formType === 'update') {
				let newArray = $negociations.map(negociation => {
					if (negociation.negociationId === initialState.negociationId) {
						return new NegociationBackend(initialState)
					} else {
						return negociation
					}
				})
				negociations.set(newArray)
			}
		}
	}

	const hours: string[] = ['']

	for (let i = 1; i <= 24; i++) {
		hours.push(i.toString() + ':00')
	}

	/**
	 * When the user click on the button, it will auto fill the billing address with the customer's address.
	 *
	 */
	const handleAutoFill = (): void => {
		if (currentCustomer !== undefined) {
			initialState.postalCode = currentCustomer[0].address.postalCode
			initialState.prefecture = currentCustomer[0].address.prefecture
			initialState.city = currentCustomer[0].address.city
			initialState.address1 = currentCustomer[0].address.address1
			initialState.address2 = currentCustomer[0].address.address2
		}
	}

	/**
	 *
	 * @param isTaxIsAdded: boolean, check if the tax has to be added or not. 税金を追加するかどうかと確認する。
	 * @param estimateWithoutTax: number, corresponding to the amout of the estimate without the tax. 税抜の見積もりの金額である。
	 * @returns number: if we add the tax, we will return the round result of the multiplication between the estimate amount and the current tax amount.
	 */
	const getTaxAmount = (isTaxAdded: boolean, estimateWithoutTax: number): number => {
		if (isTaxAdded) {
			return Math.round(estimateWithoutTax * tax)
		} else {
			return 0
		}
	}

	/**
	 * update the estimate tax amount in the initialState when there are changes.
	 * @param index: corresponding to the index in the array of estimate.
	 */
	const handleInputInEstimate = (index: number): void => {
		let estimateAmount = isNaN(parseInt(initialState.estimate[index].estimateWithoutTax))
			? 0
			: parseInt(initialState.estimate[index].estimateWithoutTax)

		initialState.estimate[index].estimateTax = getTaxAmount(
			initialState.estimate[index].withTax,
			estimateAmount
		).toString()
	}

	const handleChooseItem = (estimateIndex: number, itemIndex: number) => {
		const item = initialState.estimate[estimateIndex].items[itemIndex]

		const correspondingItemInProducts = products.find(product => product.name === item.name)
		item.price = correspondingItemInProducts?.price
	}

	const getEstimate = (estimateIndex: number) => {
		console.log('hello')
		let estimate = 0
		// initialState.estimate[estimateIndex].estimateWithoutTax
		const items = initialState.estimate[estimateIndex].items

		items.map((item: any) => {
			estimate +=
				(isNaN(parseInt(item.price)) ? 0 : parseInt(item.price)) *
				(isNaN(parseInt(item.quantity)) ? 0 : parseInt(item.quantity))
		})
		initialState.estimate[estimateIndex].estimateWithoutTax = estimate
	}
</script>

<form
	class="form {confirmationPageIsShown && 'hidden'}"
	action="/negotiations"
	id="negociation-form"
	on:submit={handleSubmit}
>
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
			{#if currentCustomerId !== undefined && currentCustomerId !== 0}
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
				options={['受注', '新規受注', '再問合せ', '見送り', '失注', '在庫無し']}
				bind:value={initialState.status}
			/>
		</div>
		<div class="form-row">
			<!-- <DateInput
				name={'negociation-start'}
				label={'商談開始日'}
				bind:value={initialState.startingDate}
			/> -->

			<DatePicker
				label={'商談開始日'}
				name={'negotiation-start'}
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
			<DatePicker label={'納期'} name={'billing-date'} bind:value={initialState.billingDate} />

			<CustomCheckbox value={'未確定'} />
		</div>

		<div class="form-row">
			<Input
				label={'入金予定'}
				placeholder={'前払い'}
				name={'scheduled-deposit'}
				bind:value={initialState.scheduledDeposit}
			/>
		</div>

		<div class="form-row">
			<DatePicker label={'成否日'} name={'outcome'} bind:value={initialState.outcome} />

			<CustomCheckbox value={'未定'} />
		</div>

		<div class="form-row">
			<!-- <DateInput
				label={'次回連絡日時'}
				name={'next-contact'}
				bind:value={initialState.nextContactDate}
			/>

			<SelectDate
				name={'time'}
				label={'時'}
				options={hours}
				bind:value={initialState.nextContactTime}
			/> -->

			<!-- <DatePicker label={'次回連絡日時'} name={'next-contact'} bind:value={initialState.nextContactDate} /> -->

			<div class="input-wrapper">
				<label class="label" for="next-contact">次回連絡日時</label>
				<input type="datetime-local" id="next-contact" bind:value={initialState.nextContactDate} />
			</div>
		</div>

		<div class="form-row">
			<DatePicker label={'最終連絡'} name={'last-contact'} bind:value={initialState.lastContact} />
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

			<button type="button" class="btn primary inline" on:click={handleAutoFill}>
				顧客情報コピー
			</button>
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
				inputSize={'input--lg'}
				label={'住所１'}
				bind:value={initialState.address1}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'address2'}
				inputSize={'input--lg'}
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
			</div>
			<div class="column">
				{#each initialState.estimate as estimate, index}
					<div class="container" on:change={() => handleInputInEstimate(index)}>
						<div class="form-row">
							<DatePicker
								label={'発行日'}
								name={'issue-date'}
								bind:value={initialState.issueDate}
							/>
						</div>
						<div class="form-row">
							<DatePicker
								label={'見積期日'}
								name={'estimation-due-date'}
								bind:value={initialState.dueDate}
							/>
						</div>
						<div class="form-row">
							<Input
								label={'税抜価格'}
								name={'estimate-without-tax'}
								unit="円"
								inputSize={'input--md'}
								on:input={calculateEstimateTotal}
								bind:value={estimate.estimateWithoutTax}
							/>

							<Input
								label={'消費税'}
								name={'tax'}
								unit="円"
								inputSize={'input--md'}
								bind:value={estimate.estimateTax}
							/>

							<label class="checkbox-container" for="with-tax">
								<input
									class="checkbox"
									type="checkbox"
									id="with-tax"
									name="with-tax"
									bind:checked={estimate.withTax}
								/>
								税付き
								<span class="checkmark" />
							</label>
						</div>

						{#each estimate.items as item, indexItem}
							<div class="form-row" on:change={() => getEstimate(index)}>
								<div class="input-wrapper">
									<label class="label" for="product-list">商品</label>
									<input
										placeholder="商品を選択"
										list="product-list"
										bind:value={item.name}
										on:change={() => handleChooseItem(index, indexItem)}
									/>
									<datalist id="product-list" class="datalist">
										{#each products as product}
											<option class="option" value={product.name}>{product.name}</option>
										{/each}
									</datalist>
								</div>

								<Input unit={'円'} name={'price'} inputSize={'input--sm'} bind:value={item.price} />
								<!-- <button type="button" class="btn primary">商品選択</button> -->
								<Input
									unit={'台'}
									name={'quantity'}
									inputSize={'input--sm'}
									bind:value={item.quantity}
								/>
								{#if estimate.items.length > 1}
									<button
										type="button"
										class="btn secondary delete"
										on:click={() => removeItem(index, indexItem)}
									>
										<Icon icon={{ path: 'close-btn', color: '#2FA8E1' }} />
									</button>
								{/if}
							</div>
						{/each}

						<div class="form-row">
							<button type="button" class="btn add primary" on:click={() => addItem(index)}
								>＋商品追加</button
							>
							{#if maxEstimateIndex > 1}
								<button
									type="button"
									class="btn primary delete"
									on:click={() =>
										handleDeleteItemFromArray(index, maxEstimateIndex--, initialState.estimate)}
									>削除</button
								>
							{/if}
						</div>
					</div>
				{/each}

				<button type="button" class="btn primary" on:click={() => maxEstimateIndex++}>
					＋見積追加
				</button>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">重要メモ</legend>
		<div class="form-row">
			<h3 class="label">重要メモ</h3>
			<div class="column">
				{#each initialState.memo as memo, index}
					<div class="container">
						<div class="form-row">
							<DatePicker name={'memo-date'} bind:value={memo.date} />
						</div>
						<div class="form-row">
							<textarea name={'important-memo'} id="important-memo" bind:value={memo.memo} />
						</div>
						<div class="form-row">
							{#if maxMemoIndex > 1}
								<button
									type="button"
									class="btn primary delete"
									on:click={() =>
										handleDeleteItemFromArray(index, maxMemoIndex--, initialState.memo)}
									>削除</button
								>
							{/if}
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
				name={'person-in-charge'}
				placeholder={'未入力'}
				label={'自社担当者'}
				bind:value={initialState.personInCharge}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'responsible-person'}
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
				bind:value={initialState.dm}
			/>

			<Input name={'presentation-video'} label={'PR動画'} bind:value={initialState.videoUrl} />
		</div>
	</fieldset>

	<fieldset class=" fieldset checkboxes-container">
		<legend class="legend hidden">チェックボックス</legend>
		{#each initialState.checkboxes as element}
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

	<fieldset class="fieldset">
		<legend class="legend">商談経緯</legend>
		<div class="fieldset__main">
			<div class="form-row">
				<div class="column">
					{#each initialState.outcomeHistory as memo, index}
						<div class="wrapper">
							<DatePicker name={'history-date'} bind:value={memo.date} />

							<Input
								name={'history-memo'}
								placeholder={'未入力'}
								inputSize={'input--xl'}
								bind:value={memo.memo}
							/>
							{#if maxHistoryIndex > 1}
								<button
									type="button"
									class="primary btn delete"
									on:click={() =>
										handleDeleteItemFromArray(
											index,
											maxHistoryIndex--,
											initialState.outcomeHistory
										)}
								>
									削除
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="form-row">
				<button type="button" class="btn primary" on:click={() => maxHistoryIndex++}>
					＋新規追加
				</button>
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
		min-width: 30vw;
		width: calc(100% - 24px);
		height: calc(100px - 24px);
		border-radius: 8px;
		padding: 12px;
		outline: none;
	}

	.container {
		position: relative;
		background-color: #f4f4f4;
		padding: 18px 21px;
		border-radius: 8px;
		width: fit-content;

		.form-row {
			justify-content: space-between;
			flex-wrap: wrap;
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

	.btn {
		margin: 0;
		align-self: flex-start;
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
		display: flex;
		justify-content: space-between;
		gap: 18px;
		flex-wrap: wrap;
		background-color: #f4f4f4;
	}

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
			color: #c4c4c4;
		}

		option[value=''][disabled] {
			display: none;
		}
	}

	.btn {
		margin: 0;
	}

	.checkbox-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: row-reverse;
		align-items: center;
		height: 31px;
		gap: 12px;
		font-size: 18px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

		& :hover {
			.checkbox ~ .checkmark {
				background-color: #fff;
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
</style>
