import { error } from '@sveltejs/kit'
import { loadData } from '../utils/actions.js'

import type { CustomerInfo } from '../utils/types.ts'
import type { CustomerBackend } from '../utils/classes.js'

// export const load = async ({ params }) => {
// 	const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')
// 	const customer: CustomerInfo | undefined = data.find(
// 		(customer: CustomerInfo) => customer.id?.toString() === params.id.toString()
// 	)

// 	if (!customer) throw error(404)

// 	return {
// 		customer
// 	}
// }

export const load = async ({ params }) => {
	const data: CustomerBackend[] = await loadData('http://localhost:3000/customers')
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}
