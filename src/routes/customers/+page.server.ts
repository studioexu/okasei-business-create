import { error } from '@sveltejs/kit'
import { loadData, create } from './utils/actions.js'
import { deleteItem } from './utils/actions.js'

import type { CustomerInfo } from './utils/types.js'
import { parseBeforeDelete } from './utils/parsers.js'

export const load = async () => {
	const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')
	const deletedData: CustomerInfo[] = await loadData('http://localhost:3000/deletedCustomers')

	if (!data) throw error(404)

	return {
		data,
		deletedData
	}
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		if (id) {
			fetch('http://localhost:3000/customers/' + id, {
				method: 'GET',
				headers: { 'Content-type': 'application/json;charset=UTF-8' }
			})
				.then(res => {
					return res.json()
				})
				.then(newData => {
					const parsedCustomer = parseBeforeDelete(newData)
					create(parsedCustomer, 'http://localhost:3000/deletedCustomers/')
				})

			deleteItem(id, 'http://localhost:3000/customers/')
		}
	}
}
