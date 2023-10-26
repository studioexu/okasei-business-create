import { error } from '@sveltejs/kit'
import { loadData, update } from '../../utils/actions.js'
import type { CustomerEntries } from '../../utils/types.ts'
import { parseBeforeUpdate } from '../../utils/parsers.js'
import type { CustomerBackend } from '../../utils/classes.js'
import { currentUrl } from '../../data/url'

/**
 * We load the necessary data.
 * @param param0 corresponds to the parameters of the page
 * @returns
 */
export const load = async ({ params }) => {
	const data: CustomerBackend[] = await loadData(currentUrl)
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
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
				registBy: initialState.registrationTime
			}
			const updatedcustomer = parseBeforeUpdate(initialState, registration)

			if (initialState.id) {
				update(updatedcustomer, currentUrl, initialState.id)
			}
		}
	}
}
