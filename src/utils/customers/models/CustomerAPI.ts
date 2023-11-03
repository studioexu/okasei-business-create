interface Detail {
	deptId: number
	numBeds: number
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
	}
	private _numEmployees: string
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

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.Cust_CD) {
			this._id = data.id
			this._custCD = data.cd
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
			fax: data.fax
		}
		this._numEmployees = data.number_of_employees
		this._url = data.url
		this._numBranch = data.number_of_branch
		this._foundation = {
			establishDate: data.foundation.establish_date,
			establishedBy: data.foundation.establish_by
		}
		this._isActive = data.is_active
		this._departments = {
			detail: data.departments.detail,
			bedTotal: data.departments.bed_total
		}
		this._registration = {
			registDate: registration?.registDate || data.regist_at,
			registBy: registration?.registBy || data.regist_by
		}
		this._update = {
			updateDate: update?.updateDate || data.update?.Update_Date,
			updateBy: update?.updateBy || data.update?.Update_By
		}
		this._delete = {
			deleteDate: deleted?.deleteDate || data.delete?.Delete_Date,
			deleteBy: deleted?.deleteBy || data.delete?.Delete_By
		}
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

	public get numEmployess() {
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
				quantity: dept.quantity || dept.num_beds
			}
		})

		return detail
	}

	public set isActive(active: boolean) {
		this._isActive = active
	}
}
