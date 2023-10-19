export interface Detail {
	department: string
	numBed: string
}

export interface CustomerInfo {
	id?: string
	custCD?: string | undefined
	custBranchCD: string
	custName: string
	custKana: string
	instId: string
	custType: string
	address: {
		postalCode: string
		prefecture: string
		city: string
		address1: string
		address2: string
		phoneNumber: string
		fax: string
	}
	numEmployees: string
	url: string
	numBranch: string
	foundation: {
		establishDate: string
		establishedBy: string
	}
	isActive: boolean
	departments: {
		detail: Detail[]
		bedTotal: number
	}
	registration: {
		registDate: string
		registBy: string
	}
	update: {
		updateDate: string
		updateBy: string
	}
	delete: {
		deleteDate: string
		deleteBy: string
	}
}

export interface CustomerEntries {
	id?: string
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
	registrationDate?: string
	registrationTime?: string
	isActive: boolean
}

export interface CustomerEntriesErrors {
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
