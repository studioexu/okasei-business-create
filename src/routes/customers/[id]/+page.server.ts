import { error } from '@sveltejs/kit'
import { loadData } from '../utils/actions.js'
import { currentApi } from '../data/api.js'

import type { CustomerBackend } from '../utils/classes.js'

export const load = async ({ params }) => {
	const data: CustomerBackend[] = await loadData(currentApi)
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)
	console.log(customer)

	if (!customer) throw error(404)

	return {
		customer
	}
}
