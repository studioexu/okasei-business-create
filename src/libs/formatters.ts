import { parsePhoneNumber } from 'libphonenumber-js'
import { CustomerApi } from '@/models/CustomerApi'
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

	const day: string =
		currentTime.getUTCDate() < 10
			? '0' + currentTime.getUTCDate().toString()
			: currentTime.getUTCDate().toString()
	const month: string =
		currentTime.getUTCMonth() + 1 < 10
			? '0' + (currentTime.getUTCMonth() + 1).toString()
			: (currentTime.getUTCMonth() + 1).toString()
	const year: string =
		currentTime.getUTCFullYear() < 10
			? '0' + currentTime.getUTCFullYear().toString()
			: currentTime.getUTCFullYear().toString()
	const hour: string =
		currentTime.getUTCHours() < 10
			? '0' + currentTime.getUTCHours().toString()
			: currentTime.getUTCHours().toString()
	const minute: string =
		currentTime.getUTCMinutes() < 10
			? '0' + currentTime.getUTCMinutes().toString()
			: currentTime.getUTCMinutes().toString()
	const second: string =
		currentTime.getUTCSeconds() < 10
			? '0' + currentTime.getUTCSeconds().toString()
			: currentTime.getUTCSeconds().toString()

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
	customer: CustomerEntries
): CustomerApi => {
	const timeArray = getDateTime()

	switch (action) {
		case 'create':
			customer.registrationDate = timeArray
			customer.registeredBy = 1

			return new CustomerApi(customer)

		case 'update':
			customer.updateDate = timeArray
			customer.updateBy = 1
			return new CustomerApi(customer)

		case 'delete':
			customer.deleteDate = timeArray
			customer.deleteBy = 1
			return new CustomerApi(customer)

		default:
			return new CustomerApi(customer)
	}
}

/**
 *
 * @param file: uploaded file。アップロードされたファイル。
 * @returns エラーもしくはBase64のString.Error or base64 string.
 */
export const convertDataToBase64 = (file: File): Promise<string> => {
	return new Promise<string>((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = () => {
			if (typeof fileReader.result === 'string') resolve(fileReader.result)
		}

		fileReader.onerror = error => {
			reject(error)
		}

		fileReader.readAsDataURL(file)
	})
}
