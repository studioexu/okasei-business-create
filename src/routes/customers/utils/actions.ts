import { Company } from './classes'

/**
 * Load the data from the server.
 * @param url : string, corresponding to URL of the server
 * @returns the data from the server
 */
export const loadData = async (url: string) => {
	return await fetch(url)
		.then(res => res.json())
		.then(data => {
			return data
		})
		.catch(error => console.log(error))
}

/**
 * delete the corresponding customer from the active customers, and put it in the deleted customers
 * Customersを削除して、Deleted Customersに追加する。
 * @param url : string, corresponding to URL of the server
 * @param customerId : string, corresponding to the customer's id we want to delete
 * @returns the new data
 */
export const deleteItem = (customerId: string, url: string) => {
	//We get the customer information so we can POST the information in the deletedCustomers.
	//顧客の情報をGETして、DeletedCustomersにPOSTする。
	fetch(url + customerId, {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' }
	})
		.then(res => res.json())
		.then(newData => {
			fetch('http://localhost:3000/deletedCustomers/', {
				method: 'POST',
				headers: { 'Content-type': 'application/json;charset=UTF-8' },
				body: JSON.stringify(newData)
			})
		})

	//We DELETE the customer from the "Customers" database.
	//DBからCustomersを削除する
	fetch(url + customerId, {
		method: 'DELETE',
		headers: { 'Content-type': 'application/json;charset=UTF-8' }
	}).then(res => res.json())
	// .then(newData => {
	// 	return newData
	// })

	return loadData(url)
}

export const post = (companyEntry: Object) => {
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

	let newCompany = new Company(companyEntry, registration)

	fetch('http://localhost:3000/customers/', {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
		body: JSON.stringify(newCompany)
	})
		.then(() => console.log('yeah'))
		.catch(err => console.log(err))
}
