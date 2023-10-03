import { error } from '@sveltejs/kit'
// import { posts } from '../data.js';
import { loadData } from '../../utils/actions.js'

import type { CompanyInfo } from '../../+page.svelte'

let data: CompanyInfo[] = await loadData('http://localhost:3000/customers')

export function load({ params }) {
	const company: CompanyInfo | undefined = data.find(
		(company: CompanyInfo) => company.id === params.id
	)
	console.log(company)

	if (!company) throw error(404)

	return {
		company
	}
}
