<script lang="ts">
	import { fly } from 'svelte/transition'
	import DetailWrapper from '@/components/DetailWrapper.svelte'
	import type { CustomerEntries } from '@/libs/customerTypes'
	import { getTotalOfBeds } from '@/libs/utils'
	export let initialState: CustomerEntries

	let bedTotal: number = 0

	const customerInformation = [
		[
			{
				label: '顧客番号',
				content: initialState.id !== undefined ? initialState.id : '',
				unit: ''
			},
			{
				label: '枝番',
				content: initialState.branchNumber,
				unit: ''
			},
			{
				label: '決算月',
				content: initialState.closingMonth,
				unit: '月'
			}
		],

		[
			{
				label: '施設名',
				content: initialState.customerName,
				unit: ''
			}
		],
		[
			{
				label: 'カナ',
				content: initialState.kana,
				unit: ''
			}
		],
		[
			{
				label: '医療機関番号',
				content: initialState.facilityNumber,
				unit: ''
			},
			{
				label: '区分',
				content: initialState.businessType,
				unit: ''
			}
		],
		[
			{
				label: '郵便番号',
				content: initialState.postalCode,
				unit: ''
			}
		],
		[
			{
				label: '都道府県',
				content: initialState.prefecture,
				unit: ''
			},
			{
				label: '市区町村',
				content: initialState.city,
				unit: ''
			}
		],
		[
			{
				label: '住所１',
				content: initialState.address1,
				unit: ''
			}
		],
		[
			{
				label: '住所2',
				content: initialState.address2,
				unit: ''
			}
		],
		[
			{
				label: '電話番号',
				content: initialState.phoneNumber,
				unit: ''
			},
			{
				label: '携帯電話',
				content: initialState.mobile,
				unit: ''
			},
			{
				label: 'FAX番号',
				content: initialState.fax,
				unit: ''
			}
		],
		[
			{
				label: 'メール',
				content: initialState.email,
				unit: ''
			}
		],
		[
			{
				label: 'ホームページ',
				content: initialState.homepage,
				unit: ''
			}
		],
		[
			{
				label: '従業員数',
				content: initialState.numberOfEmployees.toString(),
				unit: '名'
			}
		],
		[
			{
				label: '関連施設拠点数',
				content: initialState.numberOfFacilities.toString(),
				unit: '軒'
			}
		],
		[
			{
				label: '口コミ',
				content: initialState.reviews !== undefined ? initialState.reviews : '',
				unit: ''
			}
		],
		[
			{
				label: '事業一覧',
				content: initialState.business !== undefined ? initialState.business : '',
				unit: ''
			}
		],
		[
			{
				label: '設立年月日',
				content: initialState.year,
				unit: '年'
			},
			{
				content: initialState.month,
				unit: '月'
			},
			{
				label: '設立者',
				content: initialState.founder,
				unit: ''
			}
		],
		[
			{
				label: '診療科目',
				content: initialState.departments,
				unit: ''
			}
		],
		[
			{
				label: 'ご担当者名',
				content: initialState.personInCharge,
				unit: ''
			},
			{
				label: '役職',
				content: initialState.personInChargeRole,
				unit: ''
			},
			{
				label: 'ご担当メモ',
				content: initialState.personInChargeMemo,
				unit: ''
			}
		],
		[
			{
				label: '決裁者',
				content: initialState.approver,
				unit: ''
			}
		],
		[
			{
				label: 'その他',
				content: initialState.miscellaneous,
				unit: ''
			}
		],
		[
			{
				label: '参考書類など 画像データ',
				content: initialState.pictures,
				unit: ''
			}
		]
	]

	$: bedTotal = getTotalOfBeds(initialState.departments)
</script>

<div class="confirmation" in:fly={{ x: 200, duration: 1000 }}>
	{#each customerInformation as information}
		<div class="form-row">
			{#each information as detail}
				{#if detail.label === '診療科目'}
					<div class="detail-wrapper bedding">
						<h3 class="label">{detail.label}</h3>
						<div class="container">
							{#each initialState.departments as department}
								<div class="bed-wrapper">
									<h3 class="label">{department.departmentName}</h3>
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
								<p class="total__content">{bedTotal}</p>
							</div>
						</div>
					</div>
				{:else if detail.label === '参考書類など 画像データ'}
					<div class="detail-wrapper">
						<h3 class="label">{detail.label}</h3>
						<div class="container container--horizontal">
							{#if initialState.pictures !== undefined}
								{#each initialState.pictures as image}
									<div class="card">
										<div class="image-wrapper">
											<img src={URL.createObjectURL(image.file)} alt={image.memo} />
										</div>
										<p class="label">{image.memo}</p>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				{:else}
					<DetailWrapper
						label={detail.label}
						content={typeof detail.content === 'string' ? detail.content : ''}
						unit={detail.unit}
					/>
				{/if}
			{/each}
		</div>
	{/each}

	<!-- <div class="form-row">
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
						<h3 class="label">{department.departmentName}</h3>
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
					<p class="total__content">{bedTotal}</p>
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
								<img src={URL.createObjectURL(image.file)} alt={image.memo} />
							</div>
							<p class="label">{image.memo}</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div> -->
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

	:global(.detail-wrapper) {
		position: relative;
		display: flex;
		padding: 11px 0;
		column-gap: 18px;
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

	.detail-wrapper {
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
