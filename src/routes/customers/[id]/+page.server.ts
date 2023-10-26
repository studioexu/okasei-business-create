import { error } from '@sveltejs/kit'
import { loadData } from '../utils/actions.js'
import { currentUrl } from '../data/url'

import type { CustomerBackend } from '../utils/classes.js'

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
