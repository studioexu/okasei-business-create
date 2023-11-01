<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import type { CustomerEntries } from '@/routes/customers/utils/types'
	import BedContainer from './components/BedContainer.svelte'
	import DepartmentWrapper from './components/DepartmentWrapper.svelte'
	import FoundationWrapper from './components/FoundationWrapper.svelte'
	import Wrapper from './components/Wrapper.svelte'
	import { CustomerFactory } from '../utils/Factories/CustomerFactory'
	import Confirmation from '@/views/customersViews/Confirmation/Confirmation.svelte'

	export let data

	let customer: CustomerFactory = new CustomerFactory(data.customer, 'customer')

	let bedQuantity: number = 0

	customer.departments.detail.forEach((bed: any) => (bedQuantity += parseInt(bed.quantity)))

	/**
	 * On click, we redirect the user to the edit page
	 */
	const handleLinkClicked = () => {
		window.location.href = '/customers/' + customer.custCD + '/edit'
	}

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
		year: customer.foundation.establishDate,
		month: customer.foundation.establishDate,
		founder: customer.foundation.establishedBy,
		bedding: customer.departmentDetail,
		numberOfEmployees: customer.numEmployees,
		homepage: customer.url,
		numberOfFacilities: customer.numBranch,
		registrationDate: customer.registration.registDate,
		registrationTime: customer.registration.registBy,
		isActive: customer.isActive
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
				<Button buttonClass={'btn--filled'} handleClick={handleLinkClicked}>編集</Button>
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
