<script lang="ts" context="module">
	import { goto } from '$app/navigation'
	import { user, users } from '@/stores/users'
	import type { Login, User } from '@/libs/types'
	import { debounce } from '@/libs/utils'
	import Icon from '@/components/Icon.svelte'

	const keys: Login[] = ['employeeNumber', 'password']

	const errorTexts: {
		employeeNumber: string
		password: string
	} = {
		employeeNumber: '社員番号は0より大きい数を入力してください。',
		password: '社員番号とパスワードが一致しません。'
	}
</script>

<script lang="ts">
	let error: Login | undefined = undefined
	let isHidden = true

	const loginData: {
		employeeNumber: string
		password: string
	} = {
		employeeNumber: '',
		password: ''
	}

	$: isDisabled = keys.some(key => loginData[key] === '' || error)

	const onInput = debounce((event: Event, key: Login) => {
		error = undefined
		const content: string = (<HTMLInputElement>event.target).value
		loginData[key] = key === 'password' ? content : content.replace(/^0+(?=\d)/, '')

		if (key === 'employeeNumber' && parseInt(loginData[key], 10) <= 0) error = key
	}, 200)

	const onSubmit = debounce(async (event: Event) => {
		event.preventDefault()

		if (!isDisabled) {
			try {
				const formData = new FormData()

				for (const key in loginData) formData.append(key, <string>loginData[<Login>key])

				if (loginData.password !== 'pass') error = 'password'
				else {
					user.set(
						<User>(
							$users.find(
								localUser => localUser.employeeNumber === parseInt(loginData.employeeNumber),
								10
							)
						)
					)
					goto('/users')
				}
			} catch (error) {}
		}
	}, 200)
</script>

<div class="login">
	<div class="left">
		<img class="logo" src="./../../logo.svg" alt="logo" />
	</div>
	<form class="right" on:submit={onSubmit}>
		{#if error}
			<span class="font-error">{errorTexts[error]}</span>
		{/if}
		{#each keys as key}
			<fieldset class="fieldset">
				<Icon icon={{ path: key === 'password' ? 'password' : 'user' }} />
				<input
					class:error={(error && key === 'employeeNumber') || error === 'password'}
					type={key === 'employeeNumber' ? 'number' : isHidden ? 'password' : 'text'}
					value={loginData[key]}
					placeholder={key === 'password' ? 'パスワード' : '社員番号'}
					on:input={event => onInput(event, key)}
				/>
				{#if key === 'password'}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<span on:click={() => (isHidden = !isHidden)}>
						{#if isHidden}
							<Icon icon={{ path: 'eye-slash' }} />
						{:else}
							<Icon icon={{ path: 'eye' }} />
						{/if}
					</span>
				{/if}
			</fieldset>
		{/each}
		<button class="primary login-btn" class:disabled={isDisabled} type="submit">ログイン</button>
		<span class="horizontal-line" />
		<button class="password-btn" type="button">パスワード変更</button>
	</form>
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
			background: #fff;
			border-radius: 8px;
			text-align: center;

			> span {
				display: block;
				margin-bottom: 8px;
			}

			> .fieldset {
				position: relative;
				display: inline-flex;
				align-items: center;
				width: 320px;
				margin-bottom: 32px;

				> input {
					width: 100%;
					padding: 8px 16px;
					margin-left: 16px;

					&::placeholder {
						color: var(--gray);
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
			}

			.login-btn {
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
