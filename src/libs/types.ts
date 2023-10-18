export interface EditedData {
	user: string
	date: string
	time: string
}

export type Role = 'システム管理者' | '外回り担当' | '倉庫担当' | '清掃担当' | '電話担当' | 'システム運用者'

export type SortedItemForUser = 'employeeNumber' | 'name' | 'belongsTo'

export interface User {
	employeeNumber: number
	name: string
	belongsTo: string
	role: Role
	email: string
}

export type UserKey = SortedItemForUser | 'role' | 'email'