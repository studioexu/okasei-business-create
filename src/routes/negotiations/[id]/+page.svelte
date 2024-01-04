<script lang="ts" context="module"></script>

<script lang="ts">
	import Confirmation from '@/views/negotiationsViews/Confirmation.svelte'

	import { negotiations } from '@/stores/negotiations'
	import { page } from '$app/stores'
	import type {
		Communication,
		Condition,
		Dm,
		Inflow,
		NegotiationEntries,
		Preference,
		Status
	} from '@/libs/negotiationTypes'
	import { CustomerFactory } from '@/Factories/CustomerFactory.js'
	import type { CustomerApi } from '@/models/CustomerApi'
	import Row from '@/components/Row.svelte'
	import DetailWrapper from '@/components/DetailWrapper.svelte'

	export let data
	console.log(data.data)

	const customers = data.data.map(customer => new CustomerFactory(customer, 'APIv1'))
	console.log(customers)

	const negotiation = $negotiations.find(
		negotiation => negotiation.negotiationId.toString() === $page.params.id
	)

	const customer = customers.find(customer => customer.id === negotiation?.custCd)

	console.log(customer)

	/**
	 * On click, we redirect the user to the edit page
	 */
	const handleLinkClicked = () => {
		window.location.href = '/negotiations/' + negotiation?.negotiationId + '/edit'
	}

	let customerDetails = [
		{
			id: 'id',
			label: '顧客番号'
		},
		{
			id: 'branchNumber',
			label: '枝番'
		},
		{
			id: 'instId',
			label: '医療機関番号'
		},
		{
			id: 'homepage',
			label: 'HP'
		},
		{
			id: 'google',
			label: 'Google評価'
		},
		{
			id: 'reviews',
			label: '口コミ'
		},
		{
			id: 'address',
			label: '連絡'
		},
		{
			id: 'departments',
			label: '診療科目'
		},
		{
			id: 'personInCharge',
			label: 'ご担当者名'
		},
		{
			id: 'personInChargeRole',
			label: '役職'
		},
		{
			id: 'personInChargeMemo',
			label: 'ご担当メモ'
		},
		{
			id: 'approver',
			label: '決裁者'
		},
		{
			id: 'contactTime',
			label: '連絡の取りやすい時間'
		}
	]

	let initialState: NegotiationEntries

	if (negotiation !== undefined) {
		initialState = {
			custCd: negotiation?.custCd,
			negotiationId: negotiation?.negotiationId,
			status: <Status>negotiation?.status,
			startingDate: negotiation?.startingDate,
			condition: <Condition>negotiation?.condition,
			inflow: <Inflow>negotiation?.inflow,
			preference: <Preference>negotiation?.preference,
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
			communication: <Communication>negotiation?.communication,
			dm: <Dm>negotiation?.dm,
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

<aside class="aside">
	<h3 class="title">顧客情報</h3>

	{#each customerDetails as detail}
		{#if detail.id === 'address'}
			<div>
				<DetailWrapper label={detail.label} id={detail.id} content={customer.address.phone} />

				<DetailWrapper label={detail.label} id={detail.id} content={customer.address.mobile} />
			</div>
			<div>
				<DetailWrapper label={detail.label} id={detail.id} content={customer.address.fax} />

				<DetailWrapper label={detail.label} id={detail.id} content={customer.address.mail} />
			</div>
		{:else if detail.id === 'departments'}
			{#each customer.departments as department}
				<div class="form-row">
					<DetailWrapper label={detail.label} id={detail.id} content={department.departmentId} />
					<DetailWrapper label={detail.label} id={detail.id} content={department.numberOfBeds} />
				</div>
			{/each}
		{:else}
			<div>
				<DetailWrapper label={detail.label} id={detail.id} content={customer[detail.id]} />
			</div>
		{/if}
	{/each}
</aside>

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

	.aside {
		position: absolute;
		right: 0;
		top: 0;
		background-color: cyan;
		padding: 16px;
		max-width: fit-content;
		p {
			font-size: 11px;
		}
	}
</style>
