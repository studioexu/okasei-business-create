import type { CustomerEntries } from '../utils/types'
import { parseBeforePost } from '../utils/parsers'
import { create } from '../utils/actions'

const localUrl = 'http://localhost:3000/customers/'
const demoUrl = 'https://fake-server-2x0o.onrender.com/customers/'

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries

		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)

			let newCustomer = parseBeforePost(initialState)

			create(newCustomer, demoUrl)
			// create(newCustomer, 'https://fake-server-2x0o.onrender.com/api/customers')
		}
	}
}
