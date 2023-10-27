import type { CustomerEntries } from '../utils/types'
import { parseBeforePost } from '../utils/parsers'
import { create } from '../utils/actions'
import { currentApi } from '../data/api'

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries

		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)

			let newCustomer = parseBeforePost(initialState)

			create(newCustomer, currentApi)
		}
	}
}
