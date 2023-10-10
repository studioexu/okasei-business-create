import { error } from '@sveltejs/kit'
import { loadData } from './utils/actions.js'
import { deleteItem } from './utils/actions.js'

import type { CustomerInfo } from './utils/types.js'

export const load = async () => {
	const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')

	if (!data) throw error(404)

	return {
		data
	}
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()

		if (typeof data.get('id') === 'string') {
			deleteItem(data.get('id'), 'http://localhost:3000/customers/')
		}
	}
}
