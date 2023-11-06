import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from '@/utils/customers/actions.js'
import { currentApi } from '@/data/api.js'

const apiUrl = 'http://18.182.209.227/customer/list/customer'

export const load = async () => {
	const data: any[] = await loadData(currentApi)
	// const result: { count: number; results: any[]; next: any; previous: any } = await loadData(apiUrl)

	// const data = result.results

	if (!data) throw error(404)
	console.log(data)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		deleteCustomer(id, currentApi)
	}
}
