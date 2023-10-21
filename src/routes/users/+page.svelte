<script lang="ts" context="module">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import Icon from '@/components/Icon.svelte'
	import { debounce, toKebab } from '@/libs/utils'
	import { user, users } from '@/stores/users'
	import type { Role, SortedItemForUser, User } from '@/libs/types'
	import DeleteModal from '@/views/modals/DeleteModal.svelte'
</script>

<script lang="ts">
	const isAdmin: boolean = $user.role === 'システム管理者'

	const fieldsets: { id: SortedItemForUser; type: string; list?: string; text: string }[] = [
		{
			id: 'employeeNumber',
			type: 'number',
			text: '社員番号'
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
		}
	]

	const sortedValues: { employeeNumber: string; name: string; belongsTo: string } = {
		employeeNumber: '',
		name: '',
		belongsTo: ''
	}

	$: sortedUsers = $users.filter(user =>
		Object.keys(sortedValues).every(key => {
			const localKey = <SortedItemForUser>key
			return `${user[localKey]}`.includes(sortedValues[localKey])
		})
	)

	$: dividedUsers =
		sortedUsers.length > 0
			? sortedUsers.flatMap((_, i, self) => (i % 10 ? [] : [self.slice(i, i + 10)]))
			: []

	const max: number = 3
	let current: number = 0

	$: generatePagination = (users: User[][]): number[] => {
		const numbers: number[] = []

		for (let i = 0; i < Math.min(users.length, max); i++) {
			if (current < max - 1 || users.length <= max) numbers.push(i + 1)
			else if (users.length - max < current && current < users.length)
				numbers.unshift(users.length - i)
			else numbers.push(current + i)
		}

		return numbers
	}

	$: pagination = generatePagination(dividedUsers)

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

	const movePage = (
		page: 'to-first' | 'prev' | 'next' | 'to-last' | number,
		isActive: boolean = false
	): void => {
		switch (page) {
			case 'to-first':
				current = 0
				break

			case 'prev':
				current--
				break

			case 'next':
				current++
				break

			case 'to-last':
				current = dividedUsers.length - 1
				break

			default:
				if (!isActive) current = page
		}
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
	<table class="users-table">
		<thead>
			<tr>
				<th class="employee-number">社員番号</th>
				<th class="name">氏名</th>
				<th class="belongs-to">所属</th>
				<th class="role">ロール</th>
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
						<td class="name">{user.name}</td>
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
<div class="pagination">
	<div class="pagination-container">
		{#if current > 1 && dividedUsers.length > max}
			<button on:click={() => movePage(0)}><Icon icon={{ path: 'to-first' }} /></button>
		{/if}
		{#if current > 0}
			<button on:click={() => movePage('prev')}><Icon icon={{ path: 'to-prev' }} /></button>
		{/if}
		{#each pagination as num}
			<button
				class:active={num - 1 === current}
				on:click={() => movePage(num - 1, num - 1 === current)}>{num}</button
			>
		{/each}
		{#if current < dividedUsers.length - 1}
			<button on:click={() => movePage('next')}><Icon icon={{ path: 'to-next' }} /></button>
		{/if}
		{#if current < dividedUsers.length - 2 && dividedUsers.length > max}
			<button on:click={() => movePage('to-last')}><Icon icon={{ path: 'to-last' }} /></button>
		{/if}
	</div>
</div>
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
		display: flex;
		justify-content: end;
		flex-wrap: wrap;
		margin-bottom: 48px;

		&-table {
			width: 100%;
			background: #fff;
			border-radius: 16px;
			padding: 32px;

			thead,
			tbody {
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
			}

			thead tr {
				border-bottom: 1px solid var(--gray);
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
				width: 160px;
			}

			.name {
				width: 240px;
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

	.pagination {
		text-align: center;

		&-container {
			display: inline-flex;
			justify-content: center;

			> button {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 40px;
				background: none;
				color: var(--black);
				border-radius: 20px;
				margin-right: 32px;

				&:last-child {
					margin-right: 0;
				}

				> :global(.svg-icon) {
					height: 18px * 1.2;
				}
			}

			.active {
				background: var(--primary-color);
				color: #fff;
				cursor: default;

				&:hover {
					opacity: 1;
				}
			}
		}
	}
</style>
