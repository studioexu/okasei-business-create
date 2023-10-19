import { error, redirect } from '@sveltejs/kit'
import { loadData, update } from '../../utils/actions.js'
import type { CustomerEntries, CustomerInfo } from '../../utils/types.ts'
import { parseBeforeUpdate } from '../../utils/parsers.js'
import type { CustomerBackend } from '../../utils/classes.js'

export const load = async ({ params }) => {
	const data: CustomerBackend[] = await loadData('http://localhost:3000/customers/')
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}

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
				update(updatedcustomer, 'http://localhost:3000/customers/', initialState.id)
			}
		}
	}
}
