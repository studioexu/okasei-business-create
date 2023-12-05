import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/libs/actions.js'
import { currentApi } from '@/data/api.js'

export const load = async () => {
	const data: any[] = await loadData(currentApi)

	if (!data) throw error(404)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		console.log('please delete')

		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		deleteCustomer(id, currentApi)
	}
}
