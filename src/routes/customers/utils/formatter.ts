import { parsePhoneNumber } from 'libphonenumber-js'

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
		case 'phoneNumber':
			return phoneNumberFormatter(input)
		case 'postalCode':
			return postalCodeFormatter(input)
		default:
			return input
	}
}
