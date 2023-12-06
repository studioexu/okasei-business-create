import { error } from '@sveltejs/kit'
import { loadData, deleteCustomer, login } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'

export const load = async () => {
	// let data: any[]

	const keyResponse = await login(currentApi)
	// 	async () => (data = await loadData(currentApi, currentKey))
	// )

	const data: any[] = await login(currentApi).then(async key => await loadData(currentApi, key))

	console.log(data)

	// if (keyResponse) currentKey = keyResponse
	// const data = currentKey
	// if (!data) throw error(404)

	return { data, keyResponse }
}

export const actions = {
	delete: async ({ request }) => {
		console.log('please delete')

		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')
		console.log(data)

		deleteCustomer(id, currentApi)
	}
}
