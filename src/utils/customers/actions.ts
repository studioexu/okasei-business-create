import { parseBeforeDelete } from './parsers'

/**
 * Load the data from the server.
 * サーバーからデータを読み込む。
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
 * POST the new customer into the server.
 * 新しいカスタマーを登録する。
 * @param customerEntry : Object corresponding to the inputs entered by the user.
 */
export const create = async (newCustomer: Object, url: string) => {
	await fetch(url, {
		method: 'POST',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
		body: JSON.stringify(newCustomer)
	})
		.then(res => res.json())
		.then(data => console.log(data))
		.then(() => console.log('Customer successfully created'))
		.catch(err => console.log(err))
}

/**
 * This function update the customer information in the database
 * カスタマーの情報をアップデートするためのfunction.
 * @param updatedCustomer : CustomerInfo is an object with the type CustomerInfo
 * @param url : string, corresponding to url of the database
 * @param customerId : string, corresponding to the id of the customer we want to update.
 */
export const update = (updatedCustomer: Object, url: string, customerId: string) => {
	fetch(url + customerId, {
		method: 'PUT',
		headers: { 'Content-type': 'application/json;charset=UTF-8' },
		body: JSON.stringify(updatedCustomer)
	})
		.then(() => console.log('Customer successfully updated'))
		.catch(err => console.log(err))
}

/**
 * delete the corresponding customer from the active customers, and put it in the deleted customers
 * Customersからカスタマーを削除して、Deleted Customersに追加する。
 * @param url : string, corresponding to URL of the server
 * @param customerId : string, corresponding to the customer's id we want to delete
 * @returns the new data
 */
export const deleteCustomer = (customerId: string, url: string) => {
	fetch(url + customerId, {
		method: 'GET',
		headers: { 'Content-type': 'application/json;charset=UTF-8' }
	})
		.then(res => res.json())
		.then(customer => {
			const deletedCustomer = parseBeforeDelete(customer)
			fetch(url + customerId, {
				method: 'PUT',
				headers: { 'Content-type': 'application/json;charset=UTF-8' },
				body: JSON.stringify(deletedCustomer)
			})
				.then(res => res.json())
				.then(data => {
					console.log('Customer successfully deleted')
					console.log(data)
				})
				.catch(err => console.log(err))
		})
}
