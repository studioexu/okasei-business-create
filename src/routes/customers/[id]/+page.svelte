<script lang="ts" context="module">
</script>

<script lang="ts">
	import Button from '@/components/customers/Button.svelte'
	import type { Bedding, CustomerInfo } from '../utils/types'
	import BedContainer from './components/BedContainer.svelte'
	import BeddingWrapper from './components/BeddingWrapper.svelte'
	import FoundationWrapper from './components/FoundationWrapper.svelte'
	import Wrapper from './components/Wrapper.svelte'
	export let data

	let customer: CustomerInfo = data.customer

	let bedQuantity: number = 0

	customer.bedding.forEach((bed: Bedding) => (bedQuantity += parseInt(bed.quantity)))

	const handleLinkClicked = () => {
		window.location.href = '/customers/' + customer.id + '/edit'
	}
</script>

<section class="section section--confirmation">
	<div class="container">
		<Wrapper areaClass="customerNumber" content={customer.id} title={'顧客番号'} />
		<Wrapper areaClass="branchNumber" content={customer.branchNumber} title={'枝番'} />
		<Wrapper areaClass="facilityName" content={customer.facilityName} title={'施設名'} />
		<Wrapper areaClass="kana" content={customer.kana} title={'カナ'} />

		<Wrapper areaClass="facilityNumber" content={customer.facilityNumber} title={'医療機関番号'} />
		<Wrapper areaClass="businessType" content={customer.businessType} title={'区分'} />

		<Wrapper areaClass="postalCode" content={customer.address.postalCode} title={'郵便番号'} />
		<Wrapper areaClass="prefecture" content={customer.address.prefecture} title={'都道府県'} />
		<Wrapper areaClass="city" content={customer.address.city} title={'市区町村'} />
		<Wrapper areaClass="address1" content={customer.address.address1} title={'住所１'} />
		<Wrapper areaClass="address2" content={customer.address.address2} title={'住所2'} />
		<Wrapper areaClass="phoneNumber" content={customer.address.phoneNumber} title={'電話番号'} />
		<Wrapper areaClass="fax" content={customer.address.fax} title={'FAX番号'} />

		<Wrapper areaClass="homepage" content={customer.homepage} title={'ホームページ'} />
		<Wrapper
			areaClass="numberOfEmployees"
			content={customer.numberOfEmployees}
			title={'従業員数'}
		/>
		<Wrapper
			areaClass="numberOfFacilities"
			content={customer.numberOfFacilities}
			title={'関連施設拠点数'}
		/>

		<BeddingWrapper total={bedQuantity}>
			{#each customer.bedding as bedding}
				<BedContainer department={bedding.department} quantity={bedding.quantity} />
			{/each}
		</BeddingWrapper>

		<FoundationWrapper
			year={customer.foundation.year}
			month={customer.foundation.month}
			founder={customer.foundation.founder}
		/>
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
					<p class="registration__data__content">{customer.registration.registrationDate}</p>
				</div>
				<div class="registration__data">
					<h3 class="registration__data__title">登録時刻</h3>
					<p class="registration__data__content">{customer.registration.registrationTime}</p>
				</div>
			</div>

			{#if customer.update.status !== '' && customer.update.status !== undefined}
				<div class="registration">
					<div class="registration__data">
						<h3 class="registration__data__title">更新者名</h3>
						<p class="registration__data__content">山田太郎</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新日</h3>
						<p class="registration__data__content">{customer.update.lastUpdatedDate}</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新時刻</h3>
						<p class="registration__data__content">{customer.update.lastUpdatedTime}</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="button-container">
			<Button buttonClass={'btn--filled'} handleClick={handleLinkClicked}>編集</Button>
		</div>
	</footer>
</section>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		// grid-template-areas:
		// 	'customerNumber customerNumber branchNumber branchNumber . . . . . .'
		// 	'facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName'
		// 	'kana kana kana kana kana kana kana kana kana kana'
		// 	'facilityNumber facilityNumber businessType businessType . . . . . .'
		// 	'postalCode postalCode postalCode . . . . . . . '
		// 	'prefecture prefecture city city address1 address1 address1 address2 address2 address2'
		// 	'phoneNumber phoneNumber phoneNumber fax fax fax . . . .'
		// 	'foundation foundation foundation foundation foundation  foundation foundation foundation foundation foundation'
		// 	'bedding bedding bedding bedding bedding bedding bedding . . .'
		// 	'numberOfEmployees numberOfEmployees numberOfEmployees numberOfEmployees . . . . . .'
		// 	'homepage homepage homepage homepage homepage homepage homepage homepage homepage homepage'
		// 	'numberOfFacilities numberOfFacilities numberOfFacilities . . . . . . .';

		grid-template-areas:
			'customerNumber customerNumber branchNumber branchNumber . . . . . .'
			'facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName'
			'kana kana kana kana kana kana kana kana kana kana'
			'facilityNumber facilityNumber businessType businessType . . . . . .'
			'postalCode postalCode postalCode . . . . . . . '
			'prefecture prefecture prefecture city city city . . . .'
			'address1 address1 address1 address1 address1 address1 address1 address1 address1 address1'
			'address2 address2 address2 address2 address2 address2 address2 address2 address2 address2'
			'phoneNumber phoneNumber phoneNumber fax fax fax . . . .'
			'foundation foundation foundation foundation foundation  foundation foundation foundation foundation foundation'
			'bedding bedding bedding bedding bedding bedding bedding . . .'
			'numberOfEmployees numberOfEmployees numberOfEmployees numberOfEmployees . . . . . .'
			'homepage homepage homepage homepage homepage homepage homepage homepage homepage homepage'
			'numberOfFacilities numberOfFacilities numberOfFacilities . . . . . . .';
	}

	.container {
		overflow: hidden;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		background-color: #fff;
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: calc(((1240 - 74) / 1366) * 100vw);
		width: auto;

		box-shadow: 0px 8px 8px rgb(200, 200, 200);
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
