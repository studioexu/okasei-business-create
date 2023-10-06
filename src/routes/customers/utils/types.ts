interface bedding {
	department: string
	quantity: string
}

export interface CompanyInfo {
	id?: string | undefined
	customerNumber?: string | undefined
	branchNumber: string
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
}

export interface CompanyEntries {
	branchNumber: string
	facilityName: string
	kana: string
	facilityNumber: string
	businessType: string
	postalCode: string
	prefecture: string
	city: string
	address1: string
	address2: string
	phoneNumber: string
	fax: string
	year: string
	month: string
	founder: string
	bedding: any[]
	numberOfEmployees: string
	homepage: string
	numberOfFacilities: string
}

export interface Error {
	branchNumber: boolean
	facilityName: boolean
	kana: boolean
	facilityNumber: boolean
	businessType: boolean
	postalCode: boolean
	prefecture: boolean
	city: boolean
	address1: boolean
	address2: boolean
	phoneNumber: boolean
	fax: boolean
	year: boolean
	month: boolean
	founder: boolean
	bedding: boolean
	numberOfEmployees: boolean
	homepage: boolean
	numberOfFacilities: boolean
}
