import { prefectures } from '../data/prefectures'

/**
 * We want to check if the user only use katakana
 * カナのところにカタカナで入力したかどうかと確認する。
 * @param kanaString : string, we want to check
 * @returns boolean
 */
export const kanaValidation = (kanaString: string) => {
	const regex = /^[ァ-ン ー]+$/
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
 * @param postalCode : string
 * @returns boolean
 */
export const postalCodeValidation = (postalCode: string) => {
	const regex = /[0-9]{7}/g
	return regex.test(postalCode)
}

//OLD version accepting "-" and postal code icon "〒"
// export const postalCodeValidation = (postalCode: string) => {
// 	const regex = /〒?[0-9]{3}-?[0-9]{4}/g
// 	return regex.test(postalCode)
// }

/**
 * check if the year input is correct
 * 数字が入れたかどうか確認する。
 * @param year: string
 * @returns boolean
 */
export const checkIfYearIsValid = (year: string) => {
	const yearInt = parseInt(year)
	const currentYear = new Date().getFullYear()

	return yearInt !== 0 && yearInt <= currentYear
}

/**
 *
 * @param input : we check if the month entered is between 0 excluded and 12 included
 * @returns boolean
 */
export const checkIfMonthIsValid = (input: string): boolean => {
	const monthInt = parseInt(input)

	return monthInt > 0 && monthInt <= 12
}

/**
 * We limit the number of characters to avoid any code injection
 * 文字の数の制限を作る。
 * @param input : string
 * @returns boolean
 */
export const numberOFCharacterValidation = (input: string, maxCharacter: number): boolean => {
	const lengthOfInput = input.length

	return lengthOfInput <= maxCharacter && lengthOfInput > 0
}

/**
 * Just in case, we check the seletected prefecture.
 * 万が一、選択された都道府県を確認する。Inputなので、違うインプットする可能性がある。
 * @param input : string corresponding to the seletected prefecture
 * @returns
 */
export const checkIfPrefectureIsValid = (input: string): boolean => {
	return prefectures.includes(input)
}

/**
 * We check in the input is a number once it is converted into an int.
 * Intに変更し、数字であれかどうかと確認する。
 * @param input : string input from the user
 * @returns boolean
 */
export const checkIfInputIsNumber = (input: string): boolean => {
	return !isNaN(parseInt(input))
}

/**
 * This function groups all the validators to check if the input is valid according to their type
 * @param name : string, is the type of the input
 * @param input : string, is the input entered by the user
 * @returns boolean
 */
export const inputIsValid = (name: string, input: string): boolean => {
	switch (name) {
		case 'branchNumber':
			return checkIfInputIsNumber(input) && numberOFCharacterValidation(input, 4)

		case 'customerName':
			return numberOFCharacterValidation(input, 128)

		case 'kana':
			return kanaValidation(input)

		case 'facilityNumber':
			return checkIfInputIsNumber(input) && numberOFCharacterValidation(input, 10)

		case 'postalCode':
			return postalCodeValidation(input)

		case 'prefecture':
			return checkIfPrefectureIsValid(input)

		case 'city':
			return numberOFCharacterValidation(input, 20) || input === ''

		case 'address1':
			return numberOFCharacterValidation(input, 200) || input === ''

		case 'address2':
			return numberOFCharacterValidation(input, 200) || input === ''

		case 'phoneNumber':
			return phoneNumberValidation(input)

		case 'fax':
			return input === '' || phoneNumberValidation(input)

		case 'year':
			return input === '' || checkIfYearIsValid(input)

		case 'month':
			return input === '' || checkIfMonthIsValid(input)

		case 'founder':
			return input === '' || numberOFCharacterValidation(input, 100)

		case 'quantity':
			return checkIfInputIsNumber(input)

		case 'numberOfEmployees':
			return input === '' || checkIfInputIsNumber(input)

		case 'homepage':
			return input === '' || numberOFCharacterValidation(input, 200)

		default:
			return true
	}
}
