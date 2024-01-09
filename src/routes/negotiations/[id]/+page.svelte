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
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import type { CustomerEntries } from '@/libs/customerTypes.js'
	import { getTotalOfBeds } from '@/libs/utils.js'

	const negotiation = $negotiations.find(
		negotiation => negotiation.negotiationId.toString() === $page.params.id
	)

	export let data

	let customers = data.data.map(customer => new CustomerFactory(customer, 'APIv1'))
	let customer = customers.find(customer => customer.id === negotiation?.custCd)
	let customerInfo = {
		branchNumber: customer?.custBranchCD,
		corporateName: customer?.corporateName,
		customerName: customer?.custName,
		kana: customer?.custKana,
		facilityNumber: customer?.instId,
		businessType: customer?.custType,
		postalCode: customer?.address.postalCode,
		prefecture: customer?.address.prefecture,
		city: customer?.address.city,
		address1: customer?.address.address1,
		address2: customer?.address.address2,
		phoneNumber: customer?.address.phoneNumber,
		fax: customer?.address.fax,
		email: customer?.address.email,
		mobile: customer?.address.mobile,
		year: customer?.foundationDate.year,
		month: customer?.foundationDate.month,
		foundationDate: customer?.foundation.establishDate,
		founder: customer?.foundation.establishBy,
		departments: customer?.departments,
		numberOfEmployees: customer?.numEmployees === undefined ? 0 : customer?.numEmployees,
		homepage: customer?.url,
		numberOfFacilities: customer?.numBranch === undefined ? 0 : customer?.numBranch,
		isActive: customer?.isActive,
		googleReview: customer?.googleReview,
		reviews: customer?.reviews,
		business: customer?.business,
		closingMonth: customer?.closingMonth,
		personInCharge: customer?.personInCharge,
		personInChargeRole: customer?.personInChargeRole,
		personInChargeMemo: customer?.personInChargeMemo,
		approver: customer?.approver,
		contactTime: customer?.contactTime,
		// pictures: images,
		miscellaneous: customer?.miscellaneous
	}

	const customerInfoFieldsets = [
		{
			id: 'branchNumber',
			label: '枝番'
		},
		{
			id: 'facilityNumber',
			label: '医療機関番号'
		},
		{
			id: 'business',
			label: '事業内容'
		},
		{
			id: 'homepage',
			label: 'HP'
		},
		{
			id: 'googleReview',
			label: 'Google評価'
		},
		{
			id: 'reviews',
			label: '口コミ'
		},
		{
			id: 'phoneNumber',
			label: '電話番号'
		},
		{
			id: 'fax',
			label: 'FAX番号'
		},
		{
			id: 'mobile',
			label: '携帯電話'
		},
		{
			id: 'mail',
			label: 'メール'
		},
		{
			id: 'numberOfEmployees',
			label: '従業員数'
		},
		{
			id: 'numberOfBranches',
			label: '関連施設拠点数'
		},
		{
			id: 'miscellaneous',
			label: 'その他'
		},
		{
			id: 'departments',
			label: '診療科目'
		},
		{
			id: 'images',
			label: '画像データ'
		}
	] as {
		id: string & keyof typeof customerInfo
		label: string
	}[]

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
			customerName: customer?.custName,
			registerBy: negotiation.register_by,
			registerAt: negotiation.register_at,
			updateBy: negotiation.update_by,
			updateAt: negotiation.update_at,
			deleteBy: negotiation.delete_by,
			deleteAt: negotiation.delete_at
		}
	}

	$: console.log(initialState)

	$: console.log(customer)

	let bedTotal: number = getTotalOfBeds(customerInfo.departments)
</script>

<section class="section section--confirmation">
	<div class="section__main">
		<Confirmation {initialState} />
	</div>

	<aside class="aside customer-info">
		<header class="aside__header">
			<h3>顧客情報</h3>
		</header>

		<div class="aside__main">
			{#each customerInfoFieldsets as info}
				{#if info.id !== 'departments'}
					<div class="form-row">
						<DetailWrapper label={info.label} id={info.id} content={customerInfo[info.id]} />
					</div>
				{/if}

				{#if info.id === 'departments'}
					<div class="detail-wrapper bedding">
						<h3 class="label">診療科目</h3>
						<div class="container">
							{#each customerInfo.departments as department}
								<article class="bed-wrapper">
									<h3 class="label">{department.departmentName}</h3>
									<div class="quantity">
										<h3 class="quantity__label">病床数</h3>
										<p class="quantity__content">
											{department.numberOfBeds ? department.numberOfBeds : 0}
										</p>
									</div>
								</article>
							{/each}
							<DetailWrapper id={'total'} label={'病床数合計'} content={bedTotal.toString()} />
						</div>
					</div>
				{/if}
			{/each}

			<button
				type="button"
				class="primary"
				on:click={() => window.open('/customers/' + customer?.id, '_blank')}
			>
				顧客情報を確認
			</button>
		</div>
	</aside>

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
		position: relative;

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
		top: 0;
		right: 0;
		padding: 1rem;
		background-color: #fff;
		box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.16);
		border-radius: 15px;

		&__header {
			color: var(--primary);
			margin-bottom: 1rem;
		}
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&--horizontal {
			flex-direction: row;
			flex-wrap: wrap;
		}
	}

	.image-wrapper {
		position: relative;
		width: 180px;
		height: 133px;

		img {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			object-fit: contain;
		}
	}

	.detail-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		width: fit-content;
		gap: 18px;

		.label {
			align-self: flex-start;
			display: flex;
			align-items: center;
			height: 31px;
			font-weight: 400;
			color: var(--gray);
		}
	}

	.bed-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: calc((35 / 1366) * 100vw);

		.label {
			color: var(--black);
		}

		.quantity {
			display: flex;
			align-items: center;
			gap: calc((20 / 1366) * 100vw);

			&__label {
				color: var(--gray);
				font-size: 18px;
				font-weight: 400;
				width: auto;
			}
		}
	}
</style>
