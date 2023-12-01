import { error } from '@sveltejs/kit'
import { loadData, updateCustomer, loadDepartments } from '@/libs/actions.js'
import type { CustomerEntries } from '@/libs/customerTypes.js'
import { formatCustomer } from '@/libs/formatters.js'
import type { CustomerBackend, CustomerNewApi } from '@/models/BackendCustomer.js'
import { currentApi } from '@/data/api.js'

/**
 * We load the necessary data.
 * @param param0 corresponds to the parameters of the page
 * @returns
 */
export const load = async ({ params }) => {
	// const data: CustomerBackend[] = await loadData(currentApi)
	// const customer: CustomerBackend | undefined = data.find(
	// 	(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	// )

	const data: CustomerNewApi[] = await loadData(currentApi)
	const customer: CustomerNewApi | undefined = data.find(
		(customer: CustomerNewApi) => customer.id?.toString() === params.id.toString()
	)

	const departmentsList = loadDepartments(currentApi)

	if (!customer) throw error(404)

	return {
		customer,
		departmentsList
	}
}

/**
 * We declare the different actions will use on the page.
 * Here, we will only update the customer information. So, we just have only one action.
 */
export const actions = {
	update: async ({ request }) => {
		const data = await request.formData()
		let initialState: CustomerEntries

		const initialStateString = data.get('initialState')
		if (typeof initialStateString === 'string') {
			initialState = JSON.parse(initialStateString)

			const registration = {
				registDate: initialState.registrationDate,
				registBy: initialState.registeredBy
			}

			const updatedCustomer = formatCustomer('update', initialState, registration)

			if (initialState.id) {
				updateCustomer(updatedCustomer, currentApi, initialState.id)
			}
		}
	}
}
