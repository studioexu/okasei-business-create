import type { CustomerEntries } from '../utils/types'
import { parseBeforePost } from '../utils/parsers'
import { create } from '../utils/actions'

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData()
		let initialState: CustomerEntries

		const initialStateString = data.get('initialState')
		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)

			let newcustomer = parseBeforePost(initialState)
			create(newcustomer, 'http://localhost:3000/customers/')
		}
	}
}
