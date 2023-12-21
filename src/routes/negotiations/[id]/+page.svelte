<script lang="ts" context="module"></script>

<script lang="ts">
	import Confirmation from '@/views/negotiationsViews/Confirmation.svelte'

	import { negotiations } from '@/stores/negotiations'
	import { page } from '$app/stores'
	import type { NegotiationEntries } from '@/libs/negotiationTypes'

	const negotiation = $negotiations.find(
		negotiation => negotiation.negotiationId.toString() === $page.params.id
	)
	/**
	 * On click, we redirect the user to the edit page
	 */
	const handleLinkClicked = () => {
		window.location.href = '/negotiations/' + negotiation?.negotiationId + '/edit'
	}

	let initialState: NegotiationEntries

	if (negotiation !== undefined) {
		initialState = {
			custCd: negotiation?.custCd,
			negotiationId: negotiation?.negotiationId,
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
			numberOfBeds: 0,
			billingEstimation: 0,
			customerName: '',
			registerBy: negotiation.register_by,
			registerAt: negotiation.register_at,
			updateBy: negotiation.update_by,
			updateAt: negotiation.update_at,
			deleteBy: negotiation.delete_by,
			deleteAt: negotiation.delete_at
		}
	}
</script>

<section class="section section--confirmation">
	<div class="section__main">
		<Confirmation {initialState} />
	</div>

	<footer class="section__footer">
		<div class="metadata">
			<div class="metadata">
				<div class="registration">
					<div class="registration__data">
						<h3 class="registration__data__title">登録者名</h3>
						<p class="registration__data__content">山田太郎</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">登録日</h3>
						<p class="registration__data__content">{initialState.registerAt?.split('T')[0]}</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">登録時刻</h3>
						<p class="registration__data__content">
							{initialState.registerAt?.split('T')[1].split('.')[0]}
						</p>
					</div>
				</div>

				{#if initialState.updateAt !== '' && initialState.updateAt !== undefined}
					<div class="registration">
						<div class="registration__data">
							<h3 class="registration__data__title">更新者名</h3>
							<p class="registration__data__content">山田太郎</p>
						</div>
						<div class="registration__data">
							<h3 class="registration__data__title">更新日</h3>
							<p class="registration__data__content">{initialState.updateAt?.split('T')[0]}</p>
						</div>
						<div class="registration__data">
							<h3 class="registration__data__title">更新時刻</h3>
							<p class="registration__data__content">
								{initialState.updateAt?.split('T')[1].split('.')[0]}
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>

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
