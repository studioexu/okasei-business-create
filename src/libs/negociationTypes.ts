export interface Item {
	name: string
	quantity: string
}

export interface Estimate {
	issueDate: string
	dueDate: string
	estimateWithoutTax: string
	withTax: boolean
	estimateTax: string
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

interface Checkbox {
	title: string
	isChecked: boolean
}

export interface Negociation {
	negociationId: number
	custCd: number
	customerName: string
	status: string
	firstTransaction: string
	condition: string
	contact: string
	billingDate: string
	scheduledDeposit: string
	outcome: string
	nextContact: string
	lastContact: string
	postalCode: string
	prefecture: string
	city: string
	address1: string
	address2: string
	distanceKm: string
	distanceTime: string
	estimate: Estimate[]
	personInCharge: string
	memo: Memo[]
	dm: string
	video: string
	inflow: string
	preference: string
	checkboxes: Checkbox[]
	checkBottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	responsiblePerson: string
	communication: string
	numberOfBeds: string
	billingEstimation: string
}

export interface NegociationEntries {
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
	distanceKm: string
	distanceTime: string
	estimate: Estimate[]
	memo: Memo[]
	personInCharge: string
	responsiblePerson: string
	communication: string
	dm: string
	video: string
	checkboxes: Checkbox[]
	checkBottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	custCd: number
	negociationId: number
	customerName: string
	numberOfBeds: string
	billingEstimation: string
}

export class NegociationBackend {
	negociationId: number
	customerName: string
	status: string
	firstTransaction: string
	condition: string
	contact: string
	billingDate: string
	outcome: string
	nextContact: string
	lastContact: string
	postalCode: string
	prefecture: string
	city: string
	address1: string
	address2: string
	distanceKm: string
	distanceTime: string
	numberOfBeds: string
	estimate: Estimate[]
	personInCharge: string
	memo: Memo[]
	dm: string
	video: string
	custCd: number
	inflow: string
	preference: string
	checkboxes: Checkbox[]
	checkBottleneck: string
	occasion: string
	risk: string
	outcomeHistory: OutcomeHistory[]
	responsiblePerson: string
	communication: string
	scheduledDeposit: string
	billingEstimation: string

	constructor(data: NegociationEntries) {
		this.negociationId = data.negociationId
		this.customerName = data.customerName
		this.status = data.status
		this.firstTransaction = data.startingDate
		this.condition = data.condition
		this.contact = data.inflow
		this.billingDate = data.billingDate
		this.outcome = data.outcome
		this.nextContact = data.nextContactDate + ' ' + data.nextContactTime
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
		this.checkBottleneck = data.checkBottleneck
		this.occasion = data.occasion
		this.risk = data.risk
		this.outcomeHistory = data.outcomeHistory
		this.responsiblePerson = data.responsiblePerson
		this.communication = data.communication
		this.scheduledDeposit = data.scheduledDeposit
		this.billingEstimation = data.billingEstimation
	}
}
