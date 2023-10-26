import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from './utils/actions.js'
import { currentUrl } from './data/url'

export const load = async () => {
	const data: any[] = await loadData(currentUrl)

	if (!data) throw error(404)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		deleteCustomer(id, currentUrl)
	}
}
