interface Detail {
	dept_ID: number
	num_beds: number
}

export interface Picture {
	file: File
	memo: string
}

export class CustomerBackend {
	id?: string
	Cust_CD?: string | undefined
	Cust_Branch_CD: string
	Cust_Name: string
	Cust_Kana: string
	Inst_ID: string
	Cust_Type: string
	Address: {
		Cust_Postal: string
		Cust_Ken: string
		Cust_City: string
		Cust_Addr1: string
		Cust_Addr2: string
		Cust_Phone: string
		Cust_Fax: string
		Cust_Email: string
		Cust_Mobile: string
	}
	Num_Employees: string
	URL: string
	Num_Branch: string
	foundation: {
		Establish_Date: string
		Established_By: string
	}
	is_active: boolean

	departments: {
		detail: Detail[]
		bed_total: number
	}
	registration: {
		Regist_Date: string
		Regist_By: number
	}
	update: {
		Update_Date: string
		Update_By: number
	}
	delete: {
		Delete_Date: string
		Delete_By: number
	}
	googleReview: boolean
	reviews: string
	closingMonth: string
	business: string
	pictures: Picture[]
	personInCharge: string
	personInChargeRole: string
	personInChargeMemo: string
	approver: string
	contactTime: string
	miscellaneous: string

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.id) {
			this.id = data.id
			this.Cust_CD = data.id
		}
		this.Cust_Branch_CD = data.branchNumber
		this.Cust_Name = data.customerName
		this.Cust_Kana = data.kana
		this.Inst_ID = data.facilityNumber
		this.Cust_Type = data.businessType
		this.Address = {
			Cust_Postal: data.postalCode,
			Cust_Ken: data.prefecture,
			Cust_City: data.city,
			Cust_Addr1: data.address1,
			Cust_Addr2: data.address2,
			Cust_Phone: data.phoneNumber,
			Cust_Fax: data.fax,
			Cust_Email: data.email,
			Cust_Mobile: data.mobile
		}
		this.Num_Employees = data.numberOfEmployees
		this.URL = data.homepage
		this.Num_Branch = data.numberOfFacilities
		this.foundation = {
			Establish_Date: data.year + '-' + data.month,
			Established_By: data.founder
		}
		this.is_active = data.isActive
		this.departments = {
			detail: data.departments,
			bed_total: data.bed_total
		}
		this.registration = {
			Regist_Date: registration?.registDate || data.registration?.Regist_Date,
			Regist_By: registration?.registBy || data.registration?.Regist_By
		}
		this.update = {
			Update_Date: update?.updateDate || data.update?.Update_Date,
			Update_By: update?.updateBy || data.update?.Update_By
		}
		this.delete = {
			Delete_Date: deleted?.deleteDate || data.delete?.Delete_Date,
			Delete_By: deleted?.deleteBy || data.delete?.Delete_By
		}

		this.business = data.business
		this.googleReview = data.googleReview
		this.reviews = data.reviews
		this.closingMonth = data.closingMonth
		this.pictures = data.pictures
		this.personInCharge = data.personInCharge
		this.personInChargeMemo = data.personInChargeMemo
		this.personInChargeRole = data.personInChargeRole
		this.approver = data.approver
		this.contactTime = data.contactTime
		this.miscellaneous = data.miscellaneous
	}
}

export class CustomerNewApi {
	id?: string
	cd?: string
	branch_cd: string
	name: string
	kana: string
	institution_cd: string
	type: string
	postal_cd: string
	ken: string
	city: string
	address1: string
	address2: string
	phone: string
	fax: string
	number_of_employee: string
	url: string
	number_of_branch: string
	establish_date: string
	establish_by: string
	is_active: boolean
	departments: {
		detail: Detail[]
		bed_total: number
	}
	register_at: string
	register_by: number
	update_at: string
	update_by: number
	delete_at: string
	delete_by: number

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.id) {
			this.id = data.id
			this.cd = data.custCd === '' || data.custCd === undefined ? '1' : data.custCd
		}
		this.branch_cd = data.branchNumber
		this.name = data.customerName
		this.kana = data.kana
		this.institution_cd = data.facilityNumber
		this.type = data.businessType
		this.postal_cd = data.postalCode
		this.ken = data.prefecture
		this.city = data.city
		this.address1 = data.address1
		this.address2 = data.address2
		this.phone = data.phoneNumber
		this.fax = data.fax
		this.number_of_employee = data.numberOfEmployees
		this.url = data.homepage
		this.number_of_branch = data.numberOfFacilities
		this.establish_date = data.year
		this.establish_by = data.founder
		this.is_active = data.isActive
		this.departments = {
			detail: data.departments,
			bed_total: data.bed_total
		}
		this.register_at = registration?.registDate || data.register_at
		this.register_by = registration?.registBy || data.register_by
		this.update_at = update?.updateDate || data.update_at
		this.update_by = update?.updateBy || data.update_by
		this.delete_at = deleted?.deleteDate || data.delete_at
		this.delete_by = deleted?.deleteBy || data.delete_by
	}
}
