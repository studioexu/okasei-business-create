import { error } from '@sveltejs/kit'
import { loadData } from '../../utils/actions.js'
import type { CompanyInfo } from '../../utils/types.ts'

export const load = async ({ params }) => {
	const data: CompanyInfo[] = await loadData('http://localhost:3000/customers')
	const company: CompanyInfo | undefined = data.find(
		(company: CompanyInfo) => company.id === params.id
	)

	console.log(company)

	if (!company) throw error(404)

	return {
		company
	}
}
