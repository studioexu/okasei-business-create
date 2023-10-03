<script lang="ts">
	import Confirmation from './components/Confirmation.svelte'
	import Form from './components/Form.svelte'

	let numberOfBedInput = 1

	let checkIsTrue = false

	interface Info {
		title: string
		class: string
		data: string
	}

	let info1: Info[] = [
		{ title: '顧客番号', class: 'customer-number', data: '' },
		{ title: '枝番', data: '', class: 'branch-number' },
		{ title: '施設名', data: '', class: 'name' },
		{ title: 'カナ', data: '', class: 'kana' },
		{ title: '医療機関番号', data: '', class: 'institution-number' },
		{ title: '区分', data: '', class: 'company-type' }
	]

	let address: Info[] = [
		{ title: '郵便番号', data: '', class: 'postal' },
		{ title: '都道府県', data: '', class: 'region' },
		{ title: '市区町村', data: '', class: 'city' },
		{ title: '住所１', data: '', class: 'address1' },
		{ title: '住所2', data: '', class: 'address2' },
		{ title: '電話番号', data: '', class: 'phone' },
		{ title: 'FAX番号', data: '', class: 'fax' }
	]

	let foundation = [
		{ title: '年', data: '', class: 'year' },
		{ title: '月', data: '', class: 'month' },
		{ title: '設立者', data: '', class: 'founder' }
	]

	let info2: Info[] = [
		{ title: '従業員数', data: '', class: 'number-employee' },
		{ title: 'ホームページ', data: '', class: 'homepage' },
		{ title: '関連施設拠点数', data: '', class: 'facility-quantity' }
	]

	let date = {
		year: { title: '年', data: '', class: 'year' },
		month: { title: '月', data: '', class: 'month' }
	}

	$: foundation[0].data = date.year.data
	$: foundation[1].data = date.month.data

	const handleCorrectClicked = () => {
		checkIsTrue = false
	}
</script>

<section class="section section--form">
	<header class="section__header">
		{#if checkIsTrue}
			<h2 class="section__header__title">下記の内容で登録しますか？</h2>
		{/if}
	</header>

	<div class="section__main">
		{#if checkIsTrue}
			<Confirmation {info1} {info2} {address} {foundation} />
		{:else}
			<Form bind:info1 bind:info2 bind:address bind:foundation bind:checkIsTrue />
		{/if}
	</div>

	<footer class="section__footer">
		<div class="form__footer">
			{#if checkIsTrue}
				<button class="btn btn--correct" on:click={handleCorrectClicked}>修正</button>
			{/if}
			<button class="btn btn--submit" form="registration-form">登録</button>
		</div>
	</footer>
</section>

<style lang="scss">
	.btn {
		background-color: #2fa8e1;
		color: #fff;
		margin: 0;

		&--add {
			padding: 0 11px;
			margin-top: 14px;
			height: 32px;
			border-radius: 3px;
			margin-left: 140px;
		}

		&--submit {
			position: relative;
			width: 108px;
			height: 45px;
			&::after {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: #fff;
				left: 0;
				top: 0;
				opacity: 0;
				transition: opacity 300ms;
			}

			&:hover {
				&::after {
					opacity: 0.3;
				}
			}
			// margin-left: auto;
		}

		&--correct {
			width: 108px;
			height: 45px;
			background-color: transparent;
			color: #2fa8e1;
			border: #2fa8e1 1px solid;
			transition: all 300ms;

			&:hover {
				background-color: #2fa8e1;
				color: #fff;
			}
		}
	}

	.form__footer {
		display: flex;
		justify-content: flex-end;
		gap: 1rem;
		margin-top: 1.5rem;
		padding-bottom: 24px;
	}
</style>
