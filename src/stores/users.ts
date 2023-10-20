import { readable, writable, type Writable } from 'svelte/store'
import type { Readable } from 'svelte/motion'
import type { Role, User } from '@/libs/types'

export const user: Writable<User> = writable(<User>{})

export const roles: Readable<Role[]> = readable([
	'システム管理者',
	'外回り担当',
	'倉庫担当',
	'清掃担当',
	'電話担当',
	'システム運用者'
])

export const users: Writable<User[]> = writable([
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
])

export const created: Readable<{ user: string; datetime: Date }> = readable({
	user: 'Jane Smith',
	datetime: new Date(2023, 9, 14, 16, 28, 5, 114)
})

export const updated: Readable<{ user: string; datetime: Date }> = readable({
	user: 'Sophia Clark',
	datetime: new Date()
})
