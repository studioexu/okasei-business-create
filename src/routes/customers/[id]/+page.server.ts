import { error } from '@sveltejs/kit'
import { loadData } from '@/libs/actions.js'
import { currentApi } from '@/data/api.js'

import type { CustomerBackend, CustomerNewApi } from '@/models/BackendCustomer.js'

export const load = async ({ params }) => {
	// const data: CustomerBackend[] = await loadData(currentApi)
	// const customer: CustomerBackend | undefined = data.find(
	// 	(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	// )

	const data: CustomerNewApi[] = await loadData(currentApi)
	const customer: CustomerNewApi | undefined = data.find(
		(customer: CustomerNewApi) => customer.cd?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}
