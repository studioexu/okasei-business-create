<script lang="ts">
	import { fly } from 'svelte/transition'
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import type { CustomerEntries } from '@/libs/customerTypes'
	import type { Department } from '@/models/CustomerAPI'

	export let initialState: CustomerEntries

	let bedQuantity: number = 0

	$: console.log(initialState.numberOfEmployees)

	/**
	 * We go through the array of department input and calculate the number total of beds.
	 * @param departments: array of Department
	 */
	const caculateTotalOfBeds = (departments: Department[]): number => {
		let sum: number = 0
		departments.map((department: Department) => {
			const numberOfBed = isNaN(department.numberOfBeds) ? 0 : department.numberOfBeds
			sum += numberOfBed
		})

		return sum
	}

	$: bedQuantity = caculateTotalOfBeds(initialState.departments)
</script>

<div class="confirmation" in:fly={{ x: 200, duration: 1000 }}>
	<div class="form-row">
		<DetailWrapper
			areaClass="customer-number"
			content={initialState.id !== undefined ? initialState.id : ''}
			label={'顧客番号'}
		/>
		<DetailWrapper areaClass="branch-number" content={initialState.branchNumber} label={'枝番'} />
		<DetailWrapper areaClass="closing-month" content={initialState.closingMonth} label={'決算月'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="customer-name" content={initialState.customerName} label={'施設名'} />
	</div>

	<div class="form-row">
		<DetailWrapper areaClass="kana" content={initialState.kana} label={'カナ'} />
	</div>

	<div class="form-row">
		<DetailWrapper
			areaClass="facility-number"
			content={initialState.facilityNumber}
			label={'医療機関番号'}
		/>

		<DetailWrapper areaClass="business-type" content={initialState.businessType} label={'区分'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="postal-code" content={initialState.postalCode} label={'郵便番号'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="prefecture" content={initialState.prefecture} label={'都道府県'} />
		<DetailWrapper areaClass="city" content={initialState.city} label={'市区町村'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="address1" content={initialState.address1} label={'住所１'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="address2" content={initialState.address2} label={'住所2'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="phone-number" content={initialState.phoneNumber} label={'電話番号'} />
		<DetailWrapper areaClass="phone-number" content={initialState.mobile} label={'携帯電話'} />
		<DetailWrapper areaClass="fax" content={initialState.fax} label={'FAX番号'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="email" content={initialState.email} label={'メール'} />
	</div>
	<div class="form-row">
		<DetailWrapper areaClass="homepage" content={initialState.homepage} label={'ホームページ'} />
	</div>
	<div class="form-row">
		<DetailWrapper
			areaClass="number-of-employees"
			content={initialState.numberOfEmployees.toString()}
			label={'従業員数'}
			unit={'名'}
		/>
	</div>
	<div class="form-row">
		<DetailWrapper
			areaClass="number-of-facilities"
			content={initialState.numberOfFacilities.toString()}
			label={'関連施設拠点数'}
			unit={'軒'}
		/>
	</div>

	<div class="form-row">
		<DetailWrapper
			areaClass="google-review"
			content={initialState.reviews !== undefined ? initialState.reviews : ''}
			label={'口コミ'}
		/>
	</div>

	<div class="form-row">
		<DetailWrapper
			areaClass="business-list"
			content={initialState.business !== undefined ? initialState.business : ''}
			label={'事業一覧'}
		/>
	</div>

	<div class="form-row">
		<DetailWrapper content={initialState.year} label={'設立年月日'} unit={'年'} />
		<DetailWrapper content={initialState.month} unit={'月'} />
		<DetailWrapper content={initialState.founder} label={'設立者'} />
	</div>

	<div class="form-row">
		<div class="detail-wrapper bedding">
			<h3 class="label">診療科目</h3>
			<div class="container">
				{#each initialState.departments as department}
					<div class="bed-wrapper">
						<h3 class="label">{department.department.name}</h3>
						<div class="quantity">
							<h3 class="quantity__label">病床数</h3>
							<p class="quantity__content">
								{department.numberOfBeds ? department.numberOfBeds : 0}
							</p>
						</div>
					</div>
				{/each}

				<div class="total">
					<h3 class="total__label">病床数合計</h3>
					<p class="total__content">{bedQuantity}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="form-row">
		<DetailWrapper content={initialState.personInCharge} label={'ご担当者名'} />

		<DetailWrapper content={initialState.personInChargeRole} label={'役職'} />
	</div>

	<div class="form-row">
		<DetailWrapper content={initialState.personInChargeMemo} label={'ご担当メモ'} />
	</div>

	<div class="form-row">
		<DetailWrapper content={initialState.approver} label={'決裁者'} />
	</div>

	<div class="form-row">
		<DetailWrapper content={initialState.miscellaneous} label={'その他'} />
	</div>

	<div class="form-row">
		<div class="detail-wrapper">
			<h3 class="label">{'参考書類など 画像データ'}</h3>
			<div class="container container--horizontal">
				{#if initialState.pictures !== undefined}
					{#each initialState.pictures as image}
						<div class="card">
							<div class="image-wrapper">
								<img src={URL.createObjectURL(image.file)} alt="" />
							</div>
							<p class="label">{image.memo}</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.confirmation {
		overflow: hidden;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;
		width: auto;
		border-radius: 16px;
		background-color: #fff;
		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	.form-row {
		display: flex;
		gap: 50px;
		border-bottom: 1px solid rgb(206, 205, 205);

		&:last-child {
			border: none;
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
		gap: 18px;
		padding: 11px 0;

		.label {
			font-size: 18px;
			font-weight: 400;
			width: 130px;
			color: var(--gray);
		}

		.label {
			width: 130px;
		}

		.total {
			display: flex;
			justify-content: space-between;
			align-items: center;
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
