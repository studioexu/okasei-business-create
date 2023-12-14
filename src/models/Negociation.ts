import type { Item, Estimate, OutcomeHistory, Checkbox, Memo } from '@/libs/negociationTypes'

const getTotalBedsByEstimate = (items: Item[]) => {
	let total = 0
	items.map((item: Item) => (total += item.quantity))

	return total
}

const formateNumberCompact = (number: number) => {
	return new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format(BigInt(number))
}

export class Negociation {
	private _negociationId: number
	private _customerName: string
	private _status: string
	private _startingDate: string
	private _condition: string
	private _contact: string
	private _billingDate: string
	private _outcome: string
	private _nextContactDate: string
	private _nextContactTime: string
	private _lastContact: string
	private _postalCode: string
	private _prefecture: string
	private _city: string
	private _address1: string
	private _address2: string
	private _distanceKm: number
	private _distanceTime: number
	private _numberOfBeds: number
	private _estimate: Estimate[]
	private _personInCharge: string
	private _memo: Memo[]
	private _dm: string
	private _video: string
	private _custCd: number
	private _inflow: string
	private _preference: string
	private _checkboxes: Checkbox[]
	private _checkBottleneck: string
	private _occasion: string
	private _risk: string
	private _outcomeHistory: OutcomeHistory[]
	private _responsiblePerson: string
	private _communication: string
	private _scheduledDeposit: string
	private _billingEstimation: number
	private _registerBy?: number | null
	private _registerAt?: string
	private _updateBy?: number | null
	private _updateAt?: string
	private _deleteBy?: number | null
	private _deleteAt?: string

	constructor(data: any) {
		this._negociationId = data.negociationId
		this._customerName = data.customerName
		this._status = data.status
		this._startingDate = data.startingDate
		this._condition = data.condition
		this._contact = data.inflow
		this._billingDate = data.billingDate
		this._outcome = data.outcome
		this._nextContactDate = data.nextContactDate
		this._nextContactTime = data.nextContactTime
		this._lastContact = data.lastContact
		this._postalCode = data.postalCode
		this._prefecture = data.prefecture
		this._city = data.city
		this._address1 = data.address1
		this._address2 = data.address2
		this._distanceKm = data.distanceKm
		this._distanceTime = data.distanceTime
		this._numberOfBeds = data.numberOfBeds
		this._estimate = data.estimate
		this._personInCharge = data.personInCharge
		this._memo = data.memo
		this._dm = data.dm
		this._video = data.video
		this._custCd = data.custCd
		this._inflow = data.inflow
		this._preference = data.preference
		this._checkboxes = data.checkboxes
		this._checkBottleneck = data.checkBottleneck
		this._occasion = data.occasion
		this._risk = data.risk
		this._outcomeHistory = data.outcomeHistory
		this._responsiblePerson = data.responsiblePerson
		this._communication = data.communication
		this._scheduledDeposit = data.scheduledDeposit
		this._billingEstimation = data.billingEstimation
		this._registerBy = data.register_by
		this._registerAt = data.register_at
		this._updateBy = data.update_by
		this._updateAt = data.update_at
		this._deleteBy = data.delete_by
		this._deleteAt = data.delete_at
	}

	public get negociationId() {
		return this._negociationId
	}
	public get customerName() {
		return this._customerName
	}
	public get status() {
		return this._status
	}
	public get startingDate() {
		return this._startingDate
	}
	public get condition() {
		return this._condition
	}
	public get contact() {
		return this._contact
	}
	public get billingDate() {
		return this._billingDate
	}
	public get outcome() {
		return this._outcome
	}
	public get nextContactDate() {
		return this._nextContactDate
	}
	public get nextContactTime() {
		return this._nextContactTime
	}
	public get lastContact() {
		return this._lastContact
	}
	public get postalCode() {
		return this._postalCode
	}
	public get prefecture() {
		return this._prefecture
	}
	public get city() {
		return this._city
	}
	public get address1() {
		return this._address1
	}
	public get address2() {
		return this._address2
	}
	public get distanceKm() {
		return this._distanceKm
	}
	public get distanceTime() {
		return this._distanceTime
	}
	public get numberOfBeds() {
		return this._numberOfBeds
	}
	public get estimate() {
		return this._estimate
	}
	public get personInCharge() {
		return this._personInCharge
	}
	public get memo() {
		return this._memo
	}
	public get dm() {
		return this._dm
	}
	public get video() {
		return this._video
	}
	public get custCd() {
		return this._custCd
	}
	public get inflow() {
		return this._inflow
	}
	public get preference() {
		return this._preference
	}
	public get checkboxes() {
		return this._checkboxes
	}
	public get checkBottleneck() {
		return this._checkBottleneck
	}
	public get occasion() {
		return this._occasion
	}
	public get risk() {
		return this._risk
	}
	public get outcomeHistory() {
		return this._outcomeHistory
	}
	public get responsiblePerson() {
		return this._responsiblePerson
	}
	public get communication() {
		return this._communication
	}
	public get scheduledDeposit() {
		return this._scheduledDeposit
	}
	public get billingEstimation() {
		return this._billingEstimation
	}
	public get register_by() {
		return this._registerBy
	}
	public get register_at() {
		return this._registerAt
	}
	public get update_by() {
		return this._updateBy
	}
	public get update_at() {
		return this._updateAt
	}
	public get delete_by() {
		return this._deleteBy
	}
	public get delete_at() {
		return this._deleteAt
	}

	public get minMaxBed() {
		const bedQuantityArray = this._estimate.map(estimate => getTotalBedsByEstimate(estimate.items))

		const min = bedQuantityArray.length === 0 ? 0 : Math.min(...bedQuantityArray)
		const max = bedQuantityArray.length === 0 ? 0 : Math.max(...bedQuantityArray)

		return {
			min: min,
			max: max
		}
	}

	public get minMaxEstimate() {
		const estimates: number[] = this._estimate.map(estimate => estimate.estimateWithoutTax)

		const min = estimates.length === 0 ? 0 : formateNumberCompact(Math.min(...estimates))
		const max = estimates.length === 0 ? 0 : formateNumberCompact(Math.max(...estimates))

		return {
			min: min,
			max: max
		}
	}
}
