import { error } from '@sveltejs/kit'
import { loadData } from '../../utils/actions.js'
import type { CustomerInfo } from '../../utils/types.ts'

export const load = async ({ params }) => {
	const data: CustomerInfo[] = await loadData('http://localhost:3000/customers')
	const company: CustomerInfo | undefined = data.find(
		(company: CustomerInfo) => company.id === params.id
	)

	if (!company) throw error(404)

	return {
		company
	}
}
