<script lang="ts">
	import Form from '@/views/negocitationsViews/Form.svelte'
	import Confirmation from '@/views/negocitationsViews/Confirmation.svelte'

	import ResultModal from '@/views/modals/ResultModal.svelte'
	import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition'
	export let data

	import { negociations } from '@/stores/negociations'
	import { page } from '$app/stores'
	import { CustomerFactory } from '@/Factories/CustomerFactory.js'
	import type { NegociationEntries } from '@/libs/negociationTypes.js'

	let confirmationPageIsShown = false

	const negociation = $negociations.find(
		negociation => negociation.negociationId.toString() === $page.params.id
	)

	let customers = data.data.map(customer => new CustomerFactory(customer, 'customer'))

	let initialState: NegociationEntries

	if (negociation !== undefined) {
		initialState = {
			negociationId: negociation?.negociationId,
			customerName: negociation?.customerName,
			status: negociation?.status,
			startingDate: negociation?.firstTransaction,
			condition: negociation?.condition,
			inflow: negociation?.inflow,
			preference: negociation?.preference,
			billingDate: negociation?.billingDate,
			scheduledDeposit: negociation?.scheduledDeposit,
			paymentMethod: negociation?.paymentMethod,
			outcome: negociation?.outcome,
			nextContactDate:
				negociation?.nextContact?.length !== undefined
					? negociation?.nextContact.split(' ')[0]
					: '',
			nextContactTime:
				negociation?.nextContact?.length !== undefined
					? negociation?.nextContact.split(' ')[1]
					: '',
			lastContact: negociation?.lastContact,
			postalCode: negociation?.postalCode,
			prefecture: negociation?.prefecture,
			city: negociation?.city,
			address1: negociation?.address1,
			address2: negociation?.address2,
			distanceKm: negociation?.distanceKm,
			distanceTime: negociation?.distanceTime,
			estimate: negociation?.estimate,
			memo: negociation?.memo,
			personInCharge: negociation?.personInCharge,
			responsiblePerson: negociation?.responsiblePerson,
			communication: negociation?.communication,
			dm: negociation?.dm,
			video: negociation?.video,
			checkboxes: negociation?.checkboxes,
			checkBottleneck: negociation?.checkBottleneck,
			occasion: negociation?.occasion,
			risk: negociation?.risk,
			outcomeHistory: negociation?.outcomeHistory,
			custCd: negociation?.custCd,
			numberOfBeds: negociation?.numberOfBeds,
			billingEstimation: negociation.billingEstimation
		}
	}

	$: console.log(negociation)

	let isSucceeded: boolean = false
	let isShown: boolean = false
	let isNavigating: boolean = false

	const goBack = () => {
		goto('/negotiations')
	}

	const handleEditClicked = () => {
		confirmationPageIsShown = false
	}

	const handleCheckForm = () => {
		confirmationPageIsShown = true
	}
</script>

<section class="section section--form">
	{#if isShown}
		<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
	{/if}

	<header class="section__header">
		{#if confirmationPageIsShown && !isShown}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		{#if !isShown && confirmationPageIsShown}
			<Confirmation bind:initialState />
		{/if}
		<Form
			bind:confirmationPageIsShown
			bind:initialState
			bind:isShown
			bind:isSucceeded
			{customers}
			bind:currentCustomerId={initialState.custCd}
			formType={'update'}
		/>
	</div>

	{#if !isShown}
		<footer class="section__footer">
			{#if confirmationPageIsShown}
				<div in:fade>
					<button class="btn secondary" on:click={handleEditClicked}>修正</button>
				</div>
				<button type="submit" class="btn primary" form="negociation-form">登録</button>
			{:else}
				<button type="button" class="btn primary" on:click={handleCheckForm}>登録</button>
			{/if}
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
		&__header {
			margin-bottom: 18px;
			&__title {
				font-size: 24px;
			}
		}

		&__footer {
			display: flex;
			justify-content: flex-end;
			gap: 1rem;
			margin-top: 1.5rem;
			padding-bottom: 24px;
		}
	}

	.btn {
		margin: 0;
	}
</style>
