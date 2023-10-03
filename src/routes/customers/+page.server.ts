import { error } from '@sveltejs/kit'
import { loadData } from './utils/actions.js'

import type { CompanyInfo } from './+page.svelte'

let data: CompanyInfo[] = await loadData('http://localhost:3000/customers')

export function load({ params }) {
	const companies: CompanyInfo[] = data

	console.log(companies)

	if (!companies) throw error(404)

	return {
		companies
	}
}
