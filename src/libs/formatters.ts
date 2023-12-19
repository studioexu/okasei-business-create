import { parsePhoneNumber } from 'libphonenumber-js'
import { CustomerNewApi } from '@/models/BackendCustomer'
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
export const phoneNumberFormatter = (phoneNumber: string): string => {
	if (phoneNumber.length !== 0) {
		return parsePhoneNumber(phoneNumber, 'JP').formatNational()
	} else return ''
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
export const getDateTime = (time?: string): string => {
	let currentTime: Date
	if (time) {
		currentTime = new Date(time)
	} else {
		currentTime = new Date()
	}

	const day =
		currentTime.getUTCDate() < 10 ? '0' + currentTime.getUTCDate() : currentTime.getUTCDate()
	const month =
		currentTime.getUTCMonth() + 1 < 10
			? '0' + currentTime.getUTCMonth() + 1
			: currentTime.getUTCMonth() + 1
	const year =
		currentTime.getUTCFullYear() < 10
			? '0' + currentTime.getUTCFullYear()
			: currentTime.getUTCFullYear()
	const hour =
		currentTime.getUTCHours() < 10 ? '0' + currentTime.getUTCHours() : currentTime.getUTCHours()
	const minute =
		currentTime.getUTCMinutes() < 10
			? '0' + currentTime.getUTCMinutes()
			: currentTime.getUTCMinutes()
	const second =
		currentTime.getUTCSeconds() < 10
			? '0' + currentTime.getUTCSeconds()
			: currentTime.getUTCSeconds()

	const formattedCurrentTime =
		year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z'

	return formattedCurrentTime
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
	customer: CustomerEntries | CustomerNewApi,
	registration?: any,
	update?: any
): CustomerNewApi => {
	const timeArray = getDateTime()

	switch (action) {
		case 'create':
			const create = {
				registDate: timeArray,
				registBy: 1
			}

			return new CustomerNewApi(customer, create)

		case 'update':
			const updated = {
				updateBy: 1,
				updateDate: timeArray
			}

			console.log(new CustomerNewApi(customer, registration, updated))

			return new CustomerNewApi(customer, registration, updated)

		case 'delete':
			const deleted = {
				deleteDate: timeArray,
				deleteBy: 1
			}

			console.log(new CustomerNewApi(customer, registration, update, deleted))

			return new CustomerNewApi(customer, registration, update, deleted)

		default:
			if (customer instanceof CustomerNewApi) {
				return customer
			} else {
				return new CustomerNewApi(customer, registration, update)
			}
	}
}
