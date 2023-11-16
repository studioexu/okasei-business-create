import { parsePhoneNumber } from 'libphonenumber-js'
import { CustomerBackend } from '@/models/BackendCustomer'
import type { CustomerEntries } from './customerTypes'

/**
 *
 * @param postalCode : string, postal code without "-" / 「ー」なしの郵便番号
 * @returns the postal code with a "-" / 「ー」つきの郵便番号
 */
export const postalCodeFormatter = (postalCode: string) => {
	let postalCodeHead = postalCode.slice(0, 3)
	let postalCodeQueue = postalCode.slice(3, 7)

	return postalCodeHead + '-' + postalCodeQueue
}

/**
 *
 * @param phoneNumber :phone number without "-"/ 「ー」なしの電話番号
 * @returns phone number with "-" at the right position　/ 「ー」つきの電話番号
 */
export const phoneNumberFormatter = (phoneNumber: string) => {
	return parsePhoneNumber(phoneNumber, 'JP').formatNational()
}

/**
 *
 * @param input : data we want to format / フォーマットを変えたいデータ
 * @param formatType : type of the input we want to format (phone number, postal code ....)/　データのタイプ
 * @returns formatted string　/ 正しくフォマットされたデータ
 */
export const dataFormatter = (input: string, formatType?: string): string => {
	switch (formatType) {
		case 'phone-number':
			return phoneNumberFormatter(input)
		case 'postal-code':
			return postalCodeFormatter(input)
		default:
			return input
	}
}

export const toCamelCase = (text: string): string => {
	const textArray = text.split('-')
	for (let i = 1; i < textArray.length; i++) {
		textArray[i] = textArray[i].charAt(0).toUpperCase() + textArray[i].substring(1)
	}
	return textArray.join('')
}

/**
 * Get the time and date
 * @returns string with the right date and time
 */
export const getDateTime = (): string => {
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

/**
 * Formt the customer object before sending it to the server
 * サーバーに送る前にCustomerを正しいフォーマットに変更する。
 * @param action : string corresponding the method we use when we send the data to the backend
 * @param customer: Object correponding to the customer information
 * @param registration: registration information (date and the person)
 * @returns Object with the right format for the backend
 */
export const formatCustomer = (
	action: 'update' | 'create' | 'delete',
	customer: CustomerEntries | CustomerBackend,
	registration?: any
): CustomerBackend => {
	const timeArray = getDateTime()

	switch (action) {
		case 'create':
			const create = {
				registDate: timeArray,
				registBy: 1
			}

			return new CustomerBackend(customer, create)

		case 'update':
			const updated = {
				updateBy: 1,
				updateDate: timeArray
			}
			return new CustomerBackend(customer, registration, updated)

		case 'delete':
			const deleted = {
				Delete_Date: timeArray,
				Delete_By: 1
			}

			let customerToUpdate = customer as CustomerBackend
			customerToUpdate.delete = deleted
			customerToUpdate.is_active = false

			return customerToUpdate

		default:
			if (customer instanceof CustomerBackend) {
				return customer
			} else {
				return new CustomerBackend(customer, registration)
			}
	}
}
