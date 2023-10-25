import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer } from './utils/actions.js'

const localUrl = 'http://localhost:3000/customers/'
const demoUrl = 'https://fake-server-2x0o.onrender.com/customers/'

export const load = async () => {
	const data: any[] = await loadData(demoUrl)
	// const data: any[] = await loadData('https://fake-server-2x0o.onrender.com/api/customers')

	if (!data) throw error(404)

	return { data }
}

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		console.log(id)

		// deleteCustomer(id, 'http://localhost:3000/customers/')
		// deleteCustomer(id, 'https://fake-server-2x0o.onrender.com/api/customers')
		deleteCustomer(id, demoUrl)
	}
}
