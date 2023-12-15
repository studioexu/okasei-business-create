<script lang="ts" context="module"></script>

<script lang="ts">
	import Confirmation from '@/views/negocitationsViews/Confirmation.svelte'

	import { negociations } from '@/stores/negociations'
	import { page } from '$app/stores'

	const negociation = $negociations.find(
		negociation => negociation.negociationId.toString() === $page.params.id
	)

	/**
	 * On click, we redirect the user to the edit page
	 */
	const handleLinkClicked = () => {
		window.location.href = '/negotiations/' + negociation?.negociationId + '/edit'
	}

	let initialState = {
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
			negociation?.nextContact?.length !== undefined ? negociation?.nextContact.split(' ')[0] : '',
		nextContactTime:
			negociation?.nextContact?.length !== undefined ? negociation?.nextContact.split(' ')[1] : '',
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
		employeeInCharge: negociation?.personInCharge,
		responsiblePerson: negociation?.responsiblePerson,
		communication: negociation?.communication,
		directMessage: negociation?.dm,
		videoUrl: negociation?.video,
		checkboxes: negociation?.checkboxes,
		checkBottleneck: negociation?.checkBottleneck,
		occasion: negociation?.occasion,
		risk: negociation?.risk,
		outcomeHistory: negociation?.outcomeHistory,
		custCd: negociation?.custCd
	}
</script>

<section class="section section--confirmation">
	<div class="section__main">
		<Confirmation {initialState} />
	</div>

	<footer class="section__footer">
		<div class="button-container">
			<button class="primary" on:click={handleLinkClicked}> 編集 </button>
		</div>
	</footer>
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
	.section__footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 1rem;
		padding-bottom: 2rem;
		.registration {
			display: flex;
			gap: 2rem;
			align-items: center;
			&__data {
				display: flex;
				align-items: center;
				gap: 1rem;

				&__title {
					font-size: 14px;
				}
				&__content {
					font-size: 14px;
				}
			}
		}
	}
</style>
