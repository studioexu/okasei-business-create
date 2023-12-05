import { getDateTime } from '@/libs/formatters'

interface Detail {
	deptId: number
	numBeds: number
}

export interface Department {
	department: {
		id: number
		cd1: string
		cd2: string
		name: string
	}
	numberOfBeds: number
}

export interface Picture {
	file: File
	memo: string
}

export class CustomerAPI {
	private _id?: string
	private _custCD?: string | undefined
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

	private _departments: {
		department: {
			id: number
			cd1: string
			cd2: string
			name: string
		}
		number_of_beds: number
	}[]
	private _registration: {
		registDate: string
		registBy: string
	}
	private _update: {
		updateDate: string
		updateBy: string
	}
	private _delete: {
		deleteDate: string
		deleteBy: string
	}

	private _googleReview: boolean
	private _reviews: string
	private _business: string
	private _closingMonth: string
	private _pictures: Picture[]
	private _personInCharge: string
	private _personInChargeMemo: string
	private _personInChargeRole: string
	private _approver: string
	private _contactTime: string
	private _miscellaneous: string

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.id) {
			this._id = data.id
			this._custCD = data.id
		}
		if (data.cd) {
			this._custCD = data.cd
			this._id = data.cd
		}
		this._custBranchCD = data.branch_cd
		this._custName = data.name
		this._custKana = data.kana
		this._instId = data.institution_cd
		this._custType = data.type === 'C' ? '法人' : '個人'
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

		this._departments = data.departments
		this._registration = {
			registDate: registration?.registDate || data.register_at,
			registBy: registration?.registBy || data.register_by
		}
		this._update = {
			updateDate: update?.updateDate || data.update_at,
			updateBy: update?.updateBy || data.update_by
		}
		;(this._delete = {
			deleteDate: deleted?.deleteDate || data.delete_at,
			deleteBy: deleted?.deleteBy || data.delete_by
		}),
			(this._googleReview = data.googleReview),
			(this._reviews = data.reviews),
			(this._business = data.business),
			(this._closingMonth = data.closingMonth),
			(this._pictures = data.pictures),
			(this._personInCharge = data.personInCharge),
			(this._personInChargeMemo = data.personInChargeMemo),
			(this._personInChargeRole = data.personInChargeRole),
			(this._approver = data.approver),
			(this._contactTime = data.contactTime),
			(this._miscellaneous = data.miscellaneous)
	}

	public get id() {
		return this._id
	}

	public get custCD() {
		return this._custCD
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
		const newDepartments: Department[] = this._departments.map(department => {
			return {
				department: {
					id: department.department.id,
					cd1: department.department.cd1,
					cd2: department.department.cd2,
					name: department.department.name
				},
				numberOfBeds: department.number_of_beds
			}
		})

		return newDepartments
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
		const dateTime = this._registration.registDate.split('T')
		const date = dateTime[0]
		const time = dateTime[1]?.split('+')[0]

		return {
			date: date,
			time: time
		}
	}

	public get deleteDateTime() {
		const dateTime = this._delete.deleteDate.split('T')
		const date = dateTime[0]
		const time = dateTime[1]?.split('+')[0]

		return {
			date: date,
			time: time
		}
	}

	public get updateDateTime() {
		const dateTime = this._update.updateDate.split('T')
		const date = dateTime[0]
		const time = dateTime[1]?.split('+')[0]

		return {
			date: date,
			time: time
		}
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

	// public get departmentDetail() {
	// 	const detail = this._departments.department.map((dept: any) => {
	// 		return {
	// 			department: dept.department || dept.dept_ID,
	// 			quantity: dept.quantity || dept.num_beds
	// 		}
	// 	})

	// 	return detail
	// }

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
	public get pictures() {
		return this._pictures
	}
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
