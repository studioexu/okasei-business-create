interface bedding {
	department: string
	quantity: string
}

export class Company {
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

	constructor(data: any, registration?: any, update?: any) {
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
			status: update?.status,
			deletedDate: update?.date,
			deletedTime: update?.time
		}
	}
}
