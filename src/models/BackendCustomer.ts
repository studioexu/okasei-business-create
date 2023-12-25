import type { CustomerEntries } from '@/libs/customerTypes'
import type { Department } from './Customer'

export interface Picture {
	file: File
	memo: string
}

export interface DepartmentBackend {
	department: {
		id: number
		cd1: string
		cd2: string
		name: string
	}
	number_of_beds: number
}

export class CustomerNewApi {
	[x: string]: any
	id?: number
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
	number_of_employee: number
	url: string
	number_of_branch: number
	establish_date: string
	establish_by: string
	is_active: boolean
	departments: { department_id: number; number_of_beds: number }[] | DepartmentBackend[]
	register_at?: string
	register_by?: number
	update_at?: string
	update_by?: number
	delete_at?: string
	delete_by?: number
	images: { image_data: string; image_memo: string }[]

	constructor(data: CustomerEntries) {
		if (data.id) {
			this.id = data.id
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
		this.establish_date = data.foundationDate
		this.establish_by = data.founder
		this.is_active = data.isActive
		this.departments = data.departments.map((department: Department) => {
			return {
				department_id: department.departmentId,
				number_of_beds: department.numberOfBeds
			}
		})
		this.register_at = data.registrationDate
		this.register_by = data.registeredBy
		this.update_at = data.updateDate
		this.update_by = data.updateBy
		this.delete_at = data.deleteDate
		this.delete_by = data.deleteBy

		this.images = data.pictures.map(picture => {
			return {
				image_data: picture.base64,
				image_memo: picture.memo
			}
		})
	}
}
