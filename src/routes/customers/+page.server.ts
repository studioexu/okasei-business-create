import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer, login } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'

export const load = async () => {
	let data: any[] = await loadData(currentApi, currentKey)

	return { data, currentKey }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		deleteCustomer(id, currentApi)
	}
}
