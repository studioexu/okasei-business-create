<script lang="ts">
	import { fly } from 'svelte/transition'
	import BedContainer from './BedContainer.svelte'
	import BeddingWrapper from './BeddingWrapper.svelte'
	import FoundationWrapper from './FoundationWrapper.svelte'
	import Wrapper from './Wrapper.svelte'
	import type { CustomerEntries, BedInput } from '@/routes/customers/utils/types'

	export let initialState: CustomerEntries
	export let verificationPageDisplayed: boolean

	let bedQuantity: number = 0

	/**
	 * We go through the array of bed input and calculate the number total of beds.
	 * @param beds: array of bedInput
	 */
	const caculateTotalOfBeds = (beds: BedInput[]): number => {
		let sum: number = 0
		beds.map((bed: BedInput) => {
			const numberOfBed = isNaN(parseInt(bed.quantity)) ? 0 : parseInt(bed.quantity)
			sum += numberOfBed
		})

		return sum
	}

	// $: initialState.bedding.map(
	// 	bed => (bedQuantity += bed.quantity === '' ? 0 : parseInt(bed.quantity))
	// )

	$: bedQuantity = caculateTotalOfBeds(initialState.bedding)
</script>

{#if verificationPageDisplayed}
	<div class="confirmation" in:fly={{ x: 200, duration: 1000 }}>
		<div class="container">
			<Wrapper areaClass="customerNumber" content={initialState.id} title={'顧客番号'} />
			<Wrapper areaClass="branchNumber" content={initialState.branchNumber} title={'枝番'} />
			<Wrapper areaClass="customerName" content={initialState.customerName} title={'施設名'} />
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
{/if}

<style lang="scss">
	.container {
		display: grid;
		overflow: hidden;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		width: auto;
		border-radius: 16px;
		background-color: #fff;
		box-shadow: 0px 8px 8px rgb(200, 200, 200);
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'customerNumber customerNumber CustomerNumber branchNumber branchNumber branchNumber. . . .'
			'customerName customerName customerName customerName customerName customerName customerName customerName customerName customerName'
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
</style>
