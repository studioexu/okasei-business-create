import { writable, type Writable } from 'svelte/store'
import type { Notification } from '@/libs/notificationTypes'

export const notifications: Writable<Notification[]> = writable([
	{
		roles: ['システム管理者', 'システム運用者'],
		title: 'システムメンテナンスのお知らせ',
		content: 'システムメンテナンスが予定されています。詳細は以下をご確認ください。',
		type: 'アップデート',
		hasRead: true
	},
	{
		roles: ['外回り担当', '電話担当'],
		title: '緊急対応が必要なお知らせ',
		content: '緊急事態が発生しました。外回り担当および電話担当の方は迅速な対応をお願いします。',
		type: '重要なお知らせ',
		hasRead: false
	},
	{
		roles: ['倉庫担当', '清掃担当'],
		title: '新機能のご紹介',
		content:
			'倉庫担当および清掃担当の方へ、新しい機能が導入されました。ご利用の際は以下をご参照ください。',
		type: '機能のご紹介',
		hasRead: true
	},
	{
		roles: ['システム管理者'],
		title: 'システム障害発生のお知らせ',
		content: 'システムに障害が発生しています。緊急対応が必要です。',
		type: '障害情報',
		hasRead: false
	},
	{
		roles: ['システム運用者'],
		title: '重要なセキュリティ情報',
		content: '最新のセキュリティ情報が発表されました。システム運用者はすぐに確認してください。',
		type: '重要なお知らせ',
		hasRead: false
	},
	{
		roles: ['外回り担当', '電話担当'],
		title: '予定された外回り日程の変更',
		content:
			'外回り担当および電話担当の方へ、予定されていた外回り日程に変更があります。確認をお願いします。',
		type: 'アップデート',
		hasRead: true
	},
	{
		roles: ['倉庫担当'],
		title: '新商品入荷のお知らせ',
		content: '倉庫に新商品が入荷しました。在庫管理にご注意ください。',
		type: '機能のご紹介',
		hasRead: false
	},
	{
		roles: ['清掃担当'],
		title: '清掃スケジュール変更のお知らせ',
		content: '清掃スケジュールに変更があります。変更内容を確認してください。',
		type: 'アップデート',
		hasRead: false
	},
	{
		roles: ['システム管理者', 'システム運用者'],
		title: '新しいレポート機能の追加',
		content: '新しいレポート機能が追加されました。詳細は以下をご確認ください。',
		type: '機能のご紹介',
		hasRead: false
	},
	{
		roles: ['システム運用者'],
		title: '予定されたシステムアップグレード',
		content: 'システムアップグレードが予定されています。作業予定に影響がないか確認してください。',
		type: 'アップデート',
		hasRead: false
	},
	{
		roles: ['外回り担当'],
		title: '外回り先のアクセス情報変更',
		content: '外回り先のアクセス情報に変更があります。新しい情報を確認してください。',
		type: 'アップデート',
		hasRead: false
	},
	{
		roles: ['電話担当'],
		title: '新しいお問い合わせフォームの設置',
		content: '新しいお問い合わせフォームが設置されました。確認してお客様へご案内ください。',
		type: '機能のご紹介',
		hasRead: false
	},
	{
		roles: ['清掃担当'],
		title: '清掃機器のメンテナンスアラート',
		content: '清掃機器のメンテナンスが必要です。担当者は速やかに対応してください。',
		type: '障害情報',
		hasRead: true
	},
	{
		roles: ['倉庫担当', '清掃担当'],
		title: '共用スペースの利用規定変更',
		content:
			'倉庫担当および清掃担当の方へ、共用スペースの利用規定が変更されました。確認してください。',
		type: 'アップデート',
		hasRead: true
	},
	{
		roles: ['システム運用者'],
		title: 'バックアップのスケジュール変更',
		content: 'バックアップのスケジュールが変更されました。確認してください。',
		type: 'アップデート',
		hasRead: false
	},
	{
		roles: ['システム管理者', '外回り担当'],
		title: '最新セキュリティアップデートの適用',
		content: '最新のセキュリティアップデートが適用されました。外回り担当の方は注意が必要です。',
		type: 'アップデート',
		hasRead: false
	},
	{
		roles: ['清掃担当'],
		title: '清掃機器の新導入',
		content: '新しい清掃機器が導入されました。操作方法を確認してください。',
		type: '機能のご紹介',
		hasRead: true
	},
	{
		roles: ['電話担当'],
		title: '重要なお知らせ：通信障害の解消',
		content: '通信障害が解消されました。電話担当の方は通常通り業務に戻ってください。',
		type: '重要なお知らせ',
		hasRead: false
	},
	{
		roles: ['システム運用者'],
		title: '新しいレポートテンプレート追加',
		content: '新しいレポートテンプレートが追加されました。ご利用の際は以下をご確認ください。',
		type: '機能のご紹介',
		hasRead: true
	},
	{
		roles: ['外回り担当', '倉庫担当'],
		title: '外回り先の在庫情報更新',
		content: '外回り先の在庫情報が更新されました。最新の情報を確認してください。',
		type: 'アップデート',
		hasRead: true
	}
])
