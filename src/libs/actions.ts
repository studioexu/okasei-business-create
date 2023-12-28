import { currentKey } from '@/data/api'
import type { CustomerNewApi } from '@/models/BackendCustomer'

/**
 * Load the data from the server.
 * サーバーからデータを読み込む。
 * @param url:string, corresponding to URL of the API. APIのURLである。
 * @returns エラーもしくは顧客のArray。Error or array of customers.
 */
export const loadCustomerData = async (url: string) => {
	return await fetch(url + '/customer/list/customer', {
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			return data.results
		})
		.catch(error => error)
}

/**
 *
 * @param url:string, corresponding to URL of the API. APIのURLである。
 * @param customerId: string, corresponding the the customer's id. We get the id from the URL's parameters.
 * 顧客のIDである。URLのパラメターからいただく。
 * @returns エラーもしくは画像のArray
 */
export const loadCustomerImages = async (url: string, customerId: string) => {
	return await fetch(url + '/customer/list/customer_images/' + customerId, {
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			return data
		})
		.catch(error => error)
}

/**
 * POST the new customer into the server.
 * 新しいカスタマーを登録する。
 * @param customerEntry : Object corresponding to the inputs entered by the user.
 * @param url:string, corresponding to URL of the API. APIのURLである。
 *
 */
export const createCustomer = async (newCustomer: CustomerNewApi, url: string) => {
	await fetch(url + '/customer/register', {
		method: 'POST',
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(newCustomer)
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			console.log('Customer successfully created')
		})
		.catch(err => console.log(err))
}

/**
 * This function update the customer information in the database
 * カスタマーの情報をアップデートするためのfunction.
 * @param updatedCustomer : CustomerInfo is an object with the type CustomerInfo. 更新された情報である。
 * @param url:string, corresponding to URL of the API. APIのURLである。
 * @param customerId : string, corresponding to the id of the customer we want to update. ユーザーが更新したがる顧客のIDである。
 */
export const updateCustomer = async (
	updatedCustomer: CustomerNewApi,
	url: string,
	customerId: number
) => {
	await fetch(url + '/customer/update/' + customerId, {
		method: 'PUT',
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify(updatedCustomer)
	})
		.then(res => {
			console.log('update customer')

			return res.json()
		})
		.then(data => {
			console.log('Customer successfully updated')
			console.log(data)
		})
		.catch(err => console.log(err))
}

/**
 * delete the corresponding customer from the active customers, and put it in the deleted customers
 * Customersからカスタマーを削除して、Deleted Customersに追加する。
 * @param url:string, corresponding to URL of the API. APIのURLである。
 * @param customerId : string, corresponding to the customer's id we want to delete。ユーザーが削除したがる顧客のIDである。
 */
export const deleteCustomer = (id: number, url: string) => {
	fetch(url + '/customer/inactivate/' + id, {
		method: 'PATCH',
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-type': 'application/json;charset=UTF-8'
		},
		redirect: 'follow'
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			console.log('Successfully deleted')
		})
		.catch(err => console.log(err))
}

/**
 * Reactivate a deleted customer.
 * 削除された顧客を有効化する。
 * @param url:string, corresponding to URL of the API. APIのURLである。
 * @param customerId : string, id of the customer that the user wants to reactivate. ユーザーが有効化したがる顧客のIDである。
 */
export const reactivateCustomer = (id: number, url: string) => {
	fetch(url + '/customer/activate/' + id, {
		method: 'PATCH',
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-type': 'application/json;charset=UTF-8'
		},
		redirect: 'follow'
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			console.log('Successfully reactivated')
		})
		.catch(err => console.log(err))
}

/**
 *
 *@param url:string, corresponding to URL of the API. APIのURLである。
 *@returns departments array. 診療科目のArray
 */
export const loadDepartments = async (url: string) => {
	return await fetch(url + '/customer/list/department', {
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			return data
		})
		.catch(error => console.log(error))
}

export const login = async (url: string) => {
	const key = await fetch(url + '/api-auth/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: '',
			password: ''
		})
	})
		.then(res => res.json())
		.then(data => {
			console.log(data)
			return data.key
		})
		.catch(err => err)

	return key
}
