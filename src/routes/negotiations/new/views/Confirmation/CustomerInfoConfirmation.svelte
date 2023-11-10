<script lang="ts">
	export let initialState1: Object

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
		'ご担当メモ',
		'決裁者',
		'連絡の取りやすい時間',
		'参考書類など 画像データ'
	]

	$: initialState1Array

	$: console.log(initialState1Array)
</script>

<div class="customer-info-confirmation">
	{#each initialState1Array as info, index}
		<div class="form-row">
			<h3 class="label">{labelName[index]}</h3>
			<p>{info.content}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.form-row {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin-bottom: 20px;
		gap: 12px;
	}

	.label {
		font-size: 18px;
		font-weight: 400;
		width: 130px;
	}
</style>
