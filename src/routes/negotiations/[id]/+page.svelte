<script lang="ts" context="module"></script>

<script lang="ts">
	import Confirmation from '@/views/negocitationsViews/Confirmation.svelte'

	import { negociations } from '@/stores/negociations'
	import { page } from '$app/stores'
	import type { NegociationEntries } from '@/libs/negociationTypes'

	const negociation = $negociations.find(
		negociation => negociation.negociationId.toString() === $page.params.id
	)
	/**
	 * On click, we redirect the user to the edit page
	 */
	const handleLinkClicked = () => {
		window.location.href = '/negotiations/' + negociation?.negociationId + '/edit'
	}

	let initialState: NegociationEntries

	if (negociation !== undefined) {
		initialState = {
			custCd: negociation?.custCd,
			negociationId: negociation?.negociationId,
			status: negociation?.status,
			startingDate: negociation?.firstTransaction,
			condition: negociation?.condition,
			inflow: negociation?.inflow,
			preference: negociation?.preference,
			billingDate: negociation?.billingDate,
			scheduledDeposit: negociation?.scheduledDeposit,
			outcome: negociation?.outcome,
			nextContactDate: negociation.nextContactDate,
			nextContactTime: negociation.nextContactTime,
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
			numberOfBeds: 0,
			billingEstimation: 0,
			customerName: '',
			registerBy: negociation.register_by,
			registerAt: negociation.register_at,
			updateBy: negociation.update_by,
			updateAt: negociation.update_at,
			deleteBy: negociation.delete_by,
			deleteAt: negociation.delete_at
		}
	}

	const registrationData = [
		{
			type: 'register',
			title: '登録'
		},
		{
			type: 'update',
			title: '更新'
		},
		{
			type: 'delete',
			title: '削除'
		}
	]
</script>

<section class="section section--confirmation">
	<div class="section__main">
		<Confirmation {initialState} />
	</div>

	<footer class="section__footer">
		<!-- <div class="metadata">
			{#each registrationData as registration}
				<div class="registration">
					{#if initialState[(<keyof NegociationEntries>registration.type + 'By')] !== null && initialState[registration.type + 'At'] !== ''}
						<div class="registration__data">
							<h3 class="registration__data__title">{registration.title}者名</h3>
							<p class="registration__data__content">{initialState[registration.type + 'By']}</p>
						</div>
						<div class="registration__data">
							<h3 class="registration__data__title">{registration.title}日</h3>
							<p class="registration__data__content">
								{initialState[registration.type + 'At'].split('T')[0]}
							</p>
						</div>
						<div class="registration__data">
							<h3 class="registration__data__title">{registration.title}時刻</h3>
							<p class="registration__data__content">
								{initialState[registration.type + 'At'].split('T')[1].split('.')[0]}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div> -->

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

		&__footer {
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
	}
</style>
