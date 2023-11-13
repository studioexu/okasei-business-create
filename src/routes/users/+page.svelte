<script lang="ts" context="module">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { debounce, toKebab } from '@/libs/utils'
	import { user, users } from '@/stores/users'
	import type { Role, SortedItemForUser } from '@/libs/types'
	import Icon from '@/components/Icon.svelte'
	import Pagination from '@/views/Pagination.svelte'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'

	const fieldsets: { id: SortedItemForUser; type: string; list?: string; text: string }[] = [
		{ id: 'employeeNumber', type: 'number', text: '社員番号' },
		{ id: 'name', type: 'text', text: '氏名' },
		{ id: 'belongsTo', type: 'text', text: '所属' }
	]
</script>

<script lang="ts">
	const isAdmin: boolean = $user.role === 'システム管理者'

	const sortedValues: { employeeNumber: string; name: string; belongsTo: string } = {
		employeeNumber: '',
		name: '',
		belongsTo: ''
	}

	$: sortedUsers = $users.filter(user =>
		Object.keys(sortedValues).every(key => {
			const localKey = <SortedItemForUser>key
			if (localKey === 'name')
				return `${user[localKey].toLowerCase()}`.includes(sortedValues[localKey].toLowerCase())

			return `${user[localKey]}`.includes(sortedValues[localKey])
		})
	)

	$: dividedUsers =
		sortedUsers.length > 0
			? sortedUsers.flatMap((_, i, self) => (i % 10 ? [] : [self.slice(i, i + 10)]))
			: []

	let current: number = 0

	let isShown: boolean = false
	let currentUser: number | undefined = undefined
	let phase: 'shown' | 'success' | 'error' = 'shown'

	const onInput = debounce((event: Event, key: SortedItemForUser) => {
		const content: string = (<HTMLInputElement>event.target).value

		sortedValues[key] = key === 'employeeNumber' ? content.replace(/^0+(?=\d)/, '') : content
		current = 0
	}, 200)

	const openModal = (index: number) => {
		isShown = true
		currentUser = dividedUsers[current][<number>index].employeeNumber
	}

	const movePage = (event: { detail: { page: number } }): void => {
		current = event.detail.page
	}

	const onClick = (event: { detail: { key: string } }) => {
		switch (event.detail.key) {
			case 'cancel':
				isShown = false
				break

			case 'delete':
				try {
					users.set($users.filter(localUser => localUser.employeeNumber !== currentUser))

					if ($user.employeeNumber === currentUser) {
						user.set({
							employeeNumber: 0,
							name: '',
							belongsTo: '',
							role: <Role>'',
							email: ''
						})

						goto('/')
						phase = 'shown'
					} else phase = 'success'
				} catch (error) {
					phase = 'error'
				}
				break

			case 'success':
				isShown = false
				phase = 'shown'
				break

			case 'error':
				phase = 'shown'
				break
		}
	}

	$: {
		if (isShown && phase === 'success')
			setTimeout(() => {
				isShown = false
				phase = 'shown'
			}, 2000)
	}

	onMount(() => {
		if (!$user.hasOwnProperty('employeeNumber')) goto('/')
	})
</script>

<div class="search">
	<div class="search-container">
		<div>
			{#each fieldsets as fieldset}
				<fieldset>
					<label for={toKebab(fieldset.id)}>{fieldset.text}</label>
					<input
						type={fieldset.type}
						id={toKebab(fieldset.id)}
						on:input={event => onInput(event, fieldset.id)}
					/>
				</fieldset>
			{/each}
		</div>
		{#if isAdmin}
			<button class="primary" on:click={() => goto('/users/new')}>新規登録</button>
		{/if}
	</div>
</div>
<div class="users">
	<div class="users-container">
		<table class="users-table">
			<thead>
				<tr>
					<th class="employee-number">社員番号</th>
					<th>氏名</th>
					<th>所属</th>
					<th>ロール</th>
					<th class="email">メールアドレス</th>
					{#if isAdmin}
						<th class="icon" />
						<th class="icon" />
					{/if}
				</tr>
			</thead>
			<tbody>
				{#if dividedUsers.length > 0}
					{#each dividedUsers[current] as user, index}
						<tr>
							<td class="employee-number">{user.employeeNumber}</td>
							<td>{user.name}</td>
							<td>{user.belongsTo}</td>
							<td>{user.role}</td>
							<td class="email">{user.email}</td>
							{#if isAdmin}
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<td class="icon"
									><span
										on:click={() => goto(`/users/${dividedUsers[current][index].employeeNumber}`)}
										><Icon icon={{ path: 'edit', color: '#0093d0' }} /></span
									></td
								>
								<!-- svelte-ignore a11y-click-events-have-key-events -->
								<!-- svelte-ignore a11y-no-static-element-interactions -->
								<td class="icon">
									<span on:click={() => openModal(index)}
										><Icon icon={{ path: 'delete', color: '#0093d0' }} /></span
									>
								</td>
							{/if}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
<Pagination pages={dividedUsers} {current} on:click={movePage} />
{#if isAdmin && isShown}
	<DeleteModal {phase} on:click={onClick} />
{/if}

<style lang="scss">
	.search {
		text-align: center;

		&-container {
			display: inline-block;

			div {
				display: flex;
				justify-content: center;
				margin-bottom: 32px;

				fieldset {
					margin-right: 32px;

					&:last-child {
						margin-right: 0;
					}

					input {
						padding: 4px 8px;
						margin-left: 8px;
					}
				}
			}

			button {
				float: right;
				margin: 0 0 32px 0;
			}
		}
	}

	.users {
		margin-bottom: 48px;

		&-container {
			width: 100%;
			background: #fff;
			padding: 32px 0 24px 0;
			border-radius: 16px;
		}

		&-table {
			display: flex;
			flex-wrap: wrap;
			width: calc(100% - 64px);
			margin: 0 auto;
			overflow-x: scroll;

			thead,
			tbody {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				tr {
					display: flex;
					flex-wrap: nowrap;
				}
			}

			thead tr {
				border-bottom: 1px solid var(--gray);
			}

			tbody tr:last-child {
				margin-bottom: 8px;
			}

			th,
			td {
				display: inline-block;
				width: 192px;
				padding: 8px 16px;
			}

			td:first-child {
				text-align: right;
			}

			.employee-number {
				width: 144px;
			}

			.email {
				width: 320px;
			}

			.icon {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				width: 64px;

				span {
					cursor: pointer;

					&:hover {
						opacity: 0.5;
					}

					> :global(.svg-icon) {
						height: 18px * 1.2;
					}
				}
			}
		}
	}
</style>
