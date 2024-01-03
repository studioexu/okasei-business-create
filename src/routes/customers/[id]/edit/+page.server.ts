import { error } from '@sveltejs/kit'
import {
	loadCustomerData,
	updateCustomer,
	loadDepartments,
	loadCustomerImages
} from '@/libs/actions.js'
import type { CustomerEntries } from '@/libs/customerTypes.js'
import { formatCustomer } from '@/libs/formatters.js'
import type { CustomerApi } from '@/models/CustomerApi.js'
import { currentApi, currentKey } from '@/data/api.js'
import { debounce } from '@/libs/utils'

/**
 * We load the necessary data.
 * @param param0 corresponds to the parameters of the page
 * @returns
 */
export const load = async ({ params }) => {
	const data: CustomerApi = await loadCustomerData(currentApi)
	const departmentsList = await loadDepartments(currentApi)
	const images = await loadCustomerImages(currentApi, params.id)

	const customer: CustomerApi | undefined = data.find(
		(customer: CustomerApi) => customer.id?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)
	if (!departmentsList) throw error(404)

	return {
		customer,
		departmentsList,
		images
	}
}

/**
 * We declare the different actions will use on the page.
 * Here, we will only update the customer information. So, we just have only one action.
 */
export const actions = {
	update: async ({ request }) => {
		const data = await request.formData()
		const initialStateString = data.get('initialState')

		let initialState: CustomerEntries =
			typeof initialStateString === 'string' && JSON.parse(initialStateString)

		const updatedCustomer = formatCustomer('update', initialState)

		if (initialState.id) {
			updateCustomer(updatedCustomer, currentApi, initialState.id)
		}
		return false
	}
}
