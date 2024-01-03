export type Condition = '' | 'A' | 'B' | 'C' | 'M' | 'MM'
export type Status = '' | '受注' | '新規受注' | '再問合せ' | '見送り' | '失注' | '在庫無し'
export type Inflow =
	| ''
	| '新規FAX'
	| '新規HP'
	| '新規メール'
	| '新規営業'
	| '顧客'
	| '顧客FAX'
	| '顧客HP'
	| '顧客メール'
	| '確認中'
	| '新規紹介'
	| '失注顧客'

export type Preference = '' | '新品・中古' | '新品' | '中古' | '不明' | '確認前' | '無し'

export type Communication = '' | '新規依頼' | '新規送付済み' | '顧客登録済み'

export type Dm = '' | '不要' | '要(未手配)' | '郵送済み' | '持参'

export interface Item {
	name: string
	quantity: number
	price: number
}

export interface Estimate {
	issueDate: string
	dueDate: string
	estimateWithoutTax: number
	withTax: boolean
	estimateTax: number
	items: Item[]
}

export interface Memo {
	date: string
	memo: string
}

export interface OutcomeHistory {
	date: string
	memo: string
}

export interface Checkbox {
	title: string
	isChecked: boolean
}

export interface NegotiationEntries {
	custCd: number
	negotiationId: number
	status: Status
	startingDate: string
	condition: Condition
	inflow: Inflow
	preference: Preference
	billingDate: string
	scheduledDeposit: string
	outcome: string
	nextContactDate: string
	nextContactTime: string
	lastContact: string
	postalCode: string
	prefecture: string
	city: string
	address1: string
	address2: string
	distanceKm: number
	distanceTime: number
	estimate: Estimate[]
	memo: Memo[]
	personInCharge: string
	responsiblePerson: string
	communication: Communication
	dm: Dm
	video: string
	checkboxes: Checkbox[]
	bottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	customerName: string
	numberOfBeds: number
	billingEstimation: number
	registerBy?: number | null
	registerAt?: string
	updateBy?: number | null
	updateAt?: string
	deleteBy?: number | null
	deleteAt?: string
}

export interface NegotiationErrors {
	custCd: boolean
	negotiationId: boolean
	startingDate: string
	status: string
	condition: boolean
	inflow: boolean
	preference: boolean
	billingDate: boolean
	scheduledDeposit: boolean
	outcome: boolean
	nextContactDate: boolean
	nextContactTime: boolean
	lastContact: boolean
	postalCode: boolean
	prefecture: boolean
	city: boolean
	address1: boolean
	address2: boolean
	distanceKm: boolean
	distanceTime: boolean
	estimate: boolean
	memo: boolean
	personInCharge: boolean
	responsiblePerson: boolean
	communication: boolean
	dm: boolean
	video: string
	checkboxes: boolean
	bottleneck: boolean
	occasion: boolean
	risk: boolean
	outcomeHistory: boolean
	customerName: boolean
	numberOfBeds: boolean
	billingEstimation: boolean
	registerBy?: boolean
	registerAt?: boolean
	updateBy?: boolean
	updateAt?: boolean
	deleteBy?: boolean
	deleteAt?: boolean
}

export class NegotiationBackend {
	negotiationId: number
	customerName: string
	status: Status
	startingDate: string
	condition: Condition
	billingDate: string
	outcome: string
	nextContactDate: string
	nextContactTime: string
	lastContact: string
	postalCode: string
	prefecture: string
	city: string
	address1: string
	address2: string
	distanceKm: number
	distanceTime: number
	numberOfBeds: number
	estimate: Estimate[]
	personInCharge: string
	memo: Memo[]
	dm: string
	video: string
	custCd: number
	inflow: Inflow
	preference: Preference
	checkboxes: Checkbox[]
	bottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	responsiblePerson: string
	communication: Communication
	scheduledDeposit: string
	billingEstimation: number
	register_by?: number | null
	register_at?: string
	update_by?: number | null
	update_at?: string
	delete_by?: number | null
	delete_at?: string

	constructor(data: NegotiationEntries) {
		this.negotiationId = data.negotiationId
		this.customerName = data.customerName
		this.status = data.status
		this.startingDate = data.startingDate
		this.condition = data.condition
		this.inflow = data.inflow
		this.billingDate = data.billingDate
		this.outcome = data.outcome
		this.nextContactDate = data.nextContactDate
		this.nextContactTime = data.nextContactTime
		this.lastContact = data.lastContact
		this.postalCode = data.postalCode
		this.prefecture = data.prefecture
		this.city = data.city
		this.address1 = data.address1
		this.address2 = data.address2
		this.distanceKm = data.distanceKm
		this.distanceTime = data.distanceTime
		this.numberOfBeds = data.numberOfBeds
		this.estimate = data.estimate
		this.personInCharge = data.personInCharge
		this.memo = data.memo
		this.dm = data.dm
		this.video = data.video
		this.custCd = data.custCd
		this.inflow = data.inflow
		this.preference = data.preference
		this.checkboxes = data.checkboxes
		this.bottleneck = data.bottleneck
		this.occasion = data.occasion
		this.risk = data.risk
		this.outcomeHistory = data.outcomeHistory
		this.responsiblePerson = data.responsiblePerson
		this.communication = data.communication
		this.scheduledDeposit = data.scheduledDeposit
		this.billingEstimation = data.billingEstimation
		this.register_by = data.registerBy
		this.register_at = data.registerAt
		this.update_by = data.updateBy
		this.update_at = data.updateAt
		this.delete_by = data.deleteBy
		this.delete_at = data.deleteAt
	}
}
