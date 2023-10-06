<script lang="ts" context="module">
</script>

<script lang="ts">
	import BedContainer from './components/BedContainer.svelte'
	import BeddingWrapper from './components/BeddingWrapper.svelte'
	import FoundationWrapper from './components/FoundationWrapper.svelte'
	import Wrapper from './components/Wrapper.svelte'
	export let data

	let company = data.company

	let bedQuantity: number = 0

	company.bedding.forEach(bed => (bedQuantity += parseInt(bed.quantity)))

	console.log(company)
</script>

<div class="section--confirmation">
	<!-- <header>hello</header> -->
	<div class="container">
		<Wrapper areaClass="customerNumber" content={company.id} title={'顧客番号'} />
		<Wrapper areaClass="branchNumber" content={company.branchNumber} title={'枝番'} />
		<Wrapper areaClass="facilityName" content={company.facilityName} title={'施設名'} />
		<Wrapper areaClass="kana" content={company.kana} title={'カナ'} />

		<Wrapper areaClass="facilityNumber" content={company.facilityNumber} title={'医療機関番号'} />
		<Wrapper areaClass="businessType" content={company.businessType} title={'区分'} />

		<Wrapper areaClass="postalCode" content={company.address.postalCode} title={'郵便番号'} />
		<Wrapper areaClass="prefecture" content={company.address.prefecture} title={'都道府県'} />
		<Wrapper areaClass="city" content={company.address.city} title={'市区町村'} />
		<Wrapper areaClass="address1" content={company.address.address1} title={'住所１'} />
		<Wrapper areaClass="address2" content={company.address.address2} title={'住所2'} />
		<Wrapper areaClass="phoneNumber" content={company.address.phoneNumber} title={'電話番号'} />
		<Wrapper areaClass="fax" content={company.address.fax} title={'FAX番号'} />

		<Wrapper areaClass="homepage" content={company.homepage} title={'ホームページ'} />
		<Wrapper areaClass="numberOfEmployees" content={company.numberOfEmployees} title={'従業員数'} />
		<Wrapper
			areaClass="numberOfFacilities"
			content={company.numberOfFacilities}
			title={'関連施設拠点数'}
		/>

		<BeddingWrapper total={bedQuantity}>
			{#each company.bedding as bedding}
				<BedContainer department={bedding.department} quantity={bedding.quantity} />
			{/each}
		</BeddingWrapper>

		<FoundationWrapper
			year={company.foundation.year}
			month={company.foundation.month}
			founder={company.foundation.founder}
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
					<p class="registration__data__content">{company.registration.registrationDate}</p>
				</div>
				<div class="registration__data">
					<h3 class="registration__data__title">登録時刻</h3>
					<p class="registration__data__content">{company.registration.registrationTime}</p>
				</div>
			</div>

			{#if company.update.status !== ''}
				<div class="registration">
					<div class="registration__data">
						<h3 class="registration__data__title">更新者名</h3>
						<p class="registration__data__content">山田太郎</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新日</h3>
						<p class="registration__data__content">{company.update.lastUpdatedDate}</p>
					</div>
					<div class="registration__data">
						<h3 class="registration__data__title">更新時刻</h3>
						<p class="registration__data__content">{company.update.lastUpdatedTime}</p>
					</div>
				</div>
			{/if}
		</div>

		<div class="button-container">
			<a class="btn btn--edit" href="/customers/{company.id}/edit">編集</a>
		</div>
	</footer>
</div>

<style lang="scss">
	.container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		grid-template-rows: auto;
		grid-template-areas:
			'customerNumber customerNumber branchNumber branchNumber . . . . . .'
			'facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName facilityName'
			'kana kana kana kana kana kana kana kana kana kana'
			'facilityNumber facilityNumber businessType businessType . . . . . .'
			'postalCode postalCode postalCode . . . . . . . '
			'prefecture prefecture city city address1 address1 address1 address2 address2 address2'
			'phoneNumber phoneNumber phoneNumber fax fax fax . . . .'
			'foundation foundation foundation foundation foundation  foundation foundation foundation foundation foundation'
			'bedding bedding bedding bedding bedding bedding bedding . . .'
			'numberOfEmployees numberOfEmployees numberOfEmployees numberOfEmployees . . . . . .'
			'homepage homepage homepage homepage homepage homepage homepage homepage homepage homepage'
			'numberOfFacilities numberOfFacilities numberOfFacilities . . . . . . .';
	}

	.btn {
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;

		// background-color: #2fa8e1;
		// color: #fff;
		margin: 0;
		width: 108px;
		height: 45px;
		background-color: #2fa8e1;
		color: #fff;

		&::after {
			content: ' ';
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			top: 0;
			background-color: #fff;
			opacity: 0;
			transition: opacity 300ms;
		}

		&--edit {
			// color: #2fa8e1;
			// border: #2fa8e1 1px solid;
			transition: all 300ms;

			&:hover {
				&::after {
					opacity: 0.2;
				}
			}
		}
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
