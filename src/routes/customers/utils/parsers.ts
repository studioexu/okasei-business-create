import type { CustomerEntries } from './types'
import { CustomerBackend } from './classes'

const getTimeArray = (): string => {
	let options: Intl.DateTimeFormatOptions = {
		timeZone: 'Asia/Tokyo',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	}

	const formatter = new Intl.DateTimeFormat([], options)

	return formatter.format(new Date())
}

export const parseBeforePost = (entries: CustomerEntries): CustomerBackend => {
	const timeArray = getTimeArray()

	const registration = {
		registDate: timeArray,
		registBy: 1
	}

	return new CustomerBackend(entries, registration)
}

export const parseBeforeDelete = (customer: CustomerBackend): CustomerBackend => {
	const timeArray = getTimeArray()

	const deleted = {
		Delete_Date: timeArray,
		Delete_By: 1
	}

	customer.delete = deleted
	customer.is_active = false

	return customer
}

export const parseBeforeUpdate = (entries: CustomerEntries, registration: any): CustomerBackend => {
	const timeArray = getTimeArray()

	const updated = {
		updateBy: 1,
		updateDate: timeArray
	}

	return new CustomerBackend(entries, registration, updated)
}
