<script lang="ts">
	export let dataType: string = ''
	export let datas: string[] = []
	export let value: string = ''
	export let unit: string = ''
	export let label: string = ''
	export let required: boolean = false
	export let isValid: boolean = true
	export let labelClass: string = ''
	export let placeholder: string = ''
	export let classInput: string = ''

	import { inputIsValid } from '@/routes/customers/utils/validations'

	const prefectures = [
		'北海道',
		'青森県',
		'岩手県',
		'宮城県',
		'秋田県',
		'山形県',
		'福島県',
		'茨城県',
		'栃木県',
		'群馬県',
		'埼玉県',
		'千葉県',
		'東京都',
		'神奈川県',
		'新潟県',
		'富山県',
		'石川県',
		'福井県',
		'山梨県',
		'長野県',
		'岐阜県',
		'静岡県',
		'愛知県',
		'三重県',
		'滋賀県',
		'京都府',
		'大阪府',
		'兵庫県',
		'奈良県',
		'和歌山県',
		'鳥取県',
		'島根県',
		'岡山県',
		'広島県',
		'山口県',
		'徳島県',
		'香川県',
		'愛媛県',
		'高知県',
		'福岡県',
		'佐賀県',
		'長崎県',
		'熊本県',
		'大分県',
		'宮崎県',
		'鹿児島県',
		'沖縄県'
	]

	const handleChange = (e: any) => {
		const input = e.target.value
		console.log('hello')

		isValid = inputIsValid(dataType, input)
	}
</script>

<div class="input-wrapper {dataType} {isValid ? '' : 'error'} {classInput}">
	{#if label !== ''}
		<label for={dataType} class="label {labelClass}">{label}{required ? '*' : ''}</label>
	{/if}
	<input
		autocomplete="off"
		list="{dataType}s"
		id={dataType}
		name={dataType}
		on:blur={handleChange}
		{placeholder}
		class="input"
		bind:value
	/>

	{#if unit !== ''}
		<span class="unit">{unit}</span>
	{/if}

	<datalist id="{dataType}s" class="datalist">
		{#each datas as data}
			<option class="option" value={data}>{data}</option>
		{/each}
	</datalist>
</div>

<style lang="scss">
	@mixin responsiveInputWidth($width) {
		width: calc((($width - 10 - 2) / 1366) * 100vw);
	}
	.input-wrapper {
		display: flex;
		gap: 10px;
		position: relative;
		align-self: center;
		margin-bottom: 20px;

		// margin-bottom: 32px;
	}

	.mb-0 {
		margin-bottom: 0;
	}
	.input {
		height: 32px;
		@include responsiveInputWidth((114));
		border-radius: 3px;
		padding-left: 10px;
		font-size: 1rem;
		border: 1px solid rgb(206, 205, 205);
		border-radius: 3px;

		&:focus {
			border-color: #2fa8e1;
		}
	}

	// .datalist {
	// 	position: absolute;
	// 	top: 0;
	// 	left: 0;
	// 	height: 100px;
	// 	width: 400px;
	// }

	.option:hover {
		background-color: lightblue;
	}

	// .unit {
	// 	margin-left: 10px;
	// }

	.error {
		.input {
			border: 1.5px solid #f55d3e;
		}
	}

	.label {
		// display: inline-block;

		width: max-content;
		font-size: 18px;
		font-weight: 500;

		&-width {
			&--md {
				min-width: 74px;
			}
			&--lg {
				min-width: 130px;
			}
		}
	}

	// .label {
	// 	display: inline-block;
	// 	width: 400px !important;
	// }
</style>
