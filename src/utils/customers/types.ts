export interface Picture {
	file: File
	memo: string
}

export interface Department {
	index: number
	department: string
	bedQuantity: string
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
		detail: Department[]
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
	custCd?: string
	id?: string
	branchNumber: string
	customerName: string
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
	email: string
	mobile: string
	year: string
	month: string
	founder: string
	departments: Department[]
	numberOfEmployees: string
	homepage: string
	numberOfFacilities: string
	isActive: true
	googleReview: false
	reviews: string
	businessList: string
	closingMonth: string
	personInCharge: string
	personInChargeRole: string
	personInChargeMemo: string
	approver: string
	contactTime: string
	pictures: Picture[]
	miscellaneous: string
	registrationDate?: string
	registeredBy?: string
}

export interface CustomerEntriesErrors {
	branchNumber: boolean
	customerName: boolean
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
	email: boolean
	mobile: boolean
	year: boolean
	month: boolean
	founder: boolean
	departments: boolean
	numberOfEmployees: boolean
	homepage: boolean
	numberOfFacilities: boolean
	isActive: boolean
	googleReview: boolean
	reviews: boolean
	businessContent: boolean
	closingMonth: boolean
	personInCharge: boolean
	personInChargeRole: boolean
	personInChargeMemo: boolean
	approver: boolean
	contactTime: boolean
	pictures: boolean
	miscellaneous: boolean
}

export interface AddressAutoInfo {
	prefecture: string
	city: string
	address1: string
}
