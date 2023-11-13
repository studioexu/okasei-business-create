<script lang="ts" context="module">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { user, roles, users, created, updated } from '@/stores/users'
	import { debounce, toKebab, toNumber } from '@/libs/utils'
	import type { EditedData, Role, User, UserKey } from '@/libs/types'
	import ResultModal from '@/views/modals/ResultModal.svelte'

	const createdTexts: EditedData = {
		user: '登録者',
		date: '登録日',
		time: '登録時刻'
	}

	const updatedTexts: EditedData = {
		user: '更新者',
		date: '更新日',
		time: '更新時刻'
	}

	const keys: ('user' | 'date' | 'time')[] = ['user', 'date', 'time']

	const generateEditedData = (data: { user: string; datetime: Date }): EditedData => {
		const obj: EditedData = { user: '', date: '', time: '' }

		if (data.user !== '') {
			obj.user = data.user
			const datetime: Date = data.datetime
			const convert = (num: number) => `0${num}`.slice(-2)

			obj.date = `${datetime.getFullYear()}/${convert(datetime.getMonth() + 1)}/${convert(
				datetime.getDate()
			)}`
			obj.time = `${datetime.getHours()}:${convert(datetime.getMinutes())}:${convert(
				datetime.getSeconds()
			)}`
		}

		return obj
	}
</script>

<script lang="ts">
	const currentUser: User = <User>$users.find(user => `${user.employeeNumber}` === $page.params.id)
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

	let isConfirming: boolean = false

	$: isDisabled = !Object.keys($user).every(key => {
		const localKey = <UserKey>key
		const value = currentUser[localKey]
		const fieldset = fieldsets.find(fieldset => fieldset.id === localKey)

		return (typeof value === 'number' ? value > 0 : value !== '') && fieldset && !fieldset.isError
	})

	let isNavigating: boolean = false
	let isShown: boolean = false
	let isSucceeded: boolean = false

	const createdAt: EditedData = generateEditedData($created)
	const updatedAt: EditedData = generateEditedData($updated)

	const onInput = debounce((event: Event, id: string) => {
		if ($user.hasOwnProperty(id)) {
			const content: string = (<HTMLInputElement>event.target).value
			const fieldset = fieldsets.find(fieldset => fieldset.id === id)

			switch (id) {
				case 'employeeNumber':
					currentUser[id] = toNumber(content.replace(/^0+(?=\d)/, ''))

					if (fieldset) fieldset.isError = currentUser[id] <= 0

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

				for (const key in $user) formData.append(key, <string>currentUser[<UserKey>key])

				users.set(
					$users.map(localUser =>
						localUser.employeeNumber === currentUser.employeeNumber ? currentUser : localUser
					)
				)
				isShown = true
				isSucceeded = true
			} catch (error) {
				isShown = true
				isSucceeded = false
			}
		}
	}, 200)

	$: {
		if (isConfirming && isShown && isSucceeded) setTimeout(() => goBack(), 2000)
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
							readonly={isConfirming || fieldset.id === 'employeeNumber'}
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
				<button
					class="secondary"
					type="button"
					on:click={() => (isConfirming ? (isConfirming = false) : onClick())}
				>
					{isConfirming ? '修正' : '戻る'}
				</button>
				{#if isConfirming}
					<button class="primary" type="submit">登録</button>
				{:else}
					<button
						class="primary"
						class:disabled={isDisabled}
						type="button"
						on:click={() => (isConfirming = true)}>確認</button
					>
				{/if}
			</div>
		</form>
		<dl class="history">
			<div>
				{#each keys as key}
					<dt>{createdTexts[key]}</dt>
					<dd>{createdAt[key]}</dd>
				{/each}
			</div>
			{#if updatedAt.user !== ''}
				<div>
					{#each keys as key}
						<dt>{updatedTexts[key]}</dt>
						<dd>{updatedAt[key]}</dd>
					{/each}
				</div>
			{/if}
		</dl>
		{#if isConfirming && isShown}
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

		.history {
			margin-top: 32px;

			div {
				display: flex;
				align-items: center;

				&:last-child {
					margin-top: 8px;
				}

				dt {
					width: 64px;
				}

				dd {
					width: 102px;
					margin-right: 16px;

					&:last-child {
						margin-right: 0;
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
