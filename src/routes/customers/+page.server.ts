import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/utils/customers/actions.js'
import { currentApi } from '@/data/api.js'

const apiUrl = 'http://18.182.209.227/customer/list/customer'

export const load = async () => {
	const data: any[] = await loadData(currentApi)

	if (!data) throw error(404)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		deleteCustomer(id, currentApi)
	}
}
