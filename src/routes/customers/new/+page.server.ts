import type { CustomerEntries } from '@/utils/customers/types'
import { parseBeforePost } from '@/utils/customers/parsers'
import { create } from '@/utils/customers/actions'
import { currentApi } from '@/data/api'

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
