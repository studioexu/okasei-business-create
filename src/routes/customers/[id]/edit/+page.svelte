<script lang="ts">
	import Confirmation from './components/Confirmation.svelte'
	import ConfirmationBis from './components/ConfirmationBis.svelte'
	import Form from './components/Form.svelte'

	export let data

	let company = data.company
	console.log(data)

	let checkIsTrue = false

	const handleEditClicked = () => {
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
		<!-- {#if checkIsTrue} -->
		<ConfirmationBis bind:company bind:checkIsTrue />
		<!-- {:else} -->
		<Form bind:checkIsTrue bind:company />
		<!-- {/if} -->
	</div>

	<footer class="section__footer">
		<div class="form__footer">
			{#if checkIsTrue}
				<button class="btn btn--edit" on:click={handleEditClicked}>修正</button>
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

		&--edit {
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
