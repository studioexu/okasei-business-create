import type { CustomerImageFactory } from '@/Factories/CustomerFactory'

export interface Department {
	departmentId: number
	departmentName: string
	numberOfBeds: number
}

export interface DepartmentApi {
	department: {
		id: number
		cd1: string
		cd2: string
		name: string
	}
	number_of_beds: number
}

export interface Picture {
	id: number
	memo?: string
	data: string
}

export interface CustomerEntries {
	id?: number
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
	foundationDate: string
	founder: string
	departments: Department[]
	numberOfEmployees: number
	homepage: string
	numberOfFacilities: number
	isActive: true
	googleReview: false
	reviews: string
	business: string
	closingMonth: string
	personInCharge: string
	personInChargeRole: string
	personInChargeMemo: string
	approver: string
	contactTime: string
	pictures: CustomerImageFactory[]
	miscellaneous: string
	registrationDate?: string
	registeredBy?: number
	updateDate?: string
	updateBy?: number
	deleteDate?: string
	deleteBy?: number
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
	foundationDate: boolean
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
