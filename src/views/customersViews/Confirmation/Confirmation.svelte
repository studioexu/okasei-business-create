<script lang="ts">
	import { fly } from 'svelte/transition'
	import BedContainer from './BedContainer.svelte'
	import DepartmentWrapper from './DepartmentWrapper.svelte'
	import FoundationWrapper from './FoundationWrapper.svelte'
	import DetailWrapper from './DetailWrapper.svelte'
	import type { CustomerEntries, BedInput } from '@/utils/customers/types'

	export let initialState: CustomerEntries
	// export let confirmationPageIsShown: boolean

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

	$: bedQuantity = caculateTotalOfBeds(initialState.bedding)
</script>

<div class="confirmation" in:fly={{ x: 200, duration: 1000 }}>
	<div class="container">
		<DetailWrapper areaClass="customer-number" content={initialState.id} title={'顧客番号'} />
		<DetailWrapper areaClass="branch-number" content={initialState.branchNumber} title={'枝番'} />
		<DetailWrapper areaClass="customer-name" content={initialState.customerName} title={'施設名'} />
		<DetailWrapper areaClass="kana" content={initialState.kana} title={'カナ'} />

		<DetailWrapper
			areaClass="facility-number"
			content={initialState.facilityNumber}
			title={'医療機関番号'}
		/>
		<DetailWrapper areaClass="business-type" content={initialState.businessType} title={'区分'} />

		<DetailWrapper areaClass="postal-code" content={initialState.postalCode} title={'郵便番号'} />
		<DetailWrapper areaClass="prefecture" content={initialState.prefecture} title={'都道府県'} />
		<DetailWrapper areaClass="city" content={initialState.city} title={'市区町村'} />
		<DetailWrapper areaClass="address1" content={initialState.address1} title={'住所１'} />
		<DetailWrapper areaClass="address2" content={initialState.address2} title={'住所2'} />
		<DetailWrapper areaClass="phone-number" content={initialState.phoneNumber} title={'電話番号'} />
		<DetailWrapper areaClass="fax" content={initialState.fax} title={'FAX番号'} />

		<DetailWrapper areaClass="homepage" content={initialState.homepage} title={'ホームページ'} />
		<DetailWrapper
			areaClass="number-of-employees"
			content={initialState.numberOfEmployees}
			title={'従業員数'}
		/>
		<DetailWrapper
			areaClass="number-of-facilities"
			content={initialState.numberOfFacilities}
			title={'関連施設拠点数'}
		/>

		<DepartmentWrapper total={bedQuantity}>
			{#each initialState.bedding as bedding}
				<BedContainer department={bedding.department} quantity={bedding.quantity} />
			{/each}
		</DepartmentWrapper>

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
			'customer-number customer-number customer-number branch-number branch-number branch-number. . . .'
			'customer-name customer-name customer-name customer-name customer-name customer-name customer-name customer-name customer-name customer-name'
			'kana kana kana kana kana kana kana kana kana kana'
			'facility-number facility-number facility-number business-type business-type business-type  . . . .'
			'postal-code postal-code postal-code . . . . . . . '
			'prefecture prefecture prefecture city city city . . . .'
			'address1 address1 address1 address1 address1 address1 address1 address1 address1 address1'
			'address2 address2 address2 address2 address2 address2 address2 address2 address2 address2'
			'phone-number phone-number phone-number fax fax fax . . . .'
			'foundation foundation foundation foundation foundation  foundation foundation foundation foundation foundation'
			'bedding bedding bedding bedding bedding bedding bedding . . .'
			'number-of-employees number-of-employees number-of-employees number-of-employees . . . . . .'
			'homepage homepage homepage homepage homepage homepage homepage homepage homepage homepage'
			'number-of-facilities number-of-facilities number-of-facilities . . . . . . .';
	}
</style>
