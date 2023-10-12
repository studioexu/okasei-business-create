import { prefectures } from '../data/data'

/**
 * We want to check if the user only use katakana
 * カナのところにカタカナで入力したかどうかと確認する。
 * @param kanaString : string, we want to check
 * @returns boolean
 */
export const kanaValidation = (kanaString: string) => {
	const regex = /^[ァ-ン]+$/
	return regex.test(kanaString)
}

/**
 * We check if the phone number entered is valid.
 * 日本の電話番号であるかどうかと確認する。
 * @param phoneNumber : string
 * @returns boolean
 */
export const phoneNumberValidation = (phoneNumber: string) => {
	const regex =
		/^(([0-9]{10}$)|([0-9]{3}-[0-9]{3}-[0-9]{4}$)|([0-9]{2}-[0-9]{4}-[0-9]{4}$)|([0-9]{3}-[0-9]{4}-[0-9]{4}$))/g

	return regex.test(phoneNumber)
}

/**
 * We check if the postal Code is valid.
 * 郵便番号が正しいかどうか確認する。
 * @param postalCode : string, the user can entered any postal code (e.g.: 600-0000, 6000000, 〒600-0000 are all accepted)
 * @returns boolean
 */
export const postalCodeValidation = (postalCode: string) => {
	const regex = /〒?[0-9]{3}-?[0-9]{4}/g
	return regex.test(postalCode)
}

/**
 * check if the year input is correct
 * 数字が入れたかどうか確認する。
 * @param year: string
 * @returns boolean
 */
export const yearValidation = (year: string) => {
	const yearInt = parseInt(year)
	const currentYear = new Date().getFullYear()

	return yearInt !== 0 && yearInt <= currentYear
}

/**
 * We limit the number of characters to avoid any code injection
 * 文字の数の制限を作る。
 * @param input : string
 * @returns boolean
 */
export const numberOFCharacterValidation = (input: string) => {
	const lengthOfInput = input.length

	return lengthOfInput <= 50 && lengthOfInput > 0
}

/**
 * Just in case, we check the seletected prefecture.
 * 万が一、選択された都道府県を確認する。Inputなので、違うインプットする可能性がある。
 * @param input : string corresponding to the seletected prefecture
 * @returns
 */
export const checkIfPrefectureIsValid = (input: string) => {
	return prefectures.includes(input)
}

/**
 * This function groups all the validators to check if the input is valid according to their type
 * @param name : string, is the type of the input
 * @param input : string, is the input entered by the user
 * @returns boolean
 */
export const inputIsValid = (name: string, input: string): boolean => {
	switch (name) {
		case 'kana':
			return kanaValidation(input)

		case 'facilityName':
			return numberOFCharacterValidation(input)

		case 'phoneNumber':
			return phoneNumberValidation(input)

		case 'fax':
			return input === '' || phoneNumberValidation(input)

		case 'postalCode':
			return postalCodeValidation(input)

		case 'year':
			return input === '' || yearValidation(input)

		case 'address1':
			return numberOFCharacterValidation(input)

		case 'address2':
			return numberOFCharacterValidation(input)

		case 'founder':
			return input === '' || numberOFCharacterValidation(input)

		case 'prefecture':
			return checkIfPrefectureIsValid(input)

		default:
			return true
	}
}
