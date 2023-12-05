import { error } from '@sveltejs/kit'
import { loadData } from '@/libs/actions.js'
import { currentApi } from '@/data/api.js'

import type { CustomerBackend } from '@/models/BackendCustomer.js'

export const load = async ({ params }) => {
	const data: CustomerBackend[] = await loadData(currentApi)
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}
