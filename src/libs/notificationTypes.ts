import type { Role } from '@/libs/types'

export type Notification = {
	roles: Role[]
	title: string
	content: string
	type: 'アップデート' | '重要なお知らせ' | '障害情報' | '機能のご紹介'
	hasRead: boolean
}
