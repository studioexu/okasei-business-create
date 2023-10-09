import type { CustomerInfo, CustomerEntries } from './types'
import { Customer } from './classes'

// export const parsecustomerInfo = (
// 	customerEntry: CustomerInfo | CustomerEntries,
// 	actionType?: string,
// 	postDateArray?: any
// ): CustomerInfo => {
// 	let options: Intl.DateTimeFormatOptions = {
// 		timeZone: 'Asia/Tokyo',
// 		year: 'numeric',
// 		month: 'numeric',
// 		day: 'numeric',
// 		hour: 'numeric',
// 		minute: 'numeric',
// 		second: 'numeric'
// 	}

// 	const formatter = new Intl.DateTimeFormat([], options)
// 	const timeArray = formatter.format(new Date()).split(', ')

// 	let customerUpdateDelete = customerEntry as CustomerInfo
// 	let newCustomerToParse = customerEntry as CustomerEntries

// 	function iscustomerInfo(
// 		customerEntry: CustomerInfo | CustomerEntries
// 	): customerEntry is CustomerInfo {
// 		return (customerEntry as CustomerInfo).delete !== undefined
// 	}

// 	let newcustomer: CustomerInfo | any = {}

// 	switch (actionType) {
// 		case 'delete':
// 			// let newCustomer: customerInfo
// 			const deleted = {
// 				status: '削除',
// 				deletedDate: timeArray[0],
// 				deletedTime: timeArray[1]
// 			}

// 			if (iscustomerInfo(customerEntry)) {
// 				customerEntry.delete.status = deleted.status
// 				customerEntry.delete.deletedDate = deleted.deletedDate
// 				customerEntry.delete.deletedTime = deleted.deletedTime

// 				newcustomer = customerEntry
// 			}
// 		case 'update':
// 			const updated = {
// 				status: '更新',
// 				lastUpdatedDate: timeArray[0],
// 				lastUpdatedTime: timeArray[1]
// 			}

// 			newcustomer = new Customer(customerEntry, postDateArray, updated)

// 			// if (iscustomerInfo(customerEntry)) {
// 			// 	customerEntry.update.status = updated.status
// 			// 	customerEntry.update.lastUpdatedDate = updated.lastUpdatedDate
// 			// 	customerEntry.update.lastUpdatedTime = updated.lastUpdatedTime
// 			// 	return (newcustomer = customerEntry)
// 			// }
// 			break
// 		default:
// 			const registration = {
// 				status: '登録',
// 				date: timeArray[0],
// 				time: timeArray[1]
// 			}

// 			if (!iscustomerInfo(customerEntry)) {
// 			}
// 			break
// 	}

// 	return newcustomer
// }

export const parseBeforePost = (entries: CustomerEntries): CustomerInfo => {
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
	const timeArray = formatter.format(new Date()).split(', ')

	const registration = {
		status: '登録',
		date: timeArray[0],
		time: timeArray[1]
	}

	return new Customer(entries, registration)
}

export const parseBeforeDelete = (customer: CustomerInfo) => {
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
	const timeArray = formatter.format(new Date()).split(', ')

	const deleted = {
		status: '削除',
		deletedDate: timeArray[0],
		deletedTime: timeArray[1]
	}

	customer.delete.status = deleted.status
	customer.delete.deletedDate = deleted.deletedDate
	customer.delete.deletedTime = deleted.deletedTime

	return customer
}

export const parseBeforeUpdate = (entries: CustomerEntries, registration: any): CustomerInfo => {
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
	const timeArray = formatter.format(new Date()).split(', ')

	const updated = {
		status: '更新',
		date: timeArray[0],
		time: timeArray[1]
	}

	return new Customer(entries, registration, updated)
}
