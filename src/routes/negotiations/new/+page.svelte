<script lang="ts" context="module"></script>

<script lang="ts">
	import { goto } from '$app/navigation'

	import Form from '@/views/negotiationsViews/Form.svelte'
	import Confirmation from '@/views/negotiationsViews/Confirmation.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	import { CustomerFactory } from '@/Factories/CustomerFactory'
	import type { NegotiationEntries, NegotiationErrors } from '@/libs/negotiationTypes.js'
	import { negotiations } from '@/stores/negotiations.js'
	import { validationOnSubmit } from '@/libs/customerValidations.js'

	export let data

	let allCustomers: CustomerFactory[] = data.data.map(
		customer => new CustomerFactory(customer, 'newApi')
	)

	let confirmationPageIsShown = false
	let isSucceeded: boolean = false
	let isShown = false

	const goBack = () => {
		goto('/negotiations')
	}

	let initialState: NegotiationEntries = {
		negotiationId: 0,
		custCd: 0,
		customerName: '',
		status: '',
		startingDate: '',
		condition: '',
		inflow: '',
		preference: '',
		billingDate: '',
		scheduledDeposit: '',
		outcome: '',
		nextContactDate: '',
		nextContactTime: '',
		lastContact: '',
		postalCode: '',
		prefecture: '',
		city: '',
		address1: '',
		address2: '',
		distanceKm: 0,
		distanceTime: 0,
		estimate: [],
		memo: [],
		personInCharge: '',
		responsiblePerson: '',
		communication: '',
		dm: '',
		video: '',
		checkboxes: [
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
		],
		bottleneck: '',
		occasion: '',
		risk: '',
		outcomeHistory: [],
		numberOfBeds: 0,
		billingEstimation: 0
	}

	let formIsValid: NegotiationErrors

	Object.keys(initialState).map(key => {
		formIsValid = { ...formIsValid, [key]: true }
	})

	$: console.log(formIsValid)

	const negotiationIds: number[] = $negotiations.map(negotiation => negotiation.negotiationId)
	initialState.negotiationId = Math.max(...negotiationIds) + 1

	const initialStateIsValid = (initialState: NegotiationEntries) => {
		let isValid = true

		Object.keys(formIsValid).forEach(key => {})

		Object.keys(formIsValid).forEach(key => {
			console.log(formIsValid[key as keyof Object])
			if (!formIsValid[key as keyof Object]) {
				return (isValid = false)
			}
		})

		return isValid
	}

	const handleSubmitForm = () => {
		confirmationPageIsShown = true
		// validationOnSubmitNegotiation(initialState, formIsValid).isValid
	}
</script>

<section class="section">
	{#if isShown}
		<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
	{/if}

	{#if !isShown}
		<header class="section__header">
			{#if confirmationPageIsShown}
				<h2>下記の内容で登録しますか？</h2>
			{/if}
		</header>
	{/if}

	<div class="section__main">
		<Form
			bind:initialState
			bind:isSucceeded
			bind:isShown
			bind:confirmationPageIsShown
			bind:currentCustomerId={initialState.custCd}
			customers={allCustomers}
			formType="create"
			bind:formIsValid
		/>
		{#if confirmationPageIsShown && !isShown}
			<Confirmation {initialState} />
		{/if}
	</div>

	{#if !isShown}
		<footer class="section__footer">
			<div class="container">
				{#if confirmationPageIsShown}
					<div>
						<button class="btn secondary" on:click={() => (confirmationPageIsShown = false)}
							>修正</button
						>
					</div>
					<button type="submit" class="btn primary" form="negotiation-form">登録</button>
				{:else}
					<button type="button" class="btn primary" on:click={handleSubmitForm}>登録</button>
				{/if}
			</div>
		</footer>
	{/if}
</section>

<style lang="scss">
	.section {
		font-family: 'Noto Sans JP';

		&__main {
			background-color: #fff;
			border-radius: 16px;
			padding: 0 37px;
			padding-top: 28px;
			padding-bottom: 48px;
			margin-top: 20px;
		}
	}

	.container {
		display: flex;
		justify-content: flex-end;
		gap: 18px;
		margin-top: 20px;
	}

	.btn {
		margin: 0;
	}

	:global(button.error) {
		color: var(--error);
		border-color: var(--error);
	}
</style>
