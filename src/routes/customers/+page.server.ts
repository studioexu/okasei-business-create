import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/libs/actions.js'
import { currentApi } from '@/data/api.js'

export const load = async () => {
	const data: any[] = await loadData(currentApi)

	console.log(data)

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
