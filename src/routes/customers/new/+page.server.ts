import type { CustomerEntries } from '@/libs/customerTypes'
import { formatCustomer } from '@/libs/formatters.js'
import { createCustomer } from '@/libs/actions'
import { currentApi } from '@/data/api'
import type { CustomerBackend } from '@/models/BackendCustomer.js'
import { debounce } from '@/libs/utils'

export const actions = {
	create: debounce(async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries

		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)
			console.log(initialState)

			let newCustomer: CustomerBackend = formatCustomer('create', initialState)
			createCustomer(newCustomer, currentApi)
		}
	}, 200)
}
