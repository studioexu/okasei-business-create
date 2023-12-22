import { readable, writable, type Writable } from 'svelte/store'
import type { Readable } from 'svelte/motion'

import type { Purchase, Status } from '@/libs/purchaseTypes'

export const purchase: Writable<Purchase> = writable({
	id: 0,
	orderNumber: '',
	customerName: '',
	status: <Status>'',
	model: '',
	motor: '',
	size: '',
	arrivalDate: '',
	marketPrice: 0,
	sellingPrice: 0
})

export const status: Readable<Status[]> = readable(['未着手', '進行中', '到着待ち', '完了', '失注'])

export const purchases: Writable<Purchase[]> = writable([
	{
		id: 1,
		orderNumber: '8323-0804-5840',
		customerName: 'My company',
		status: '未着手',
		model: '3M',
		motor: 'キューマ',
		size: '83R',
		arrivalDate: '12/11',
		marketPrice: 8756,
		sellingPrice: 5000
	},
	{
		id: 2,
		orderNumber: '8323-0804-5841',
		customerName: 'My company',
		status: '未着手',
		model: '2M',
		motor: 'キューマ',
		size: '83R',
		arrivalDate: '2/11',
		marketPrice: 13244,
		sellingPrice: 3000
	},
	{
		id: 3,
		orderNumber: '8323-0804-5842',
		customerName: 'My company',
		status: '到着待ち',
		model: '3M',
		motor: 'キューマ',
		size: '83R',
		arrivalDate: '12/11',
		marketPrice: 18348,
		sellingPrice: 5000
	},
	{
		id: 4,
		orderNumber: '8323-0804-5843',
		customerName: 'My company',
		status: '失注',
		model: '2M',
		motor: 'キューマ',
		size: '83R',
		arrivalDate: '3/11',
		marketPrice: 8756,
		sellingPrice: 5000
	},
	{
		id: 5,
		orderNumber: '8323-0804-5844',
		customerName: '田中　太郎',
		status: '到着待ち',
		model: '2M',
		motor: 'ヒューマン',
		size: '83M',
		arrivalDate: '12/11',
		marketPrice: 8756,
		sellingPrice: 5000
	},
	{
		id: 6,
		orderNumber: '8323-0804-5845',
		customerName: 'John Doe',
		status: '未着手',
		model: '3Mらくらく',
		motor: 'キューマ',
		size: '91R',
		arrivalDate: '12/11',
		marketPrice: 8756,
		sellingPrice: 5000
	},
	{
		id: 8,
		orderNumber: '8323-0804-5846',
		customerName: 'My company',
		status: '未着手',
		model: '3M',
		motor: 'キューマ',
		size: '不明',
		arrivalDate: '12/11',
		marketPrice: 8756,
		sellingPrice: 5000
	},
	{
		id: 9,
		orderNumber: '8323-0804-5847',
		customerName: 'My company',
		status: '完了',
		model: '3M',
		motor: 'キューマ',
		size: '83R',
		arrivalDate: '1/11',
		marketPrice: 8756,
		sellingPrice: 5000
	}
])

// export const created: Readable<{ user: string; datetime: Date }> = readable({
// 	user: 'Jane Smith',
// 	datetime: new Date(2023, 9, 14, 16, 28, 5, 114)
// })

// export const updated: Readable<{ user: string; datetime: Date }> = readable({
// 	user: 'Sophia Clark',
// 	datetime: new Date()
// })
