import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/libs/actions.js'
import { currentApi } from '@/data/api.js'

export const load = async () => {
	const data: any[] = await loadData(currentApi)

	if (!data) throw error(404)

	return { data }
}
