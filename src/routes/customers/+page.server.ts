import { error } from '@sveltejs/kit'
import { loadData } from './utils/actions.js'

import type { CompanyInfo } from './+page.svelte'

export const load = async () => {
	const data: CompanyInfo[] = await loadData('http://localhost:3000/customers')

	if (!data) throw error(404)

	return {
		data
	}
}
