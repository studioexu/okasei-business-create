<script lang="ts">
	import { fly } from 'svelte/transition'
	import BedContainer from './BedContainer.svelte'
	import BeddingWrapper from './BeddingWrapper.svelte'
	import FoundationWrapper from './FoundationWrapper.svelte'
	import Wrapper from './Wrapper.svelte'
	import type { CustomerEntries } from '@/routes/customers/utils/types'

	export let initialState: CustomerEntries
	export let verificationPageDisplayed: boolean

	let bedQuantity: number = 0
</script>

<div class="confirmation">
	<div class="container {verificationPageDisplayed ? '' : 'hidden'} ">
		<Wrapper areaClass="customerNumber" content={initialState.id} title={'顧客番号'} />
		<Wrapper areaClass="branchNumber" content={initialState.branchNumber} title={'枝番'} />
		<Wrapper areaClass="facilityName" content={initialState.facilityName} title={'施設名'} />
		<Wrapper areaClass="kana" content={initialState.kana} title={'カナ'} />

		<Wrapper
			areaClass="facilityNumber"
			content={initialState.facilityNumber}
			title={'医療機関番号'}
		/>
		<Wrapper areaClass="businessType" content={initialState.businessType} title={'区分'} />

		<Wrapper areaClass="postalCode" content={initialState.postalCode} title={'郵便番号'} />
		<Wrapper areaClass="prefecture" content={initialState.prefecture} title={'都道府県'} />
		<Wrapper areaClass="city" content={initialState.city} title={'市区町村'} />
		<Wrapper areaClass="address1" content={initialState.address1} title={'住所１'} />
		<Wrapper areaClass="address2" content={initialState.address2} title={'住所2'} />
		<Wrapper areaClass="phoneNumber" content={initialState.phoneNumber} title={'電話番号'} />
		<Wrapper areaClass="fax" content={initialState.fax} title={'FAX番号'} />

		<Wrapper areaClass="homepage" content={initialState.homepage} title={'ホームページ'} />
		<Wrapper
			areaClass="numberOfEmployees"
			content={initialState.numberOfEmployees}
			title={'従業員数'}
		/>
		<Wrapper
			areaClass="numberOfFacilities"
			content={initialState.numberOfFacilities}
			title={'関連施設拠点数'}
		/>

		<BeddingWrapper total={bedQuantity}>
			{#each initialState.bedding as bedding}
				<BedContainer department={bedding.department} quantity={bedding.quantity} />
			{/each}
		</BeddingWrapper>

		<FoundationWrapper
			year={initialState.year}
			month={initialState.month}
			founder={initialState.founder}
		/>
	</div>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		// 	grid-template-areas:
		// 		'customerNumber customerNumber branchNumber branchNumber . . . . . .'
		// 		'facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName'
		// 		'kana kana kana kana kana kana kana kana kana kana'
		// 		'facilityNumber facilityNumber businessType businessType . . . . . .'
		// 		'postalCode postalCode postalCode . . . . . . . '
		// 		'prefecture prefecture city city address1 address1 address1 address2 address2 address2'
		// 		'phoneNumber phoneNumber phoneNumber fax fax fax . . . .'
		// 		'foundation foundation foundation foundation foundation  foundation foundation foundation foundation foundation'
		// 		'bedding bedding bedding bedding bedding bedding bedding . . .'
		// 		'numberOfEmployees numberOfEmployees numberOfEmployees numberOfEmployees . . . . . .'
		// 		'homepage homepage homepage homepage homepage homepage homepage homepage homepage homepage'
		// 		'numberOfFacilities numberOfFacilities numberOfFacilities . . . . . . .';
		// }

		grid-template-areas:
			'customerNumber customerNumber CustomerNumber branchNumber branchNumber branchNumber. . . .'
			'facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName'
			'kana kana kana kana kana kana kana kana kana kana'
			'facilityNumber facilityNumber facilityNumber businessType businessType businessType  . . . .'
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

	.hidden {
		display: none;
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
		margin-top: 1rem;
		padding-bottom: 1rem;
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
