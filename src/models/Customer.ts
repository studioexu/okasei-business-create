interface Detail {
	deptId: number
	numBeds: number
}

export interface Picture {
	file: File
	memo: string
}

export class Customer {
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
	private _numberOfEmployees: string
	private _url: string
	private _numBranch: string
	private _foundation: {
		establishDate: string
		establishedBy: string
	}
	private _isActive: boolean

	private _departments: {
		detail: Detail[]
		bedTotal: number
	}
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
		if (data.Cust_CD) {
			this._id = data.Cust_CD
			this._custCD = data.Cust_CD
		}
		this._custBranchCD = data.Cust_Branch_CD
		this._custName = data.Cust_Name
		this._custKana = data.Cust_Kana
		this._instId = data.Inst_ID
		this._custType = data.Cust_Type
		this._address = {
			postalCode: data.Address.Cust_Postal,
			prefecture: data.Address.Cust_Ken,
			city: data.Address.Cust_City,
			address1: data.Address.Cust_Addr1,
			address2: data.Address.Cust_Addr2,
			phoneNumber: data.Address.Cust_Phone,
			fax: data.Address.Cust_Fax,
			email: data.Address.Cust_Email,
			mobile: data.Address.Cust_Mobile
		}
		this._numberOfEmployees = data.Num_Employees
		this._url = data.URL
		this._numBranch = data.Num_Branch
		this._foundation = {
			establishDate: data.foundation.Establish_Date,
			establishedBy: data.foundation.Established_By
		}
		this._isActive = data.is_active
		this._departments = {
			detail: data.departments.detail,
			bedTotal: data.departments.bed_total
		}
		this._registration = {
			registDate: registration?.registDate || data.registration?.Regist_Date,
			registBy: registration?.registBy || data.registration?.Regist_By
		}
		this._update = {
			updateDate: update?.updateDate || data.update?.Update_Date,
			updateBy: update?.updateBy || data.update?.Update_By
		}
		this._delete = {
			deleteDate: deleted?.deleteDate || data.delete?.Delete_Date,
			deleteBy: deleted?.deleteBy || data.delete?.Delete_By
		}
		this._googleReview = data.googleReview
		this._reviews = data.reviews
		this._business = data.business
		this._closingMonth = data.closingMonth
		this._pictures = data.pictures
		this._personInCharge = data.personInCharge
		this._personInChargeMemo = data.personInChargeMemo
		this._personInChargeRole = data.personInChargeRole
		this._approver = data.approver
		this._contactTime = data.contactTime
		this._miscellaneous = data.miscellaneous
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

	public get numberOfEmployees() {
		return this._numberOfEmployees
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

	public get foundationDate() {
		const year = this._foundation.establishDate.split('-')[0]
		const month = this._foundation.establishDate.split('-')[1]

		return {
			year: year,
			month: month
		}
	}

	public get numBranch() {
		return this._numBranch
	}

	public get registDateTime() {
		const dateTime = this._registration.registDate.split(' ')
		const date = dateTime[0]
		const time = dateTime[1]

		return {
			date: date,
			time: time
		}
	}

	public get deleteDateTime() {
		const dateTime = this._delete.deleteDate.split(' ')
		const date = dateTime[0]
		const time = dateTime[1]

		return {
			date: date,
			time: time
		}
	}

	public get updateDateTime() {
		const dateTime = this._update.updateDate.split(' ')
		const date = dateTime[0]
		const time = dateTime[1]

		return {
			date: date,
			time: time
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

	public get departmentDetail() {
		const detail = this._departments.detail.map((dept: any) => {
			return {
				department: dept.department || dept.dept_ID,
				bedQuantity: dept.bedQuantity || dept.num_beds
			}
		})

		return detail
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
	public get miscellaneous() {
		return this._miscellaneous
	}

	public get contactTime() {
		return this._contactTime
	}
}
