export const postalCodeFormatter = (postalCode: string) => {
	let postalCodeArray = postalCode.split('')
	let formattedPostalCode = postalCode

	if (postalCodeArray[0] === '〒') {
		postalCodeArray.shift()
	}

	if (postalCodeArray[3] !== '-') {
		const arr1 = postalCodeArray.slice(0, 3)
		const arr2 = postalCodeArray.slice(3)
		postalCodeArray = [...arr1, '-', ...arr2]
	}

	return postalCodeArray.join('')
}

export const phoneNumberFormatter = (phoneNumber: string) => {}
