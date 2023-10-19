import { error } from '@sveltejs/kit'
import { loadData, create, deleteCustomer } from './utils/actions.js'
import { deleteItem } from './utils/actions.js'

import type { CustomerInfo } from './utils/types.js'
import { parseBeforeDelete } from './utils/parsers.js'
import { CustomerFactory } from './utils/Factories/CustomerFactory.js'

export const load = async () => {
	// const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')
	const data: any[] = await loadData('http://localhost:3000/customers')

	if (!data) throw error(404)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')
		console.log('Heheheheheheheheheeh')

		deleteCustomer(id, 'http://localhost:3000/customers/')
		// console.log(new Date().getHours)

		// return await load()
	}
}
