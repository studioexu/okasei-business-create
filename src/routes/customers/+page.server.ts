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

		console.log(data)

		// if (id) {
		deleteItem(id, 'http://localhost:3000/customers/')
		// }
	}
}
