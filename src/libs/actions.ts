import { currentKey } from '@/data/api'
import { formatCustomer } from './formatters'
import type { CustomerFactory } from '@/Factories/CustomerFactory'
import type { CustomerBackend, CustomerNewApi } from '@/models/BackendCustomer'
import { json } from '@sveltejs/kit'

/**
 * Load the data from the server.
 * サーバーからデータを読み込む。
 * @param url : string, corresponding to URL of the server
 * @returns the data from the server
 */
export const loadData = async (url: string) => {
	return await fetch(url + '/customer/list/customer', {
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-Type': 'application/json'
		},
		method: 'GET'
	})
		.then(res => res.json())
		.then(data => {
			return data.results
		})
		.catch(error => console.log(error))
}

/**
 * POST the new customer into the server.
 * 新しいカスタマーを登録する。
 * @param customerEntry : Object corresponding to the inputs entered by the user.
 */
export const createCustomer = async (newCustomer: Object, url: string) => {
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
 * @param updatedCustomer : CustomerInfo is an object with the type CustomerInfo
 * @param url : string, corresponding to url of the database
 * @param customerId : string, corresponding to the id of the customer we want to update.
 */
export const updateCustomer = (updatedCustomer: Object, url: string, customerId: string) => {
	fetch(url + '/customer/update/' + customerId, {
		method: 'PUT',
		headers: {
			Authorization: 'Token ' + currentKey,
			'Content-type': 'application/json;charset=UTF-8'
		},
		body: JSON.stringify(updatedCustomer)
	})
		.then(res => res.json())
		.then(data => {
			console.log('Customer successfully updated')
			console.log(data)
		})
		.catch(err => console.log(err))
}

/**
 * delete the corresponding customer from the active customers, and put it in the deleted customers
 * Customersからカスタマーを削除して、Deleted Customersに追加する。
 * @param url : string, corresponding to URL of the server
 * @param customerId : string, corresponding to the customer's id we want to delete
 * @returns the new data
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
