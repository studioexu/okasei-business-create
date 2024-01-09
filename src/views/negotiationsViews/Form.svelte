<script lang="ts">
	import Input from '@/components/Input.svelte'
	import Select from '@/components/Select.svelte'
	import InputCheckbox from '@/components/InputCheckbox.svelte'
	import InputDate from '@/components/InputDate.svelte'
	import InputNumber from '@/components/InputNumber.svelte'
	import InputAddress from '@/components/InputAddress.svelte'
	import InputSelect from '@/components/InputSelect.svelte'
	import InputTextNumber from '@/components/InputTextNumber.svelte'
	import InputName from '@/components/InputName.svelte'
	import InputFreeText from '@/components/InputFreeText.svelte'
	import InputEstimate from '@/components/InputEstimate.svelte'

	import type { CustomerFactory } from '@/Factories/CustomerFactory'
	import type {
		Communication,
		Condition,
		Dm,
		Inflow,
		Memo,
		NegotiationEntries,
		NegotiationErrors,
		OutcomeHistory,
		Preference,
		Status
	} from '@/libs/negotiationTypes'

	import { negotiations } from '@/stores/negotiations'
	import { NegotiationBackend, type Estimate } from '@/libs/negotiationTypes'
	import { prefectures } from '@/data/data'
	import ButtonDelete from '@/components/ButtonDelete.svelte'
	import { debounce, toNumber } from '@/libs/utils'
	import type { Negotiation } from '@/models/Negotiation'

	export let initialState: NegotiationEntries
	export let customers: CustomerFactory[]
	export let isSucceeded: boolean
	export let isShown: boolean
	export let confirmationPageIsShown: boolean
	export let formType: string
	export let currentCustomerId: number
	// export let formIsValid: NegotiationErrors

	let currentCustomer: CustomerFactory | undefined

	const currentDate = new Date().toLocaleDateString().split('/').join('-')

	const customersOptions: { value: number; text: string }[] = customers.map(customer => ({
		value: customer.id,
		text: customer.custName
	}))

	const textareaFieldsets: { id: keyof NegotiationEntries; label: string }[] = [
		{
			id: 'bottleneck',
			label: 'ボトルネック確認'
		},
		{
			id: 'occasion',
			label: '機会（チャンス）'
		},
		{
			id: 'risk',
			label: '脅威（リスク）'
		}
	]

	$: currentCustomer = customers.filter(customer => {
		if (customer.id === currentCustomerId) {
			return customer
		}
	})

	////// INITIATE ARRAYS: ESTIMATE, MEMO, HISTORY

	$: initialState.estimate =
		initialState.estimate.length === 0
			? [
					...initialState.estimate,
					{
						issueDate: '',
						dueDate: '',
						estimateWithoutTax: 0,
						withTax: false,
						estimateTax: 0,
						items: [
							{
								name: '',
								quantity: 0,
								price: 0
							}
						]
					}
			  ]
			: initialState.estimate
	$: initialState.outcomeHistory =
		initialState.outcomeHistory.length === 0
			? [...initialState.outcomeHistory, { date: '', memo: '' }]
			: initialState.outcomeHistory
	$: initialState.memo =
		initialState.memo.length === 0
			? [...initialState.memo, { date: currentDate, memo: '' }]
			: initialState.memo

	//// REMOVE OR ADD ELEMENT IN ESTIMATE / MEMO / OUTCOMEHISTORY ARRAYS

	$: console.log(initialState)

	/**
	 * Remove one object from the corresponding array.
	 * @param index: index of the object in the array
	 * @param arrayToUpdate: the array we want to update
	 */
	const handleDeleteItemFromArray = (
		index: number,
		arrayToUpdate: (Memo | OutcomeHistory | Estimate)[],
		type: string
	) => {
		let updatedArray = arrayToUpdate.filter(item => arrayToUpdate.indexOf(item) !== index)
		updateArray(updatedArray, type)
	}

	/**
	 * We add an item in the array.
	 * @param arrayToUpdate: the array where we want to add an item
	 * @param arrayType: the type of the array.
	 */
	const addItemToArray = (
		arrayToUpdate: (Memo | OutcomeHistory | Estimate)[],
		arrayType: string
	): void => {
		let newObject: Memo | OutcomeHistory | Estimate | null = null

		switch (arrayType) {
			case 'memo':
				newObject = {
					date: currentDate,
					memo: ''
				}
				break
			case 'outcomeHistory':
				newObject = {
					date: '',
					memo: ''
				}
				break
			case 'estimate':
				newObject = {
					issueDate: '',
					dueDate: '',
					estimateWithoutTax: 0,
					withTax: false,
					estimateTax: 0,
					items: [
						{
							name: '',
							quantity: 0,
							price: 0
						}
					]
				}
			default:
				null
				break
		}

		if (newObject !== null) arrayToUpdate = [...arrayToUpdate, newObject]

		updateArray(arrayToUpdate, arrayType)
	}

	const updateArray = (array: (Memo | OutcomeHistory | Estimate)[], type: string) => {
		switch (type) {
			case 'memo':
				initialState.memo = array as Memo[]
				break
			case 'outcomeHistory':
				initialState.outcomeHistory = array as OutcomeHistory[]
				break
			case 'estimate':
				initialState.estimate = array as Estimate[]
			default:
				break
		}
	}

	/**
	 * When the user click on the button, it will auto fill the billing address with the customer's address.
	 *
	 */
	const handleAutoFill = (): void => {
		if (currentCustomer !== undefined) {
			const address = currentCustomer[0].address

			Object.keys(address).map(key => {
				initialState[
					key as keyof {
						postalCode: string
						prefecture: string
						city: string
						address1: string
						address2: string
					}
				] = address[key]
			})
		}
	}

	const getTotalBeds = (): number => {
		let total = 0

		initialState.estimate.map((estimate: Estimate) => {
			estimate.items.map(item => {
				const itemQuantity = isNaN(item.quantity) ? 0 : item.quantity
				total += itemQuantity
			})
		})

		return total
	}

	////// FORM SUBMIT

	/**
	 * Triggered when the form is submit.
	 * If the form is still on the entry page, then, it will preventDefault, and displayed the entry verification page.
	 * If the user is in the entry verification page, then, we submit the form.
	 * @param e
	 */
	const handleSubmit = (e: any): void => {
		// e.preventDefault()

		if (confirmationPageIsShown) {
			isShown = true
			isSucceeded = true

			initialState.numberOfBeds = getTotalBeds()

			if (formType === 'create') {
				console.log('prout')

				try {
					const formData = new FormData()

					let customer = customers.find(customer => customer.id === currentCustomerId)
					initialState.customerName = customer?.custName
					negotiations.set([...$negotiations, new NegotiationBackend(initialState)])

					isShown = true
					isSucceeded = true
				} catch (error) {
					isShown = true
					isSucceeded = false
				}
			}

			if (formType === 'update') {
				let newArray = $negotiations.map(negotiation => {
					if (negotiation.negotiationId === initialState.negotiationId) {
						return new NegotiationBackend(initialState)
					} else {
						return negotiation
					}
				})
				negotiations.set(newArray)
			}
		}
	}

	const onSubmit = debounce(async (event: Event) => {
		event.preventDefault()

		try {
			const formData = new FormData()

			for (const key in initialState)
				formData.append(key, <string>initialState[key as keyof NegotiationEntries])

			// const localNegotiation: NegotiationBackend = {
			// 	negotiationId: 0,
			// 	custCd: 0,
			// 	customerName: '',
			// 	status: <Status>'',
			// 	startingDate: '',
			// 	condition: <Condition>'',
			// 	inflow: <Inflow>'',
			// 	preference: <Preference>'',
			// 	billingDate: '',
			// 	scheduledDeposit: '',
			// 	outcome: '',
			// 	nextContactDate: '',
			// 	nextContactTime: '',
			// 	lastContact: '',
			// 	postalCode: '',
			// 	prefecture: '',
			// 	city: '',
			// 	address1: '',
			// 	address2: '',
			// 	distanceKm: 0,
			// 	distanceTime: 0,
			// 	estimate: [],
			// 	memo: [],
			// 	personInCharge: '',
			// 	responsiblePerson: '',
			// 	communication: <Communication>'',
			// 	dm: <Dm>'',
			// 	video: '',
			// 	checkboxes: [
			// 		{ title: '動画視聴　依頼', isChecked: false },
			// 		{ title: '動画視聴　確認', isChecked: false },
			// 		{ title: '新品　購入経験', isChecked: false },
			// 		{ title: '増台提案', isChecked: false },
			// 		{ title: '値上げ：全世界の値上げ傾向。物流・保管・電気等の徹底', isChecked: false },
			// 		{
			// 			title: '傷、色あせ：中古商材の為、多少の傷や色あせ有り。洗浄・メンテの徹底',
			// 			isChecked: false
			// 		},
			// 		{ title: '商品確保：中古商材の為、購入契約者優先の商品確保', isChecked: false },
			// 		{ title: '締め支払い：契約書締結による締め支払い', isChecked: false },
			// 		{ title: '前払い（特別値引き）の説明', isChecked: false },
			// 		{ title: '中古　購入経験', isChecked: false }
			// 	],
			// 	bottleneck: '',
			// 	occasion: '',
			// 	risk: '',
			// 	outcomeHistory: [],
			// 	numberOfBeds: 0,
			// 	billingEstimation: 0
			// }

			const localNegotiation = new NegotiationBackend(initialState)

			// for (let key in localNegotiation) {
			// 	key = <keyof NegotiationEntries>key

			// 	if (localNegotiation.hasOwnProperty(key)) {
			// 		switch (key) {
			// 			case 'checkboxes':
			// 			case 'estimate':
			// 			case 'memo':
			// 			case 'outcomeHistory':
			// 				localNegotiation[key] = initialState[key].map(el => el)
			// 				break

			// 			case 'status':
			// 				localNegotiation[key] = <Status>initialState[key]
			// 				break
			// 			case 'condition':
			// 				localNegotiation[key] = <Condition>initialState[key]
			// 				break
			// 			case 'inflow':
			// 				localNegotiation[key] = <Inflow>initialState[key]
			// 				break
			// 			case 'communication':
			// 				localNegotiation[key] = <Communication>initialState[key]
			// 				break
			// 			case 'dm':
			// 				localNegotiation[key] = <Dm>initialState[key]
			// 				break
			// 			case 'negotiationId':
			// 			case 'custCd':
			// 			case 'distanceKm':
			// 			case 'distanceTime':
			// 				localNegotiation[key] = initialState[key]
			// 				break

			// 			case 'customerName':
			// 			case 'startingDate':
			// 			case 'billingDate':
			// 			case 'scheduledDeposit':
			// 			case 'outcome':
			// 			case 'nextContactDate':
			// 			case 'nextContactTime':
			// 			case 'lastContact':
			// 			case 'postalCode':
			// 			case 'prefecture':
			// 			case 'city':
			// 			case 'address1':
			// 			case 'address2':
			// 			case 'personInCharge':
			// 			case 'responsiblePerson':
			// 			case 'video':
			// 			case 'bottleneck':
			// 			case 'occasion':
			// 			case 'risk':
			// 				localNegotiation[key] = initialState[key]
			// 				break
			// 		}
			// 	}
			// }

			negotiations.set([...$negotiations, localNegotiation])
			isShown = true
			isSucceeded = true
		} catch (error) {
			isShown = true
			isSucceeded = false
		}
	}, 200)
