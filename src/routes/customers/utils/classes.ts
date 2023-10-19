interface bedding {
	department: string
	quantity: string
}

interface Detail {
	dept_ID: number
	num_beds: number
}

export class Customer {
	id?: string
	branchNumber: string
	customerNumber?: string | undefined
	facilityName: string
	kana: string
	facilityNumber: string
	businessType: string
	address: {
		postalCode: string
		prefecture: string
		city: string
		address1: string
		address2: string
		phoneNumber: string
		fax: string
	}
	numberOfEmployees: string
	homepage: string
	numberOfFacilities: string
	foundation: {
		month: string
		year: string
		founder: string
	}
	bedding: bedding[]
	registration: {
		status: string
		registrationDate: string
		registrationTime: string
	}
	update: {
		status: string
		lastUpdatedDate: string
		lastUpdatedTime: string
	}
	delete: {
		status: string
		deletedDate: string
		deletedTime: string
	}

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.id) {
			this.id = data.id
			this.customerNumber = data.id
		}
		this.branchNumber = data.branchNumber
		this.facilityName = data.facilityName
		this.kana = data.kana
		this.facilityNumber = data.facilityNumber
		this.businessType = data.businessType
		this.address = {
			postalCode: data.postalCode,
			prefecture: data.prefecture,
			city: data.city,
			address1: data.address1,
			address2: data.address2,
			phoneNumber: data.phoneNumber,
			fax: data.fax
		}
		this.numberOfEmployees = data.numberOfEmployees
		this.homepage = data.homepage
		this.numberOfFacilities = data.numberOfFacilities
		this.foundation = {
			month: data.month,
			year: data.year,
			founder: data.founder
		}
		this.bedding = data.bedding
		this.registration = {
			status: registration?.status,
			registrationDate: registration?.date,
			registrationTime: registration?.time
		}
		this.update = {
			status: update?.status,
			lastUpdatedDate: update?.date,
			lastUpdatedTime: update?.time
		}
		this.delete = {
			status: deleted?.status,
			deletedDate: deleted?.date,
			deletedTime: deleted?.time
		}
	}
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

	constructor(data: any, registration?: any, update?: any, deleted?: any) {
		if (data.id) {
			this.id = data.id
			this.Cust_CD = data.id
		}
		this.Cust_Branch_CD = data.branchNumber
		this.Cust_Name = data.facilityName
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
			Cust_Fax: data.fax
		}
		this.Num_Employees = data.numberOfEmployees
		this.URL = data.homepage
		this.Num_Branch = data.numberOfFacilities
		this.foundation = {
			Establish_Date: data.year,
			Established_By: data.founder
		}
		this.is_active = data.isActive
		this.departments = {
			detail: data.bedding,
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
	}
}
