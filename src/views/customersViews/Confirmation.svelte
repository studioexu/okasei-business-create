<script lang="ts">
	import { fly } from 'svelte/transition'
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import Row from '@/components/Row.svelte'

	import type { CustomerEntries } from '@/libs/customerTypes'
	import { getTotalOfBeds } from '@/libs/utils'

	export let initialState: CustomerEntries

	let bedTotal: number = 0

	$: bedTotal = getTotalOfBeds(initialState.departments)

	const isCompany: boolean = initialState.businessType === 'C'
</script>

<div class="confirmation" in:fly={{ x: 200, duration: 1000 }}>
	<Row>
		<DetailWrapper
			id="customer-number"
			content={initialState.id !== undefined ? initialState.id.toString() : ''}
			label={'顧客番号'}
		/>
		{#if isCompany}
			<DetailWrapper id="branch-number" content={initialState.branchNumber} label={'枝番'} />
		{/if}
		<DetailWrapper id="closing-month" content={initialState.closingMonth} label={'決算月'} />
	</Row>

	{#if isCompany}
		<Row>
			<DetailWrapper id="corporate-name" content={initialState.corporateName} label={'法人名'} />
		</Row>
	{/if}

	<Row>
		<DetailWrapper
			id="customer-name"
			content={initialState.customerName}
			label={isCompany ? '施設名' : '名前'}
		/>
	</Row>

	<Row>
		<DetailWrapper id="kana" content={initialState.kana} label={'カナ'} />
	</Row>

	<Row>
		{#if isCompany}
			<DetailWrapper
				id="facility-number"
				content={initialState.facilityNumber}
				label={'医療機関番号'}
			/>
		{/if}

		<DetailWrapper
			id="business-type"
			content={initialState.businessType === 'C' ? '法人' : '個人'}
			label={'区分'}
		/>
	</Row>
	<Row>
		<DetailWrapper id="postal-code" content={initialState.postalCode} label={'郵便番号'} />
	</Row>
	<Row>
		<DetailWrapper id="prefecture" content={initialState.prefecture} label={'都道府県'} />
		<DetailWrapper id="city" content={initialState.city} label={'市区町村'} />
	</Row>
	<Row>
		<DetailWrapper id="address1" content={initialState.address1} label={'住所１'} />
	</Row>
	<Row>
		<DetailWrapper id="address2" content={initialState.address2} label={'住所2'} />
	</Row>
	<Row>
		<DetailWrapper id="phone-number" content={initialState.phoneNumber} label={'電話番号'} />
		<DetailWrapper id="phone-number" content={initialState.mobile} label={'携帯電話'} />
		<DetailWrapper id="fax" content={initialState.fax} label={'FAX番号'} />
	</Row>
	<Row>
		<DetailWrapper id="email" content={initialState.email} label={'メール'} />
	</Row>

	{#if isCompany}
		<Row>
			<DetailWrapper id="homepage" content={initialState.homepage} label={'ホームページ'} />
		</Row>

		<Row>
			<DetailWrapper
				id="number-of-employees"
				content={initialState.numberOfEmployees.toString()}
				label={'従業員数'}
				unit={'名'}
			/>
		</Row>
		<Row>
			<DetailWrapper
				id="number-of-facilities"
				content={initialState.numberOfFacilities.toString()}
				label={'関連施設拠点数'}
				unit={'軒'}
			/>
		</Row>

		<Row>
			<DetailWrapper
				id="google-review"
				content={initialState.reviews !== undefined ? initialState.reviews : ''}
				label={'口コミ'}
			/>
		</Row>

		<Row>
			<DetailWrapper
				id="business-list"
				content={initialState.business !== undefined ? initialState.business : ''}
				label={'事業一覧'}
			/>
		</Row>

		<Row>
			<DetailWrapper content={initialState.year} label={'設立年月日'} unit={'年'} />
			<DetailWrapper content={initialState.month} unit={'月'} />
			<DetailWrapper content={initialState.founder} label={'設立者'} />
		</Row>
	{/if}

	<Row>
		<div class="detail-wrapper bedding">
			<h3 class="label">診療科目</h3>
			<div class="container">
				{#each initialState.departments as department}
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
	</Row>

	<Row>
		<DetailWrapper content={initialState.personInCharge} label={'ご担当者名'} />

		<DetailWrapper content={initialState.personInChargeRole} label={'役職'} />
	</Row>

	<Row>
		<DetailWrapper content={initialState.personInChargeMemo} label={'ご担当メモ'} />
	</Row>

	<Row>
		<DetailWrapper content={initialState.approver} label={'決裁者'} />
	</Row>

	<Row>
		<DetailWrapper content={initialState.contactTime} label={'連絡の取りやすい時間'} />
	</Row>

	<Row>
		<DetailWrapper content={initialState.miscellaneous} label={'その他'} />
	</Row>

	<Row>
		<div class="detail-wrapper">
			<h3 class="label">{'参考書類など 画像データ'}</h3>
			<div class="container container--horizontal">
				{#if initialState.pictures !== undefined}
					{#each initialState.pictures as image}
						<article class="card">
							<div class="image-wrapper">
								<!-- <img src={URL.createObjectURL(image.file)} alt={image.memo} /> -->
								<img src={image.data} alt={image.memo} />
							</div>
							<h3 class="label">{image.memo}</h3>
						</article>
					{/each}
				{/if}
			</div>
		</div>
	</Row>
</div>

<style lang="scss">
	.confirmation {
		overflow: hidden;
		width: auto;
		padding: 0 37px;
		padding-top: 28px;
		padding-bottom: 48px;

		border-radius: 16px;
		background-color: #fff;

		box-shadow: 0px 8px 8px rgb(200, 200, 200);
	}

	:global(.confirmation > .form-row) {
		border-bottom: 1px solid var(--placeholder);

		&:last-child {
			border: none;
		}
	}

	:global(.detail-wrapper .label) {
		color: var(--gray);
		font-size: 18px;
		font-weight: 500;
		width: auto;
	}

	:global(.detail-wrapper:first-child .label) {
		width: 130px;
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