</script>

<form
	method="POST"
	class="form {confirmationPageIsShown && 'hidden'}"
	action="/negotiations"
	id="negotiation-form"
	on:submit|preventDefault={handleSubmit}
>
	<h3 class="form__header">商談情報</h3>

	<fieldset class="fieldset">
		<legend class="legend hidden">顧客選択</legend>

		<div class="form-row">
			<Select
				label={'顧客選択'}
				name={'select-customer'}
				options={customersOptions}
				required={true}
				bind:value={currentCustomerId}
			/>

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
				>
					顧客情報を確認
				</button>
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
				required={true}
				bind:value={initialState.status}
			/>
		</div>
		<div class="form-row">
			<InputDate
				label={'商談開始日'}
				name={'negotiation-start'}
				required={true}
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
			<InputDate label={'納期'} name={'billing-date'} bind:value={initialState.billingDate} />
		</div>

		<div class="form-row">
			<InputFreeText
				label={'入金予定'}
				placeholder={'前払い'}
				name={'scheduled-deposit'}
				bind:value={initialState.scheduledDeposit}
			/>
		</div>

		<div class="form-row">
			<InputDate label={'成否日'} name={'outcome'} bind:value={initialState.outcome} />
		</div>

		<div class="form-row">
			<InputDate
				label={'次回連絡日時'}
				name={'next-contact'}
				bind:value={initialState.nextContactDate}
			/>

			<div class="input-wrapper">
				<input
					class="input"
					type="time"
					id="next-contact-time"
					bind:value={initialState.nextContactTime}
				/>
			</div>
		</div>

		<div class="form-row">
			<InputDate label={'最終連絡'} name={'last-contact'} bind:value={initialState.lastContact} />
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">納期先</legend>
		<div class="form-row">
			<InputTextNumber
				name={'postal-code'}
				label={'納期先'}
				placeholder={'0000000'}
				bind:value={initialState.postalCode}
			/>

			<button type="button" class="btn primary inline" on:click={handleAutoFill}>
				顧客情報コピー
			</button>
		</div>
		<div class="form-row">
			<InputSelect
				name={'prefecture'}
				label={'都道府県'}
				list={prefectures}
				placeholder={'〇〇県'}
				bind:value={initialState.prefecture}
			/>
			<InputAddress name={'city'} label={'市区町村'} bind:value={initialState.city} />
		</div>
		<div class="form-row">
			<InputAddress name={'address1'} label={'住所１'} bind:value={initialState.address1} />
		</div>
		<div class="form-row">
			<InputAddress name={'address2'} label={'住所２'} bind:value={initialState.address2} />
		</div>
		<div class="form-row">
			<InputNumber
				label={'距離'}
				name={'distance'}
				unit={'km'}
				bind:value={initialState.distanceKm}
			/>
			<InputNumber name={'duration'} unit={'時間'} bind:value={initialState.distanceTime} />
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden estimate">見積もり</legend>

		<div class="form-row">
			<h3 class="label">見積もり金額</h3>
			<div class="container container--column">
				{#each initialState.estimate as estimate, index}
					<InputEstimate
						{index}
						bind:initialState
						bind:estimate
						on:deleteEstimate={() =>
							handleDeleteItemFromArray(index, initialState.estimate, 'estimate')}
					/>
				{/each}
			</div>
		</div>

		<div class="form-row">
			<div class="input-wrapper">
				<span class="label" />
				<button
					type="button"
					class="btn primary"
					on:click={() => addItemToArray(initialState.estimate, 'estimate')}
				>
					＋見積追加
				</button>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">重要メモ</legend>
		<div class="form-row">
			<h3 class="label">重要メモ</h3>
			<div class="container container--column">
				{#each initialState.memo as memo, index}
					<div class="wrapper">
						<div class="form-row">
							<InputDate name={'memo-date'} bind:value={memo.date} />
						</div>
						<div class="form-row">
							<textarea name={'important-memo'} id="important-memo" bind:value={memo.memo} />
						</div>
						{#if initialState.memo.length > 1}
							<div class="form-row">
								<ButtonDelete
									on:delete={() => handleDeleteItemFromArray(index, initialState.memo, 'memo')}
								/>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<div class="form-row">
			<div class="input-wrapper">
				<span class="label" />
				<button
					type="button"
					class="btn primary"
					on:click={() => addItemToArray(initialState.memo, 'memo')}
				>
					＋新規追加
				</button>
			</div>
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">コミュニケーション</legend>
		<div class="form-row">
			<InputName
				name={'person-in-charge'}
				label={'自社担当者'}
				bind:value={initialState.personInCharge}
			/>
		</div>
		<div class="form-row">
			<InputName
				name={'responsible-person'}
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

			<Input
				name={'presentation-video'}
				label={'PR動画'}
				placeholder={'未入力'}
				bind:value={initialState.video}
			/>
		</div>
	</fieldset>

	<fieldset class=" fieldset">
		<legend class="legend hidden">チェックボックス</legend>
		<div class="container container--column">
			{#each initialState.checkboxes as element}
				<InputCheckbox
					name={element.title}
					label={element.title}
					bind:isChecked={element.isChecked}
				/>
			{/each}
		</div>
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend hidden">コメント</legend>

		{#each textareaFieldsets as fieldset}
			<div class="form-row">
				<div class="textarea-wrapper">
					<label class="label" for={fieldset.id}>{fieldset.label}</label>
					<textarea name={fieldset.id} id={fieldset.id} bind:value={initialState[fieldset.id]} />
				</div>
			</div>
		{/each}
	</fieldset>

	<fieldset class="fieldset">
		<legend class="legend">商談経緯</legend>
		<div class="fieldset__main">
			<div class="form-row">
				<div class="container container--column">
					{#each initialState.outcomeHistory as memo, index}
						<div class="wrapper">
							<div class="form-row">
								<InputDate name={'history-date'} bind:value={memo.date} />

								<InputFreeText
									name={'history-memo'}
									placeholder={'未入力'}
									bind:value={memo.memo}
								/>

								{#if initialState.outcomeHistory.length > 1}
									<ButtonDelete
										on:delete={() =>
											handleDeleteItemFromArray(
												index,
												initialState.outcomeHistory,
												'outcomeHistory'
											)}
									/>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="form-row">
				<button
					type="button"
					class="btn primary"
					on:click={() => addItemToArray(initialState.outcomeHistory, 'outcomeHistory')}
				>
					＋新規追加
				</button>
			</div>
		</div>
	</fieldset>
</form>

<style lang="scss">
	.form {
		&__header {
			color: var(--primary);
			font-weight: 700;
			margin-bottom: 18px;
		}
	}

	.hidden {
		display: none;
	}

	:global(.form-row) {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
		flex-wrap: wrap;
	}

	:global(.form-row:last-child()) {
		margin-bottom: 0;
	}

	.fieldset {
		margin-bottom: 20px;
	}

	.display {
		width: 105px;
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
			height: 31px;
			width: 31px;
			min-width: 0;
			margin-left: auto;

			cursor: pointer;
			background-color: transparent;
			margin: auto;

			&:hover {
				opacity: 0.5;
			}

			> :global(.svg-icon) {
				height: 18px * 1.2;
			}
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
	}

	.wrapper {
		padding: 18px 21px;
		border-radius: 8px;
		gap: 18px;
		background-color: #f4f4f4;

		.form-row:last-child {
			margin-bottom: 0;
		}

		textarea {
			resize: none;
			min-width: 30vw;
			width: 100%;
			height: calc(100px - 24px);
			border-radius: 8px;
			padding: 12px;
			outline: none;
		}
	}

	.textarea-wrapper {
		display: flex;
		width: 100%;

		.label {
			width: 190px;
		}

		textarea {
			resize: none;
			min-width: 30vw;
			width: 100%;
			height: calc(100px - 24px);
			border-radius: 8px;
			padding: 12px;
			outline: none;
		}
	}

	.container {
		display: flex;
		gap: 18px;
		flex-grow: 1;

		&--column {
			flex-direction: column;
		}
	}

	:global(.input-wrapper .label) {
		min-width: 80px;
	}

	:global(.form-row > .label) {
		width: 130px;
	}

	:global(.fieldset > .form-row > .input-wrapper:first-child .label) {
		width: 130px;
	}

	:global(.required-mark) {
		color: var(--error);
	}

	.input-wrapper {
		.label {
			font-size: 18px;
			font-weight: 400;
		}

		.input {
			height: 31px;
		}

		&:first-child {
			display: flex;
			gap: 10px;
			.label {
				display: block;
				height: 31px;
				min-width: 130px;
			}
		}
	}
</style>
