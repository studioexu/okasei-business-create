import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'
import { negotiations } from '@/stores/negotiations'

export const load = async () => {
	const customers: any[] = await loadData(currentApi, currentKey)

	if (!customers) throw error(404)

	return { customers }
}
