<script lang="ts" context="module">
	import Icon from '@/components/Icon.svelte'
	import type { Role } from '@/libs/types'
	import { debounce } from '@/libs/utils'
</script>

<script lang="ts">
	const users: {
		employeeNumber: number
		name: string
		belongsTo: string
		role: Role
		email: string
	}[] = [
		{
			employeeNumber: 1,
			name: 'John Doe',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'john.doe@example.com'
		},
		{
			employeeNumber: 2,
			name: 'Jane Smith',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'jane.smith@example.com'
		},
		{
			employeeNumber: 3,
			name: 'Bob Johnson',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'bob.johnson@example.com'
		},
		{
			employeeNumber: 4,
			name: 'Emily Davis',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'emily.davis@example.com'
		},
		{
			employeeNumber: 5,
			name: 'Michael Wilson',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'michael.wilson@example.com'
		},
		{
			employeeNumber: 6,
			name: 'Olivia Brown',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'olivia.brown@example.com'
		},
		{
			employeeNumber: 7,
			name: 'James Lee',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'james.lee@example.com'
		},
		{
			employeeNumber: 8,
			name: 'Sophia Moore',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'sophia.moore@example.com'
		},
		{
			employeeNumber: 9,
			name: 'Benjamin Hall',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'benjamin.hall@example.com'
		},
		{
			employeeNumber: 10,
			name: 'Emma Harris',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'emma.harris@example.com'
		},
		{
			employeeNumber: 11,
			name: 'Liam Clark',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'liam.clark@example.com'
		},
		{
			employeeNumber: 12,
			name: 'Ava Rodriguez',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'ava.rodriguez@example.com'
		},
		{
			employeeNumber: 13,
			name: 'Lucas Walker',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'lucas.walker@example.com'
		},
		{
			employeeNumber: 14,
			name: 'Mia Perez',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'mia.perez@example.com'
		},
		{
			employeeNumber: 15,
			name: 'Mason Lewis',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'mason.lewis@example.com'
		},
		{
			employeeNumber: 16,
			name: 'Harper Hill',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'harper.hill@example.com'
		},
		{
			employeeNumber: 17,
			name: 'Ethan Scott',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'ethan.scott@example.com'
		},
		{
			employeeNumber: 18,
			name: 'Liam Carter',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'liam.carter@example.com'
		},
		{
			employeeNumber: 19,
			name: 'Emma Hall',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'emma.hall@example.com'
		},
		{
			employeeNumber: 20,
			name: 'Oliver Turner',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'oliver.turner@example.com'
		},
		{
			employeeNumber: 21,
			name: 'Ava Bennett',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'ava.bennett@example.com'
		},
		{
			employeeNumber: 22,
			name: 'Sophia Perez',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'sophia.perez@example.com'
		},
		{
			employeeNumber: 23,
			name: 'Lucas White',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'lucas.white@example.com'
		},
		{
			employeeNumber: 24,
			name: 'Aiden Lewis',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'aiden.lewis@example.com'
		},
		{
			employeeNumber: 25,
			name: 'Ella Anderson',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'ella.anderson@example.com'
		},
		{
			employeeNumber: 26,
			name: 'Ethan Martin',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'ethan.martin@example.com'
		},
		{
			employeeNumber: 27,
			name: 'Mia Thompson',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'mia.thompson@example.com'
		},
		{
			employeeNumber: 28,
			name: 'Lucas Lee',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'lucas.lee@example.com'
		},
		{
			employeeNumber: 29,
			name: 'Aiden Harris',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'aiden.harris@example.com'
		},
		{
			employeeNumber: 30,
			name: 'Liam Thomas',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'liam.thomas@example.com'
		},
		{
			employeeNumber: 31,
			name: 'Ava Scott',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'ava.scott@example.com'
		},
		{
			employeeNumber: 32,
			name: 'Oliver Brown',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'oliver.brown@example.com'
		},
		{
			employeeNumber: 33,
			name: 'Sophia Davis',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'sophia.davis@example.com'
		},
		{
			employeeNumber: 34,
			name: 'Lucas Turner',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'lucas.turner@example.com'
		},
		{
			employeeNumber: 35,
			name: 'Emma Turner',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'emma.turner@example.com'
		},
		{
			employeeNumber: 36,
			name: 'Mia White',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'mia.white@example.com'
		},
		{
			employeeNumber: 37,
			name: 'James White',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'james.white@example.com'
		},
		{
			employeeNumber: 38,
			name: 'Sophia Clark',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'sophia.clark@example.com'
		},
		{
			employeeNumber: 39,
			name: 'Ava Davis',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'ava.davis@example.com'
		},
		{
			employeeNumber: 40,
			name: 'Liam Smith',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'liam.smith@example.com'
		},
		{
			employeeNumber: 41,
			name: 'Harper Martin',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'harper.martin@example.com'
		},
		{
			employeeNumber: 42,
			name: 'Sophia White',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'sophia.white@example.com'
		},
		{
			employeeNumber: 43,
			name: 'Liam Johnson',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'liam.johnson@example.com'
		},
		{
			employeeNumber: 44,
			name: 'Lucas Anderson',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'lucas.anderson@example.com'
		},
		{
			employeeNumber: 45,
			name: 'Sophia Smith',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'sophia.smith@example.com'
		},
		{
			employeeNumber: 46,
			name: 'Mia Jones',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'mia.jones@example.com'
		},
		{
			employeeNumber: 47,
			name: 'Benjamin Turner',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'benjamin.turner@example.com'
		},
		{
			employeeNumber: 48,
			name: 'Ella Smith',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'ella.smith@example.com'
		},
		{
			employeeNumber: 49,
			name: 'Oliver Thomas',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'oliver.thomas@example.com'
		},
		{
			employeeNumber: 50,
			name: 'Aiden Martin',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'aiden.martin@example.com'
		},
		{
			employeeNumber: 51,
			name: 'Olivia Walker',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'olivia.walker@example.com'
		},
		{
			employeeNumber: 52,
			name: 'James Allen',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'james.allen@example.com'
		},
		{
			employeeNumber: 53,
			name: 'Benjamin Lewis',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'benjamin.lewis@example.com'
		},
		{
			employeeNumber: 54,
			name: 'Aiden Perez',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'aiden.perez@example.com'
		},
		{
			employeeNumber: 55,
			name: 'Lucas Walker',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'lucas.walker@example.com'
		},
		{
			employeeNumber: 56,
			name: 'Harper Rodriguez',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'harper.rodriguez@example.com'
		},
		{
			employeeNumber: 57,
			name: 'Mia Hill',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'mia.hill@example.com'
		},
		{
			employeeNumber: 58,
			name: 'Ella Smith',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'ella.smith@example.com'
		},
		{
			employeeNumber: 59,
			name: 'Ethan Turner',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'ethan.turner@example.com'
		},
		{
			employeeNumber: 60,
			name: 'Oliver Lee',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'oliver.lee@example.com'
		},
		{
			employeeNumber: 61,
			name: 'Sophia Harris',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'sophia.harris@example.com'
		},
		{
			employeeNumber: 62,
			name: 'James Walker',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'james.walker@example.com'
		},
		{
			employeeNumber: 63,
			name: 'Olivia Harris',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'olivia.harris@example.com'
		},
		{
			employeeNumber: 64,
			name: 'Lucas Lewis',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'lucas.lewis@example.com'
		},
		{
			employeeNumber: 65,
			name: 'Benjamin Turner',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'benjamin.turner@example.com'
		},
		{
			employeeNumber: 66,
			name: 'Sophia Anderson',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'sophia.anderson@example.com'
		},
		{
			employeeNumber: 67,
			name: 'Oliver Walker',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'oliver.walker@example.com'
		},
		{
			employeeNumber: 68,
			name: 'Mia Turner',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'mia.turner@example.com'
		},
		{
			employeeNumber: 69,
			name: 'Ella Clark',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'ella.clark@example.com'
		},
		{
			employeeNumber: 70,
			name: 'James Perez',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'james.perez@example.com'
		},
		{
			employeeNumber: 71,
			name: 'Ethan Brown',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'ethan.brown@example.com'
		},
		{
			employeeNumber: 72,
			name: 'Liam Smith',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'liam.smith@example.com'
		},
		{
			employeeNumber: 73,
			name: 'Olivia Walker',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'olivia.walker@example.com'
		},
		{
			employeeNumber: 74,
			name: 'Sophia Turner',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'sophia.turner@example.com'
		},
		{
			employeeNumber: 75,
			name: 'Ava Lewis',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'ava.lewis@example.com'
		},
		{
			employeeNumber: 76,
			name: 'Lucas Anderson',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'lucas.anderson@example.com'
		},
		{
			employeeNumber: 77,
			name: 'Mia Davis',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'mia.davis@example.com'
		},
		{
			employeeNumber: 78,
			name: 'Ella Thomas',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'ella.thomas@example.com'
		},
		{
			employeeNumber: 79,
			name: 'James Lee',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'james.lee@example.com'
		},
		{
			employeeNumber: 80,
			name: 'Benjamin White',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'benjamin.white@example.com'
		},
		{
			employeeNumber: 81,
			name: 'Sophia Clark',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'sophia.clark@example.com'
		},
		{
			employeeNumber: 82,
			name: 'Aiden Turner',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'aiden.turner@example.com'
		},
		{
			employeeNumber: 83,
			name: 'Oliver Turner',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'oliver.turner@example.com'
		},
		{
			employeeNumber: 84,
			name: 'Emma Perez',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'emma.perez@example.com'
		},
		{
			employeeNumber: 85,
			name: 'Liam Johnson',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'liam.johnson@example.com'
		},
		{
			employeeNumber: 86,
			name: 'Ella Thompson',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'ella.thompson@example.com'
		},
		{
			employeeNumber: 87,
			name: 'Ava Turner',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'ava.turner@example.com'
		},
		{
			employeeNumber: 88,
			name: 'Sophia Davis',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'sophia.davis@example.com'
		},
		{
			employeeNumber: 89,
			name: 'Ethan Walker',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'ethan.walker@example.com'
		},
		{
			employeeNumber: 90,
			name: 'Oliver Lewis',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'oliver.lewis@example.com'
		},
		{
			employeeNumber: 91,
			name: 'Ava Scott',
			belongsTo: '営業部',
			role: 'システム管理者',
			email: 'ava.scott@example.com'
		},
		{
			employeeNumber: 92,
			name: 'James Brown',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'james.brown@example.com'
		},
		{
			employeeNumber: 93,
			name: 'Sophia White',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'sophia.white@example.com'
		},
		{
			employeeNumber: 94,
			name: 'Aiden Johnson',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'aiden.johnson@example.com'
		},
		{
			employeeNumber: 95,
			name: 'Ella Harris',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'ella.harris@example.com'
		},
		{
			employeeNumber: 96,
			name: 'Liam Turner',
			belongsTo: '営業部',
			role: 'システム運用者',
			email: 'liam.turner@example.com'
		},
		{
			employeeNumber: 97,
			name: 'Lucas Martin',
			belongsTo: '人事部',
			role: '外回り担当',
			email: 'lucas.martin@example.com'
		},
		{
			employeeNumber: 98,
			name: 'Emma Harris',
			belongsTo: '開発部',
			role: '清掃担当',
			email: 'emma.harris@example.com'
		},
		{
			employeeNumber: 99,
			name: 'Benjamin Walker',
			belongsTo: '総務部',
			role: '倉庫担当',
			email: 'benjamin.walker@example.com'
		},
		{
			employeeNumber: 100,
			name: 'Oliver Turner',
			belongsTo: '開発部',
			role: '電話担当',
			email: 'oliver.turner@example.com'
		}
	]
	const searchedValues: { employeeNumber: string; name: string; belongsTo: string } = {
		employeeNumber: '',
		name: '',
		belongsTo: ''
	}

	$: sortedUsers = users.filter(user =>
		Object.keys(searchedValues).every(key => {
			const localKey = <'employeeNumber' | 'name' | 'belongsTo'>key
			return `${user[localKey]}`.includes(searchedValues[localKey])
		})
	)

	$: dividedUsers =
		sortedUsers.length > 0
			? sortedUsers.flatMap((_, i, self) => (i % 10 ? [] : [self.slice(i, i + 10)]))
			: []

	const max: number = 3
	let current: number = 0

	$: generatePagination = (
		users: {
			employeeNumber: number
			name: string
			belongsTo: string
			role: Role
			email: string
		}[][]
	): number[] => {
		const numbers: number[] = []

		for (let i = 0; i < Math.min(users.length, max); i++) {
			if (current < max || users.length <= max) numbers.push(i + 1)
			else if (users.length - max - 1 < current && current < users.length)
				numbers.unshift(users.length - i)
			else numbers.push(current + i)
		}

		return numbers
	}

	$: pagination = generatePagination(dividedUsers)

	const onInput = debounce((event: Event, key: 'employeeNumber' | 'name' | 'belongsTo') => {
		let content: string = (<HTMLInputElement>event.target).value

		searchedValues[key] = key === 'employeeNumber' ? content : content.replace(/^0+(?=\d)/, '')
		current = 0
	}, 500)

	const onClick = (type: string, index?: number) => {
		switch (type) {
			case 'to-first':
				current = 0
				break

			case 'prev':
				current--
				break

			case 'pagination':
				if (index) current = index
				break

			case 'next':
				current++
				break
		}
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
</script>

<div class="search">
	<fieldset>
		<label for="employee-number">社員番号</label><input
			type="number"
			id="employee-number"
			on:input={event => onInput(event, 'employeeNumber')}
		/>
	</fieldset>
	<fieldset>
		<label for="name">氏名</label><input
			type="text"
			id="name"
			on:input={event => onInput(event, 'name')}
		/>
	</fieldset>
	<fieldset>
		<label for="belong-to">所属</label><input
			type="text"
			id="belong-to"
			on:input={event => onInput(event, 'belongsTo')}
		/>
	</fieldset>
</div>
<div class="users">
	<button class="btn primary-btn" on:click={() => onClick('new')}>新規登録</button>
	<table class="users-table">
		<thead>
			<tr>
				<th>社員番号</th>
				<th>氏名</th>
				<th>所属</th>
				<th>ロール</th>
				<th>メールアドレス</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody>
			{#if dividedUsers.length > 0}
				{#each dividedUsers[current] as user, index}
					<tr>
						<td>{user.employeeNumber}</td>
						<td>{user.name}</td>
						<td>{user.belongsTo}</td>
						<td>{user.role}</td>
						<td>{user.email}</td>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<td
							><span on:click={() => onClick('edit', index)}
								><Icon icon={{ path: 'edit', color: '#0093d0' }} /></span
							></td
						>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-static-element-interactions -->
						<td>
							<span on:click={() => onClick('delete', index)}
								><Icon icon={{ path: 'delete', color: '#0093d0' }} /></span
							>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>
<div class="pagination">
	<div class="pagination-container">
		{#if current > 1 && dividedUsers.length > max}
			<button on:click={() => movePage(0)}
				><Icon icon={{ path: 'to-first', color: '#595857' }} /></button
			>
		{/if}
		{#if current > 0}
			<button on:click={() => movePage('prev')}
				><Icon icon={{ path: 'to-prev', color: '#595857' }} /></button
			>
		{/if}
		{#each pagination as num}
			<button
				class:active={num - 1 === current}
				on:click={() => movePage(num - 1, num - 1 === current)}>{num}</button
			>
		{/each}
		{#if current < dividedUsers.length - 1}
			<button on:click={() => movePage('next')}
				><Icon icon={{ path: 'to-next', color: '#595857' }} /></button
			>
		{/if}
		{#if current < dividedUsers.length - 2 && dividedUsers.length > max}
			<button on:click={() => movePage('to-last')}
				><Icon icon={{ path: 'to-last', color: '#595857' }} /></button
			>
		{/if}
	</div>
</div>

<style lang="scss">
	.search {
		display: flex;
		justify-content: center;

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

	.users {
		display: flex;
		justify-content: end;
		flex-wrap: wrap;
		margin-bottom: 48px;

		.btn {
			display: inline-block;
			border-radius: 8px;
			padding: 8px 16px;
			margin: 32px 0;
		}

		&-table {
			display: block;
			width: 100%;
			background: #fff;
			border-radius: 16px;
			padding: 32px;
			margin: 0 auto;

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
				padding: 8px 16px;

				&:first-child {
					width: 160px;
				}

				&:nth-child(2) {
					width: 240px;
				}

				&:nth-child(3),
				&:nth-child(4) {
					width: 192px;
				}

				&:nth-child(5) {
					width: 320px;
				}

				&:nth-child(6),
				&:last-child {
					display: inline-flex;
					align-items: center;
					justify-content: center;
					width: 64px;
				}
			}

			td {
				&:first-child {
					text-align: right;
				}

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
