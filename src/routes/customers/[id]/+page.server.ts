import { error } from '@sveltejs/kit'
import { loadData } from '../utils/actions.js'

import type { CustomerBackend } from '../utils/classes.js'

export const load = async ({ params }) => {
	const localUrl = 'http://localhost:3000/customers/'
	const demoUrl = 'https://fake-server-2x0o.onrender.com/customers/'

	const data: CustomerBackend[] = await loadData(demoUrl)
	const customer: CustomerBackend | undefined = data.find(
		(customer: CustomerBackend) => customer.Cust_CD?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

	return {
		customer
	}
}
