import type { CustomerEntries } from '@/libs/customerTypes'
import { formatCustomer } from '@/libs/formatters.js'
import { createCustomer, loadDepartments } from '@/libs/actions'
import { currentApi } from '@/data/api'
import type { CustomerBackend, CustomerNewApi } from '@/models/BackendCustomer.js'
import { debounce } from '@/libs/utils'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
	const departmentsList = loadDepartments(currentApi)

	if (!departmentsList) throw error(404)

	return {
		departmentsList
	}
}

export const actions = {
	create: debounce(async ({ request }) => {
		console.log('hello')

		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries

		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)
			// console.log(initialState)

			let newCustomer: CustomerNewApi = formatCustomer('create', initialState)
			console.log('create')

			console.log(newCustomer)

			createCustomer(newCustomer, currentApi)
		}
	}, 200)
}
