export interface Detail {
	department: string
	numBed: string
}

// export interface CustomerInfo {
// 	id?: string
// 	customerNumber?: string | undefined
// 	branchNumber: string
// 	facilityName: string
// 	kana: string
// 	facilityNumber: string
// 	businessType: string
// 	address: {
// 		postalCode: string
// 		prefecture: string
// 		city: string
// 		address1: string
// 		address2: string
// 		phoneNumber: string
// 		fax: string
// 	}
// 	numberOfEmployees: string
// 	homepage: string
// 	numberOfFacilities: string
// 	foundation: {
// 		month: string
// 		year: string
// 		founder: string
// 	}
// 	bedding: Bedding[]
// 	registration: {
// 		status: string
// 		registrationDate: string
// 		registrationTime: string
// 	}
// 	update: {
// 		status: string
// 		lastUpdatedDate: string
// 		lastUpdatedTime: string
// 	}
// 	delete: {
// 		status: string
// 		deletedDate: string
// 		deletedTime: string
// 	}
// }

// export interface CustomerInfo {
// 	_id?: string
// 	_custCD?: string | undefined
// 	_custBranchCD: string
// 	_custName: string
// 	_custKana: string
// 	_instId: string
// 	_custType: string
// 	_address: {
// 		postalCode: string
// 		prefecture: string
// 		city: string
// 		address1: string
// 		address2: string
// 		phoneNumber: string
// 		fax: string
// 	}
// 	_numEmployees: string
// 	_url: string
// 	_numBranch: string
// 	_foundation: {
// 		establishDate: string
// 		establishedBy: string
// 	}
// 	_isActive: number

// 	_departments: {
// 		detail: Detail[]
// 		bedTotal: number
// 	}
// 	_registration: {
// 		registDate: string
// 		registBy: string
// 	}
// 	_update: {
// 		updateDate: string
// 		updateBy: string
// 	}
// 	_delete: {
// 		deleteDate: string
// 		deleteBy: string
// 	}
// }

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
