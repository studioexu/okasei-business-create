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

export interface NegociationEntries {
	custCd: number
	negociationId: number
	status: string
	startingDate: string
	condition: string
	inflow: string
	preference: string
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
	communication: string
	dm: string
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

export class NegociationBackend {
	negociationId: number
	customerName: string
	status: string
	startingDate: string
	condition: string
	contact: string
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
	inflow: string
	preference: string
	checkboxes: Checkbox[]
	bottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	responsiblePerson: string
	communication: string
	scheduledDeposit: string
	billingEstimation: number
	register_by?: number | null
	register_at?: string
	update_by?: number | null
	update_at?: string
	delete_by?: number | null
	delete_at?: string

	constructor(data: NegociationEntries) {
		this.negociationId = data.negociationId
		this.customerName = data.customerName
		this.status = data.status
		this.startingDate = data.startingDate
		this.condition = data.condition
		this.contact = data.inflow
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
