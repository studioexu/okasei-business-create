import { error, redirect } from '@sveltejs/kit'
import { loadData, update } from '../../utils/actions.js'
import type { CustomerEntries, CustomerInfo } from '../../utils/types.ts'
import { parseBeforeUpdate } from '../../utils/parsers.js'

export const load = async ({ params }) => {
	const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')
	const customer: CustomerInfo | undefined = data.find(
		(customer: CustomerInfo) => customer.id?.toString() === params.id.toString()
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
			console.log(initialState)

			const registration = {
				status: '登録',
				date: initialState.registrationDate,
				time: initialState.registrationTime
			}
			const updatedcustomer = parseBeforeUpdate(initialState, registration)

			if (initialState.id) {
				update(updatedcustomer, 'http://localhost:3000/customers/', initialState.id)
			}
		}
	}
}
