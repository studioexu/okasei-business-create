<script lang="ts" context="module"></script>

<script lang="ts">
	import { goto } from '$app/navigation'

	import NegociationInfo from '@/views/negocitationsViews/NegociationInfo.svelte'
	import NegociationInfoConfirmation from '@/views/negocitationsViews/NegociationInfoConfirmation.svelte'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	import { CustomerFactory } from '@/Factories/CustomerFactory'

	export let data

	let allCustomers: CustomerFactory[] = data.data.map(
		customer => new CustomerFactory(customer, 'customer')
	)

	let confirmationPageIsShown = false
	let isSucceeded: boolean = false
	let isShown = false

	const goBack = () => {
		goto('/negotiations')
	}

	const updateIndexArray = (maxIndex: number) => {
		const array: string[] = []
		for (let i = 0; i < maxIndex; i++) {
			array.push(i.toString())
		}

		return array
	}

	let initialState = {
		status: '',
		startingDate: '',
		condition: '',
		inflow: '',
		preference: '',
		billingDate: '',
		scheduledDeposit: '',
		paymentMethod: '',
		outcome: '',
		nextContact: '',
		lastContact: '',
		postalCode: '',
		prefecture: '',
		city: '',
		address1: '',
		address2: '',
		distanceKm: '',
		distanceTime: '',
		estimate: [],
		importantMemo: [],
		employeeInCharge: '',
		responsiblePerson: '',
		communication: '',
		directMessage: '',
		videoUrl: '',
		checkboxes: [],
		checkBottleneck: '',
		occasion: '',
		risk: '',
		outcomeHistory: []
	}

	let initialState2Errors = {
		status: false,
		startingDate: false,
		condition: false,
		inflow: false,
		preference: false,
		billingDate: false,
		scheduledDeposit: false,
		paymentMethod: false,
		outcome: false,
		nextContact: false,
		postalCode: false,
		prefecture: false,
		city: false,
		address1: false,
		address2: false,
		distanceKm: false,
		distanceTime: false,
		estimate: false,
		importantMemo: false,
		employeeInCharge: false,
		responsiblePerson: false,
		communication: false,
		directMessage: false,
		videoUrl: false,
		checkboxes: false,
		checkBottleneck: false,
		occasion: false,
		risk: false
	}

	let displayClass: string = ''
	$: displayClass

	const initialStateIsValid = (initialStateErrors: Object) => {
		let isValid = true
		Object.keys(initialStateErrors).forEach(key => {
			console.log(initialStateErrors[key as keyof Object])
			if (initialStateErrors[key as keyof Object]) {
				return (isValid = false)
			}
		})

		return isValid
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
		{#if !confirmationPageIsShown}
			<NegociationInfo
				bind:initialState
				customers={allCustomers}
				bind:isSucceeded
				bind:isShown
				bind:confirmationPageIsShown
			/>
		{:else if !isShown}
			<NegociationInfoConfirmation {initialState} />
		{/if}
	</div>

	{#if !isShown}
		<footer class="section__footer">
			<div class="container">
				{#if confirmationPageIsShown}
					<button
						type="button"
						class="btn secondary"
						on:click={() => (confirmationPageIsShown = false)}>編集</button
					>
				{/if}
				<button type="button" class="btn primary" on:click={() => (confirmationPageIsShown = true)}
					>登録</button
				>
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
