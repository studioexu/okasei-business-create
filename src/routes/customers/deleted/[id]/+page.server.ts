import { error } from '@sveltejs/kit'
import { loadData } from '@/routes/customers/utils/actions.js'

import type { CustomerInfo } from '@/routes/customers/utils/types.ts'

export const load = async ({ params }) => {
	const data: CustomerInfo[] = await loadData('http://localhost:3000/deletedCustomers')
	const customer: CustomerInfo | undefined = data.find(
		(customer: CustomerInfo) => customer.id === params.id
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}
