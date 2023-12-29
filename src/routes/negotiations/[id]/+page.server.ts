import { error } from '@sveltejs/kit'
import { loadCustomerData, deleteCustomer } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'

export const load = async () => {
	const data: any[] = await loadCustomerData(currentApi)

	if (!data) throw error(404)

	return { data }
}
