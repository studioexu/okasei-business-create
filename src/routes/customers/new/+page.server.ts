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

			let newCustomer = parseBeforePost(initialState)
			console.log('new customer')

			console.log(newCustomer)

			create(newCustomer, 'http://localhost:3000/customers/')
			console.log('yatta')
		}
	}
}
