<script lang="ts" context="module">
	import { goto } from '$app/navigation'
	import { user, roles, users } from '@/stores/users'
	import { debounce, toKebab } from '@/libs/utils'
	import type { Role, User, UserKey } from '@/libs/types'
	import ResultModal from '@/views/modals/ResultModal.svelte'
</script>

<script lang="ts">
	const currentUser: {
		employeeNumber: string
		name: string
		belongsTo: string
		role: Role
		email: string
	} = {
		employeeNumber: '',
		name: '',
		belongsTo: '',
		role: <Role>'',
		email: ''
	}

	$: fieldsets = [
		{
			id: 'employeeNumber',
			type: 'number',
			text: '社員番号',
			isError: false,
			errorText: '社員番号は0より大きい数を入力してください。'
		},
		{
			id: 'name',
			type: 'text',
			text: '氏名'
		},
		{
			id: 'belongsTo',
			type: 'text',
			text: '所属'
		},
		{
			id: 'role',
			type: 'text',
			list: 'roles',
			options: $roles,
			text: 'ロール',
			isError: false,
			errorText: 'ロールは選択肢に該当するものを選んでください。'
		},
		{
			id: 'email',
			type: 'text',
			text: 'メールアドレス',
			isError: false,
			errorText: 'メールアドレスを入力してください。'
		}
	] as {
		id: UserKey
		type: string
		list?: string
		options?: string[]
		text: string
		isError?: boolean
		errorText?: string
	}[]

	$: isDisabled = !Object.keys(currentUser).every(key => {
		const localKey = <UserKey>key
		const localUser = currentUser[localKey]
		const fieldset = fieldsets.find(fieldset => fieldset.id === localKey)

		return (
			(typeof localUser === 'number' ? localUser > 0 : localUser !== '') &&
			fieldset &&
			!fieldset.isError
		)
	})

	let isNavigating: boolean = false
	let isShown: boolean = false
	let isSucceeded: boolean = false

	const onInput = debounce((event: Event, id: string) => {
		if (currentUser.hasOwnProperty(id)) {
			const content: string = (<HTMLInputElement>event.target).value
			const fieldset = fieldsets.find(fieldset => fieldset.id === id)

			switch (id) {
				case 'employeeNumber':
					currentUser[id] = content.replace(/^0+(?=\d)/, '')

					if (fieldset) fieldset.isError = parseInt(currentUser[id], 10) <= 0
					break

				case 'name':
				case 'belongsTo':
					currentUser[id] = content
					break

				case 'role':
					currentUser[id] = <Role>content

					if (fieldset) fieldset.isError = !$roles.includes(<Role>content)

					break

				case 'email':
					currentUser[id] = content
					if (fieldset)
						fieldset.isError = !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
							currentUser[id]
						)
					break
			}
		}
	}, 200)

	const goBack = () => goto('/users')

	const onClick = () => {
		if (confirm('ページを移動しますか？')) {
			isNavigating = true
			goBack()
		}
	}

	const onSubmit = debounce(async (event: Event) => {
		event.preventDefault()

		if (!isDisabled) {
			try {
				const formData = new FormData()

				for (const key in currentUser) formData.append(key, <string>currentUser[<UserKey>key])

				const localUser: User = {
					employeeNumber: 0,
					name: '',
					belongsTo: '',
					role: <Role>'',
					email: ''
				}

				for (let key in localUser) {
					key = <UserKey>key

					if (localUser.hasOwnProperty(key)) {
						switch (key) {
							case 'employeeNumber':
								localUser[key] = parseInt(currentUser[key], 10)
								break

							case 'role':
								localUser[key] = <Role>currentUser[key]
								break

							case 'name':
							case 'belongsTo':
							case 'email':
								localUser[key] = currentUser[key]
								break
						}
					}
				}

				users.set([...$users, localUser])
				isShown = true
				isSucceeded = true
			} catch (error) {
				isShown = true
				isSucceeded = false
			}
		}
	}, 200)

	$: {
		if (isShown && isSucceeded) setTimeout(() => goBack(), 2000)
	}
</script>

<div class="container">
	{#if $user.role === 'システム管理者'}
		<form class="form" on:submit={event => onSubmit(event)}>
			{#each fieldsets as fieldset}
				<fieldset>
					<label for={toKebab(fieldset.id)}>{fieldset.text}</label>
					<div class="input-container">
						{#if fieldset.isError && fieldset.errorText}
							<span class="font-error">{fieldset.errorText}</span>
						{/if}
						<input
							class:error={fieldset.isError}
							type={fieldset.type}
							id={toKebab(fieldset.id)}
							value={currentUser[fieldset.id]}
							list={fieldset.list ?? ''}
							on:input={event => onInput(event, fieldset.id)}
						/>
					</div>
					{#if fieldset.list && fieldset.options}
						<datalist id={fieldset.list}>
							{#each fieldset.options as _, index}
								<option value={fieldset.options[index]} />
							{/each}
						</datalist>
					{/if}
				</fieldset>
			{/each}
			<div class="btns">
				<button class="secondary" type="button" on:click={onClick}>戻る</button>
				<button class="primary" class:disabled={isDisabled} type="submit">登録</button>
			</div>
		</form>
		{#if isShown}
			<ResultModal {isSucceeded} on:click={() => (isSucceeded ? goBack() : (isShown = false))} />
		{/if}
	{:else}
		<p>アクセス権限がありません。</p>
		<button class="primary" on:click={() => goto('/users')}>戻る</button>
	{/if}
</div>

<style lang="scss">
	.container {
		width: 100%;

		.form {
			background: #fff;
			border-radius: 16px;
			padding: 32px;
			margin: 0 auto;

			> fieldset {
				margin-bottom: 16px;
				text-align: center;

				label {
					display: inline-block;
					width: 160px;
					text-align: left;
				}

				.input-container {
					display: inline-block;
					width: 320px;
					text-align: left;

					> input {
						width: 100%;
						padding: 4px 8px;
						margin-top: 4px;
					}
				}
			}

			.btns {
				margin-top: 32px;
				text-align: center;

				button {
					display: inline-block;

					&:first-child {
						margin-right: 32px;
					}
				}
			}
		}

		> p {
			text-align: center;
			margin-bottom: 16px;
		}
	}
</style>
