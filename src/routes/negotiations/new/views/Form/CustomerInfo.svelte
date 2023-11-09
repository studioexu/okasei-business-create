<script lang="ts">
	import Input from '../../Components/Input.svelte'
	import Select from '../../Components/Select.svelte'

	interface Picture {
		file: File
		memo: string
	}

	interface Department {
		department: string
		bedQuantity: string
	}

	export let initialState1: any
	export let updateIndexArray: Function
	export let isShown: boolean

	let bedIndexArray: string[] = []
	let maxBedIndex = 1

	$: bedIndexArray = updateIndexArray(maxBedIndex)

	const handleAddDepartment = () => {
		let array = initialState1.departments

		array.push({
			index: '',
			department: '',
			bedQuantity: '0'
		})

		initialState1.departments = array
	}

	const handleDeleteImage = (e: any) => {
		const imageToDelete = e.target.closest('.image-wrapper').id

		initialState1.pictures = initialState1.pictures.filter(
			(image: Picture) => image.file.name !== imageToDelete
		)
	}

	// let total: number = 0
	const getTotal = (departmentArray: Department[]): number => {
		let total = 0

		departmentArray.map((department: Department) => (total += parseInt(department.bedQuantity)))
		return total
	}

	$: total = getTotal(initialState1.departments)

	$: initialState1.departments.map((department: Department) =>
		console.log(parseInt(department.bedQuantity))
	)
</script>

<fieldset class="fieldset">
	<legend class="fieldset__header"> お客様情報 </legend>
	<div class="fieldset__main">
		<div class="form-row">
			<Input
				name={'name'}
				label={'施設名'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState1.name}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'customer-number'}
				label={'顧客番号'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				bind:value={initialState1.cd}
			/>
			<Input
				name={'branch-number'}
				label={'枝番'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				bind:value={initialState1.branchNumber}
			/>
			<Input
				name={'institution-number'}
				label={'医療機関番号'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				bind:value={initialState1.institutionCd}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'business'}
				label={'事業内容'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState1.business}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'homepage'}
				label={'HP'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState1.url}
			/>
		</div>
		<div class="form-row">
			<Select name={'google-reviews'} label={'Google評価'} options={['★あり', '無し']} />
			<Input
				name={'reviews'}
				label={'口コミ'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState1.googleReview}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'direct-line'}
				label={'固定回線'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState1.directLine}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'fax'}
				label={'FAX番号'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState1.fax}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'email'}
				label={'メール'}
				placeholder={'未入力'}
				inputSize={'input--lg'}
				bind:value={initialState1.email}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'mobile-phone'}
				label={'携帯電話'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState1.mobile}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'number-of-employees'}
				label={'従業員数'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				unit={'名'}
				bind:value={initialState1.numberOfEmployees}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'number-of-branches'}
				label={'関連施設拠点数'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				unit={'軒'}
				bind:value={initialState1.numberOfBranches}
			/>
		</div>

		<div class="form-row">
			<Input
				name={'miscellaneous'}
				label={'その他'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
				bind:value={initialState1.miscellaneous}
			/>
		</div>

		<div class="form-row bed">
			<h3 class="label">診療科目</h3>
			<div class="column">
				{#each initialState1.departments as department}
					<div class="department-wrapper">
						<Select
							options={['内科', '外科', '診療内科']}
							name={'departments'}
							bind:value={department.department}
						/>
						<Input
							name={'bed-quatity'}
							label={'病床数'}
							placeholder={'未入力'}
							inputSize={'input--sm'}
							bind:value={department.bedQuantity}
						/>
					</div>
				{/each}
			</div>
			<div class="bed-total">
				<h3 class="label">'病床数合計'</h3>
				<span class="content">{total}</span>
			</div>

			<!-- </div> -->
		</div>
		<div class="form-row">
			<!-- svelte-ignore a11y-missing-content -->
			<h3 class="label" />
			<button class="btn primary" on:click={handleAddDepartment}>+新規追加</button>
		</div>

		<div class="form-row">
			<Input
				name={'person-in-charge'}
				label={'ご担当者名'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState1.personInCharge}
			/>
			<Input
				name={'role'}
				label={'役職'}
				placeholder={'未入力'}
				inputSize={'input--sm'}
				bind:value={initialState1.personInChargeRole}
			/>
		</div>

		<div class="form-row">
			<Input
				name={'person-in-charge-memo'}
				label={'ご担当メモ'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
				bind:value={initialState1.persoInChargeMemo}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'approver'}
				label={'決裁者'}
				placeholder={'未入力'}
				inputSize={'input--md'}
				bind:value={initialState1.approver}
			/>
		</div>
		<div class="form-row">
			<Input
				name={'prefered-contact-time'}
				label={'連絡の取りやすい時間'}
				placeholder={'未入力'}
				inputSize={'input--xl'}
				bind:value={initialState1.contactTime}
			/>
		</div>

		<div class="form-row">
			<h3 class="label">参考書類など 画像データ</h3>
			<div style="width: 100%;">
				{#if initialState1.pictures.length === 0}
					<div class="image-wrapper">
						<button class="image-empty" on:click={() => (isShown = true)}>
							<span>+</span>
						</button>
						<p class="image-description">画像がアップロードされていません。</p>
					</div>
				{:else}
					{#each initialState1.pictures as image, index}
						<div class="image-wrapper" id={image.file.name}>
							<img class="image" src={URL.createObjectURL(image.file)} alt="" />
							<Input
								placeholder="メモ"
								name={'image-description'}
								inputSize={'input--lg'}
								bind:value={image.memo}
							/>
							<!-- <input type="text" placeholder="メモ" class="image-description" /> -->
							<button class="btn primary delete" on:click={handleDeleteImage}>削除</button>
						</div>
					{/each}
				{/if}
				<button class="btn add primary" on:click={() => (isShown = true)}>＋画像追加</button>
			</div>
		</div>
	</div>
</fieldset>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
	}

	.fieldset {
		&__header {
			color: var(--primary);
			font-weight: 700;
			margin-bottom: 18px;
		}
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}

	.image {
		height: 124px;
		width: 200px;
		object-fit: contain;
	}

	.image-wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		gap: 18px;
		background-color: #f4f4f4;
		padding: 10px 21px;
		border-radius: 8px;
		margin-bottom: 12px;
	}

	.image-empty {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 124px;
		width: 200px;
		border: 2px dashed var(--primary);
		border-radius: 8px;
		margin: 0;

		span {
			font-size: 48px;
			color: var(--primary);
		}
	}

	.image-description {
		height: 32px;
		width: 100%;
	}

	.bed-total {
		display: flex;
		align-items: center;
		height: 32px;
		align-self: flex-end;
	}

	.department-wrapper {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.form-row.bed {
		justify-content: flex-start;
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: 18px;
	}

	.btn {
		margin: 0;
		align-self: flex-start;
		padding: 0;
		padding-top: 0;
		padding-bottom: 0;
		height: 32px;

		&.delete {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			height: 32px;
			width: 70px;
			min-width: 0;
			margin-left: auto;
		}
	}
</style>
