export const kanaValidation = (kanaString: string) => {
	const regex = /^[ァ-ン]+$/
	return regex.test(kanaString)
}

export const phoneNumberValidation = (phoneNumber: string) => {
	const regex =
		/^(([0-9]{10}$)|([0-9]{3}-[0-9]{3}-[0-9]{4}$)|([0-9]{2}-[0-9]{4}-[0-9]{4}$)|([0-9]{3}-[0-9]{4}-[0-9]{4}$))/g

	return regex.test(phoneNumber)
}

export const postalCodeValidation = (postalCode: string) => {
	const regex = /〒?[0-9]{3}-?[0-9]{4}/g
	return regex.test(postalCode)
}

export const yearValidation = (year: string) => {
	const yearInt = parseInt(year)
	const currentYear = new Date().getFullYear()

	return yearInt !== 0 && yearInt <= currentYear
}

export const numberOFCharacterValidation = (input: string) => {
	const lengthOfInput = input.length

	return lengthOfInput <= 50 && lengthOfInput > 0
}

export const inputIsValid = (name: string, input: string): boolean => {
	switch (name) {
		case 'kana':
			return kanaValidation(input)

		case 'facilityName':
			return numberOFCharacterValidation(input)

		case 'phoneNumber':
			return phoneNumberValidation(input)

		case 'fax':
			return phoneNumberValidation(input)

		case 'postalCode':
			return postalCodeValidation(input)

		case 'year':
			return yearValidation(input)

		case 'address1':
			return numberOFCharacterValidation(input)

		case 'address2':
			return numberOFCharacterValidation(input)

		case 'founder':
			return numberOFCharacterValidation(input)

		default:
			return true
	}
}
