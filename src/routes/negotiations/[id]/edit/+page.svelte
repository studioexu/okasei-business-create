<script lang="ts">
	import Form from '@/views/negotiationsViews/Form.svelte'
	import Confirmation from '@/views/negotiationsViews/Confirmation.svelte'

	import ResultModal from '@/views/modals/ResultModal.svelte'
	import { goto } from '$app/navigation'
	import { fade } from 'svelte/transition'
	export let data

	import { negotiations } from '@/stores/negotiations'
	import { page } from '$app/stores'
	import { CustomerFactory } from '@/Factories/CustomerFactory.js'
	import type { NegotiationEntries, NegotiationErrors } from '@/libs/negotiationTypes.js'
	import { inputIsValid } from '@/libs/customerValidations.js'

	const negotiation = $negotiations.find(
		negotiation => negotiation.negotiationId.toString() === $page.params.id
	)

	let confirmationPageIsShown = false
	let customers = data.customers.map(customer => new CustomerFactory(customer, 'newApi'))
	let initialState: NegotiationEntries
	let formIsValid: NegotiationErrors

	if (negotiation !== undefined) {
		initialState = {
			negotiationId: negotiation?.negotiationId,
			custCd: negotiation?.custCd,
			customerName: negotiation?.customerName,
			status: negotiation?.status,
			startingDate: negotiation?.startingDate,
			condition: negotiation?.condition,
			inflow: negotiation?.inflow,
			preference: negotiation?.preference,
			billingDate: negotiation?.billingDate,
			scheduledDeposit: negotiation?.scheduledDeposit,
			outcome: negotiation?.outcome,
			nextContactDate: negotiation.nextContactDate,
			nextContactTime: negotiation.nextContactTime,
			lastContact: negotiation?.lastContact,
			postalCode: negotiation?.postalCode,
			prefecture: negotiation?.prefecture,
			city: negotiation?.city,
			address1: negotiation?.address1,
			address2: negotiation?.address2,
			distanceKm: negotiation?.distanceKm,
			distanceTime: negotiation?.distanceTime,
			estimate: negotiation?.estimate,
			memo: negotiation?.memo,
			personInCharge: negotiation?.personInCharge,
			responsiblePerson: negotiation?.responsiblePerson,
			communication: negotiation?.communication,
			dm: negotiation?.dm,
			video: negotiation?.video,
			checkboxes: negotiation?.checkboxes,
			bottleneck: negotiation?.bottleneck,
			occasion: negotiation?.occasion,
			risk: negotiation?.risk,
			outcomeHistory: negotiation?.outcomeHistory,
			numberOfBeds: negotiation?.numberOfBeds,
			billingEstimation: negotiation.billingEstimation,
			registerBy: negotiation.register_by,
			registerAt: negotiation.register_at,
			updateBy: negotiation.update_by,
			updateAt: negotiation.update_at,
			deleteBy: negotiation.delete_by,
			deleteAt: negotiation.delete_at
		}

		Object.keys(initialState).map(key => {
			formIsValid = { ...formIsValid, [key]: true }
		})
	}

	let isSucceeded: boolean = false
	let isShown: boolean = false
	let isNavigating: boolean = false

	const goBack = () => {
		goto('/negotiations')
	}

	// /**
	//  * Take the form and check if all the entries are valid.
	//  * If there is one error, the function will return false.
	//  * @param formEntries: Object of entries
	//  * @returns boolean
	//  */
	// export const validationOnSubmitNegotiation = (
	// 	formEntries: NegotiationEntries,
	// 	formValidation: NegotiationErrors
	// ): { isValid: boolean; formValidation: NegotiationErrors } => {
	// 	let errorArray: boolean[] = []
	// 	let isValid = true

	// 	let requiredField: any

	// 	Object.keys(formEntries).map(key => {
	// 		if (key === 'customerName' || key === 'status' || key === 'startingDate') {
	// 			requiredField = { ...requiredField, [key]: true }
	// 		} else {
	// 			requiredField = { ...requiredField, [key]: false }
	// 		}
	// 	})

	// 	Object.keys(formEntries).map(key => {
	// 		const input = formEntries[key as keyof NegotiationEntries]

	// 		formValidation[key] = !requiredField[
	// 			key as keyof NegotiationErrors
	// 		]
	// 			? input === '' || inputIsValid(key, input)
	// 			: inputIsValid(key, input)
	// 		errorArray.push(!formValidation[key as keyof NegotiationErrors])
	// 	})

	// 	errorArray.forEach(error => {
	// 		if (error) {
	// 			isValid = false
	// 		}
	// 	})
	// 	return { isValid, formValidation }
	// }
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
			bind:currentCustomerId={initialState.custCd}
			formType={'update'}
			{customers}
			bind:formIsValid
		/>
	</div>

	{#if !isShown}
		<footer class="section__footer">
			{#if confirmationPageIsShown}
				<div in:fade>
					<button
						class="btn secondary"
						on:click={() => {
							confirmationPageIsShown = false
						}}
					>
						修正
					</button>
				</div>
				<button type="submit" class="btn primary" form="negotiation-form">登録</button>
			{:else}
				<button
					type="button"
					class="btn primary"
					on:click={() => {
						confirmationPageIsShown = true
					}}
				>
					登録
				</button>
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
