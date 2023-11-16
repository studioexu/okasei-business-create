import type { CustomerEntries } from '@/libs/customerTypes'
import { formatCustomer } from '@/libs/formatters.js'
import { createCustomer } from '@/libs/actions'
import { currentApi } from '@/data/api'
import type { CustomerBackend } from '@/models/BackendCustomer.js'

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries

		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)

			let newCustomer: CustomerBackend = formatCustomer('create', initialState)

			console.log(newCustomer)

			createCustomer(newCustomer, currentApi)
		}
	}
}
