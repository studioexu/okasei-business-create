<script lang="ts" context="module">
	import Icon from '@/components/Icon.svelte'
</script>

<script lang="ts">
	$: isHidden = true
</script>

<div class="login">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
	</div>
	<div class="right">
		<fieldset class="fieldset">
			<Icon icon={{ path: 'user', color: '#595857' }} />
			<input type="text" placeholder="社員番号" />
		</fieldset>
		<fieldset class="fieldset">
			<Icon icon={{ path: 'password', color: '#595857' }} />
			<input type={isHidden ? 'password' : 'text'} placeholder="パスワード" />
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span on:click={() => (isHidden = !isHidden)}>
				{#if isHidden}
					<Icon icon={{ path: 'eye-slash', color: '#595857' }} />
				{:else}
					<Icon icon={{ path: 'eye', color: '#595857' }} />
				{/if}
			</span>
		</fieldset>
		<button class="login-btn">ログイン</button>
		<span class="horizontal-line" />
		<button class="password-btn">パスワード変更</button>
	</div>
</div>

<style lang="scss">
	.login {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;

		> .left,
		> .right {
			width: 480px;
			padding: 64px;
		}

		> .left {
			display: flex;
			align-items: center;

			> .logo {
				height: 80px;
				width: auto;
			}
		}

		> .right {
			background-color: #fff;
			border-radius: 8px;
			text-align: center;

			> .fieldset {
				position: relative;
				display: inline-flex;
				align-items: center;
				width: 320px;
				margin-bottom: 32px;

				> input {
					width: 100%;
					border: 1px solid #7b7c7d;
					border-radius: 0;
					padding: 8px 16px;
					margin-left: 16px;

					&::placeholder {
						color: #7b7c7d;
					}
				}

				> span {
					position: absolute;
					right: 8px;
					display: inherit;
					cursor: pointer;
				}
			}

			.login-btn,
			.password-btn {
				width: 320px;
				border-radius: 16px;
				padding: 16px 24px;

				&:hover {
					opacity: 0.5;
				}
			}

			.login-btn {
				background: var(--primary-color);
				color: #fff;
				font-weight: bold;
			}

			.password-btn {
				background: none;
				color: var(--gray);
				border: 1px solid var(--gray);
			}

			.horizontal-line {
				display: block;
				width: 100%;
				height: 1px;
				background: var(--gray);
				margin: 32px 0;
			}
		}
	}
</style>
