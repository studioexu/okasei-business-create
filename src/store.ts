import { writable } from 'svelte/store'

// const count = writable(0)

// export let data = await

interface CompanyInfo {
	customerNumber: string
	branchNumber: string
	facilityName: string
	kana: string
	facilityNumber: string
	businessType: string
	address: {
		postalCode: string
		prefecture: string
		city: string
		address1: string
		address2: string
		phoneNumber: string
		fax: string
	}
	numberOfEmployees: string
	homepage: string
	numberOfFacilities: string
	registration: {
		status: string
		registrationDate: string
		lastUpdated: string
	}
}

export let companies = writable([])

// const loadCompany = async (url: string) => {
// 	let dataToLoad = await fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
// 			return data
// 		})
// 		.catch(error => console.log(error))

//     dataToLoad.map((company: CompanyInfo )=> {
//         companies.update(() =>
//         companies.update((oldArray)=>[...oldArray, company])
//     }

// export function reducible(state, reducer) {
// 	const { update, subscribe } = writable(state)

// 	function dispatch(action) {
// 		update(state => reducer(state, action))
// 	}

// 	return [{ subscribe }, dispatch]
// }

// const reducer = (data, action) => {
// 	switch (action.type) {
// 		case 'load':
// 			return fetch('http://localhost:3000/customers')
// 				.then(res => res.json())
// 				.then(data => {
// 					return data
// 				})
// 				.catch(error => console.log(error))
// 		case 'delete':
// 			fetch('http://localhost:3000/customers/' + customerId, {
// 				method: 'GET',
// 				headers: { 'Content-type': 'application/json;charset=UTF-8' }
// 			})
// 				.then(res => res.json())
// 				.then(newData => {
// 					fetch('http://localhost:3000/deletedCustomers/', {
// 						method: 'POST',
// 						headers: { 'Content-type': 'application/json;charset=UTF-8' },
// 						body: JSON.stringify(newData)
// 					})
// 				})

// 			//We DELETE the customer from the "Customers" database.
// 			fetch('http://localhost:3000/customers/' + customerId, {
// 				method: 'DELETE',
// 				headers: { 'Content-type': 'application/json;charset=UTF-8' }
// 			})
// 				.then(res => res.json())
// 				.then(newData => {
// 					return newData
// 				})

// 			//We GET the updated "Customers" database to display it.
// 			return fetch('http://localhost:3000/customers/', {
// 				method: 'GET',
// 				headers: { 'Content-type': 'application/json;charset=UTF-8' }
// 			})
// 				.then(res => res.json())
// 				.then(newData => {
// 					return newData
// 				})
// 		case 'update':
// 	}
// }

// export const loadAllCompanies = async () => {
// 	data.update(() => {
// 		const newData = fetch('http://localhost:3000/customers')
// 			.then(res => res.json())
// 			.then(data => {
// 				return data.customers
// 			})
// 			.catch(error => console.log(error))

// 		return newData
// 	})
// }

export const loadData = async () => {}
