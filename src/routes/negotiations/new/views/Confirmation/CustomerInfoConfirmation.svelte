<script lang="ts">
	interface Picture {
		file: File
		memo: string
	}

	interface Department {
		department: string
		bedQuantity: string
	}
	interface custInfo1 {
		name: string
		cd: string
		branchNumber: string
		institutionCd: string
		business: string
		url: string
		googleReview: string
		directLine: string
		fax: string
		email: string
		mobile: string
		numberOfEmployees: string
		numberOfBranches: string
		miscellaneous: string
		departments: Department[]
		personInCharge: string
		personInChargeRole: string
		personInChargeMemo: string
		approver: string
		contactTime: string
		pictures: Picture[]
	}
	export let initialState1: custInfo1

	const initialState1Array = Object.keys(initialState1).map(key => {
		return { title: key, content: initialState1[key as keyof Object] }
	})

	const labelName = [
		'施設名',
		'顧客番号',
		'枝番',
		'医療機関番号',
		'事業内容',
		'HP',
		'Google評価',
		'口コミ',
		'固定回線',
		'FAX番号',
		'メール',
		'携帯電話',
		'従業員数',
		'関連施設拠点数',
		'その他',
		'診療科目',
		'ご担当者名',
		'役職',
		'ご担当メモ',
		'決裁者',
		'連絡の取りやすい時間',
		'参考書類など 画像データ'
	]

	$: initialState1Array

	$: console.log(initialState1Array)

	const getTotal = (departmentArray: Department[]): number => {
		let total = 0

		departmentArray.map((department: Department) => (total += parseInt(department.bedQuantity)))
		return total
	}

	$: total = getTotal(initialState1.departments)
</script>

<div class="customer-info-confirmation">
	<!-- {#each initialState1Array as info, index}

		<div class="form-row">
			<h3 class="label">{labelName[index]}</h3>
			<p>{info.content}</p>
		</div>
	{/each} -->

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[0]}</h3>
			<p class="content">{initialState1.name}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[1]}</h3>
			<p class="content">{initialState1.cd}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{labelName[2]}</h3>
			<p class="content">{initialState1.branchNumber}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{labelName[3]}</h3>
			<p class="content">{initialState1.institutionCd}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[4]}</h3>
			<p class="content">{initialState1.business}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[5]}</h3>
			<p class="content">{initialState1.url}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[6]}</h3>
			<p class="content">{initialState1.googleReview.length > 0 ? '★有り' : '無し'}</p>
		</div>

		<div class="wrapper">
			<h3 class="label">{labelName[7]}</h3>
			<p class="content">{initialState1.googleReview}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[8]}</h3>
			<p class="content">{initialState1.directLine}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[9]}</h3>
			<p class="content">{initialState1.fax}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[10]}</h3>
			<p class="content">{initialState1.email}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[11]}</h3>
			<p class="content">{initialState1.mobile}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[12]}</h3>
			<p class="content">{initialState1.numberOfEmployees}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[13]}</h3>
			<p class="content">{initialState1.numberOfBranches}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[14]}</h3>
			<p class="content">{initialState1.miscellaneous}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[15]}</h3>

			<div class="departments-container">
				{#each initialState1.departments as department}
					<div class="bed-wrapper">
						<p class="department">{department.department}</p>
						<p class="quatity-title">病床数</p>
						<p class="quantity">{department.bedQuantity}</p>
					</div>
				{/each}
			</div>

			<div class="total-wrapper">
				<p class="total-title">病床数合計</p>
				<p class="total-quantity">{total}</p>
			</div>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[16]}</h3>
			<p class="content">{initialState1.personInCharge}</p>
		</div>
		<div class="wrapper">
			<h3 class="label">{labelName[17]}</h3>
			<p class="content">{initialState1.personInChargeRole}</p>
		</div>
	</div>

	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[18]}</h3>
			<p class="content">{initialState1.personInChargeMemo}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[19]}</h3>
			<p class="content">{initialState1.approver}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[20]}</h3>
			<p class="content">{initialState1.contactTime}</p>
		</div>
	</div>
	<div class="form-row">
		<div class="wrapper">
			<h3 class="label">{labelName[21]}</h3>
			<div class="pictures-container">
				{#each initialState1.pictures as image}
					<div class="card">
						<div class="image-wrapper">
							<img src={URL.createObjectURL(image.file)} alt="" />
						</div>
						<p class="title">{image.memo}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
		border-bottom: 1px solid #f4f4f4;
		padding-bottom: 20px;
		&:last-child {
			border: none;
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.wrapper {
		display: flex;
		gap: 18px;

		&:first-child {
			.label {
				width: 130px;
			}
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

	.pictures-container {
		display: flex;
		gap: 18px;
		flex-wrap: wrap;
	}

	.bed-wrapper {
		display: flex;
		align-items: center;
		width: 200px;
		gap: 13px;
		justify-content: flex-end;
		.department {
			margin-right: auto;
		}
	}

	.total-wrapper {
		margin-left: 80px;
		display: flex;
		align-items: center;
		gap: 13px;
		height: fit-content;
	}
</style>
