<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { CustomerEntries } from '@/libs/customerTypes.js'

	import { CustomerFactory } from '@/Factories/CustomerFactory'
	import Confirmation from '@/views/customersViews/Confirmation.svelte'

	export let data

	let customer: CustomerFactory = new CustomerFactory(data.customer, 'newApi')

	let initialState: CustomerEntries = {
		id: customer.custCD,
		branchNumber: customer.custBranchCD,
		customerName: customer.custName,
		kana: customer.custKana,
		facilityNumber: customer.instId,
		businessType: customer.custType,
		postalCode: customer.address.postalCode,
		prefecture: customer.address.prefecture,
		city: customer.address.city,
		address1: customer.address.address1,
		address2: customer.address.address2,
		phoneNumber: customer.address.phoneNumber,
		fax: customer.address.fax,
		email: customer.address.email,
		mobile: customer.address.mobile,
		year: customer.foundationDate.year,
		month: customer.foundationDate.month,
		foundationDate: customer.foundation.establishDate,
		founder: customer.foundation.establishBy,
		departments: customer.departments,
		numberOfEmployees: customer.numEmployees === undefined ? 0 : customer.numEmployees,
		homepage: customer.url,
		numberOfFacilities: customer.numBranch === undefined ? 0 : customer.numBranch,
		isActive: customer.isActive,
		googleReview: customer.googleReview,
		reviews: customer.reviews,
		business: customer.business,
		closingMonth: customer.closingMonth,
		personInCharge: customer.personInCharge,
		personInChargeRole: customer.personInChargeRole,
		personInChargeMemo: customer.personInChargeMemo,
		approver: customer.approver,
		contactTime: customer.contactTime,
		pictures: customer.pictures,
		miscellaneous: customer.miscellaneous
	}
</script>

<section class="section section--confirmation">
	<div class="section__main">
		<Confirmation {initialState} />
	</div>

	<footer class="section__footer">
		<div class="metadata">
			<div class="registration">
				<div class="registration__data">
					<h3 class="registration__data__title">登録者名</h3>
					<p class="registration__data__content">山田太郎</p>
				</div>
				<div class="registration__data">
					<h3 class="registration__data__title">登録日</h3>
					<p class="registration__data__content">{customer.registDateTime.date}</p>
				</div>
				<div class="registration__data">
					<h3 class="registration__data__title">登録時刻</h3>
					<p class="registration__data__content">{customer.registDateTime.time}</p>
				</div>
			</div>

			{#if customer.update.updateDate !== '' && customer.update.updateDate !== undefined}
				<div class="registration">
					<div class="registration__data">
						<h3 class="registration__data__title">更新者名</h3>
						<p class="registration__data__content">山田太郎</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新日</h3>
						<p class="registration__data__content">{customer.updateDateTime.date}</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新時刻</h3>
						<p class="registration__data__content">{customer.updateDateTime.time}</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="button-container">
			{#if customer.isActive}
				<button
					class="primary"
					on:click={() => {
						window.location.href = '/customers/' + customer.custCD + '/edit'
					}}
				>
					編集
				</button>
			{:else}
				<form
					method="POST"
					action="/customers/{initialState.id}?/reactivate"
					id={'reactivate-form'}
					name="reactivate-form"
				>
					<input type="hidden" name="id" value={initialState.id} />
					<button type="submit" form="reactivate-form" class="primary"> 復活 </button>
				</form>
			{/if}
		</div>
	</footer>
</section>

<style lang="scss">
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
