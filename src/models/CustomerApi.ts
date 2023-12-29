import type { Department, DepartmentApi, CustomerEntries } from '@/libs/customerTypes'

export class CustomerApi {
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
	departments: { department_id: number; number_of_beds: number }[] | DepartmentApi[]
	register_at?: string
	register_by?: number
	update_at?: string
	update_by?: number
	delete_at?: string
	delete_by?: number
	email: string
	images?: { image_data: string; image_memo?: string }[]
	mobile: string
	close_month?: number
	business?: string
	google_review: boolean
	reviews?: string
	miscellaneous?: string
	personincharge?: string
	personinchargerole?: string
	personinchargememo?: string
	approver?: string
	contacttime?: string

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
				image_data: picture.data || '',
				image_memo: picture.memo
			}
		})
		this.email = data.email
		this.mobile = data.mobile
		this.close_month = parseInt(data.closingMonth) || undefined
		this.business = data.business || undefined
		this.google_review = data.googleReview
		this.reviews = data.reviews || undefined
		this.miscellaneous = data.miscellaneous || undefined
		this.personincharge = data.personInCharge || undefined
		this.personinchargerole = data.personInChargeRole || undefined
		this.personinchargememo = data.personInChargeMemo || undefined
		this.approver = data.approver || undefined
		this.contacttime = data.contactTime || undefined
	}
}

export class customerImagesBackend {
	public id?: number
	public image_data: string
	public image_memo: string
	constructor(data: any) {
		this.id = data.id && data.id
		this.image_data = data.data
		this.image_memo = data.memo
	}
}
