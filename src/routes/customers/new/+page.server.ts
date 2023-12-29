import type { CustomerEntries } from '@/libs/customerTypes'
import { formatCustomer } from '@/libs/formatters.js'
import { createCustomer, loadDepartments } from '@/libs/actions'
import { currentApi } from '@/data/api'
import type { CustomerApi } from '@/models/CustomerApi.js'
import { debounce } from '@/libs/utils'
import { error } from '@sveltejs/kit'

export const load = async () => {
	const departmentsList = loadDepartments(currentApi)

	if (!departmentsList) throw error(404)

	return {
		departmentsList
	}
}

export const actions = {
	create: debounce(async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')
		let initialState: CustomerEntries = JSON.parse(initialStateString)
		let newCustomer: CustomerApi = formatCustomer('create', initialState)

		createCustomer(newCustomer, currentApi)
	}, 200)
}
