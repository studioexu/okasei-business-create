import type { CustomerNewApi } from './BackendCustomer'

const splitDateTime = (timeString: string) => {
	const dateTime = timeString.split('T')

	const date = dateTime[0]
	const time = dateTime[1]?.split('+')[0]

	return {
		date: date,
		time: time
	}
}

export interface DepartmentBackend {
	department: {
		id: number
		cd1: string
		cd2: string
		name: string
	}
	number_of_beds: number
}

export interface Department {
	departmentId: number
	departmentName: string
	numberOfBeds: number
}

export interface Picture {
	id: number
	memo?: string
	data: string
}

export class Customer {
	private _id?: number
	private _custBranchCD: string
	private _custName: string
	private _custKana: string
	private _instId: string
	private _custType: string
	private _address: {
		postalCode: string
		prefecture: string
		city: string
		address1: string
		address2: string
		phoneNumber: string
		fax: string
		mobile: string
		email: string
	}
	private _numEmployees: number
	private _url: string
	private _numBranch: number
	private _foundation: {
		establishDate: string
		establishBy: string
	}
	private _isActive: boolean

	private _departments: Department[]
	private _registration: {
		registDate?: string
		registBy?: number
	}
	private _update: {
		updateDate?: string
		updateBy?: number
	}
	private _delete: {
		deleteDate?: string
		deleteBy?: number
	}

	private _googleReview: boolean
	private _reviews?: string
	private _business?: string
	private _closingMonth?: string
	// private _pictures?: Picture[]
	private _personInCharge?: string
	private _personInChargeMemo?: string
	private _personInChargeRole?: string
	private _approver?: string
	private _contactTime?: string
	private _miscellaneous?: string

	constructor(data: CustomerNewApi) {
		if (data.id) {
			this._id = data.id
		}
		this._custBranchCD = data.branch_cd
		this._custName = data.name
		this._custKana = data.kana
		this._instId = data.institution_cd
		this._custType = data.type
		this._address = {
			postalCode: data.postal_cd,
			prefecture: data.ken,
			city: data.city,
			address1: data.address1,
			address2: data.address2,
			phoneNumber: data.phone,
			fax: data.fax,
			mobile: data.mobile,
			email: data.email
		}
		this._numEmployees = data.number_of_employee
		this._url = data.url
		this._numBranch = data.number_of_branch
		this._foundation = {
			establishDate: data.establish_date,
			establishBy: data.establish_by
		}

		this._isActive = data?.is_active
		;(this._departments = data.departments.map(department => {
			return {
				departmentId: (department as DepartmentBackend).department.id,
				departmentName: (department as DepartmentBackend).department.name,
				numberOfBeds: (department as DepartmentBackend).number_of_beds
			}
		})),
			(this._registration = {
				registDate: data.register_at,
				registBy: data.register_by
			}),
			(this._update = {
				updateDate: data.update_at,
				updateBy: data.update_by
			}),
			(this._delete = {
				deleteDate: data.delete_at,
				deleteBy: data.delete_by
			}),
			// (this._pictures = data.images
			// 	? data.images.map(image => {
			// 			return {
			// 				base64: image.image_data,
			// 				memo: image.image_memo
			// 			}
			// 	  })
			// 	: []),
			(this._googleReview = data.google_review)
		this._reviews = data.reviews
		this._business = data.business
		this._closingMonth = data.close_month?.toString()
		this._personInCharge = data.personincharge
		this._personInChargeMemo = data.personinchargememo
		this._personInChargeRole = data.personinchargerole
		this._approver = data.approver
		this._contactTime = data.contacttime
		this._miscellaneous = data.miscellaneous
	}

	public get id() {
		return this._id
	}

	public get custBranchCD() {
		return this._custBranchCD
	}

	public get custName() {
		return this._custName
	}

	public get custKana() {
		return this._custKana
	}

	public get address() {
		return this._address
	}

	public get instId() {
		return this._instId
	}

	public get numEmployees() {
		return this._numEmployees
	}

	public get departments() {
		return this._departments
	}

	public get isActive() {
		return this._isActive
	}

	public get url() {
		return this._url
	}

	public get foundation() {
		return this._foundation
	}

	public get numBranch() {
		return this._numBranch
	}

	public get registDateTime() {
		return this._registration.registDate && splitDateTime(this._registration.registDate)
	}

	public get deleteDateTime() {
		return this._delete.deleteDate && splitDateTime(this._delete.deleteDate)
	}

	public get updateDateTime() {
		return this._update.updateDate && splitDateTime(this._update.updateDate)
	}

	public get foundationDate() {
		const foundationDate = this._foundation.establishDate.split('-')
		const year = foundationDate[0]
		const month = foundationDate[1]

		return {
			year: year,
			month: month
		}
	}

	public get delete() {
		return this._delete
	}

	public get update() {
		return this._update
	}

	public get registration() {
		return this._registration
	}

	public get custType() {
		return this._custType
	}

	public set isActive(active: boolean) {
		this._isActive = active
	}

	public get googleReview() {
		return this._googleReview
	}
	public get reviews() {
		return this._reviews
	}
	public get business() {
		return this._business
	}
	public get closingMonth() {
		return this._closingMonth
	}
	// public get pictures() {
	// 	return this._pictures
	// }
	public get personInCharge() {
		return this._personInCharge
	}
	public get personInChargeMemo() {
		return this._personInChargeMemo
	}
	public get personInChargeRole() {
		return this._personInChargeRole
	}

	public get approver() {
		return this._approver
	}

	public get contactTime() {
		return this._contactTime
	}

	public get miscellaneous() {
		return this._miscellaneous
	}
}

export class CustomerImage {
	private _id?: number
	private _data: string
	private _memo: string
	constructor(data: any) {
		this._id = data.id && data.id
		this._data = data.image_data
		this._memo = data.image_memo
	}

	public get id() {
		return this._id
	}

	public get data() {
		return this._data
	}

	public get memo() {
		return this._memo
	}
}
