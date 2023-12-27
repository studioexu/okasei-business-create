import { prefectures } from '@/data/data'
import { isValidPhoneNumber } from 'libphonenumber-js'
import type { CustomerEntries, CustomerEntriesErrors } from './customerTypes'
import type { Department } from '@/models/Customer'
import { toCamelCase } from './formatters'

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

const checkDepartmentIsValid = (department: Department) => {
	return department.departmentId !== 0
}

const checkAllDepartmentsAreValid = (departments: Department[]) => {
	const errorArray: string[] = []

	departments.map((department: Department) => {
		if (!inputIsValid('department', department)) {
			errorArray.push('error')
		}
	})

	return errorArray.length === 0
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

	return isValidPhoneNumber(phoneNumber, 'JP')
}

/**
 * We check if the postal Code is valid.
 * 郵便番号が正しいかどうか確認する。
 * @param postalCode : string
 * @returns boolean
 */
export const postalCodeValidation = (postalCode: string) => {
	const regex = /^[0-9]{7}$/
	return regex.test(postalCode)
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
export const numberOfCharacterValidation = (input: string, maxCharacter: number): boolean => {
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
export const checkIfInputIsNumber = (input: string | number): boolean => {
	if (typeof input === 'number') return !isNaN(input)
	if (typeof input === 'string') return !isNaN(parseInt(input))

	return false
}

/**
 * This function groups all the validators to check if the input is valid according to their type
 * @param name : string, is the type of the input
 * @param input : string, is the input entered by the user
 * @returns boolean
 */
export const inputIsValid = (name: string, input: any): boolean => {
	switch (name) {
		case 'branchNumber':
			return checkIfInputIsNumber(input) && numberOfCharacterValidation(input, 4)

		case 'facilityNumber':
			return checkIfInputIsNumber(input) && input.length === 10

		case 'quantity':
		case 'numberOfEmployees':
		case 'numberOfFacilities':
			return checkIfInputIsNumber(input)

		case 'postalCode':
			return postalCodeValidation(input)

		case 'phoneNumber':
		case 'fax':
		case 'mobile':
		case 'phone':
			return phoneNumberValidation(input)

		case 'prefecture':
			return checkIfPrefectureIsValid(input)

		case 'businessType':
			return input === 'I' || input === 'C' || input === '法人' || input === '個人'

		case 'month':
			return checkIfMonthIsValid(input)

		case 'customerName':
			return numberOfCharacterValidation(input, 128)

		case 'kana':
			return kanaValidation(input) && numberOfCharacterValidation(input, 128)

		case 'city':
			return numberOfCharacterValidation(input, 20)

		case 'address1':
		case 'address2':
		case 'address':
			return numberOfCharacterValidation(input, 200)

		case 'founder':
		case 'homepage':
			return numberOfCharacterValidation(input, 128)

		case 'department':
			return checkDepartmentIsValid(input)

		case 'departments':
			return checkAllDepartmentsAreValid(input)

		default:
			return true
	}
}

/**
 * Take the form and check if all the entries are valid.
 * If there is one error, the function will return false.
 * @param formEntries: Object of entries
 * @returns boolean
 */
export const validationOnSubmit = (
	formValidation: CustomerEntriesErrors
): { isValid: boolean; formValidation: CustomerEntriesErrors } => {
	let errorArray: boolean[] = []
	let isValid = true

	document.querySelectorAll('.input').forEach((input: any) => {
		const inputId = toCamelCase(input.id)
		const inputValue = input.value
		const inputRequired: boolean = input.dataset.required === 'true'
		const inputType = toCamelCase(input.dataset.type)

		formValidation[inputId as keyof CustomerEntriesErrors] = inputRequired
			? inputIsValid(inputId, inputValue)
			: inputValue === '' || inputIsValid(inputId, inputValue)

		errorArray.push(!formValidation[inputId as keyof CustomerEntriesErrors])
	})

	errorArray.forEach(error => {
		if (error) {
			isValid = false
		}
	})
	return { isValid, formValidation }
}
