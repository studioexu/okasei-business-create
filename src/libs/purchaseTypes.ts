export type Status = '未着手' | '進行中' | '到着待ち' | '完了' | '失注'

export interface Purchase {
	id: number
	orderNumber: string
	customerName: string
	status: Status
	behaviourSizeCheck: boolean
	model: string
	motor: string
	size: string
	arrivalDate: string
	marketPrice: number
	sellingPrice: number
	image: string
}
