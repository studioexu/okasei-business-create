import { error } from '@sveltejs/kit'
import { loadCustomerData, loadCustomerImages, reactivateCustomer } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'

import type { CustomerApi } from '@/models/CustomerApi.js'

export const load = async ({ params }) => {
	const data: CustomerApi[] = await loadCustomerData(currentApi)
	const images = await loadCustomerImages(currentApi, params.id)
	const customer: CustomerApi | undefined = data.find(
		(customer: CustomerApi) => customer.id?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)
	if (!images) throw error(404)

	return {
		customer,
		images
	}
}

export const actions = {
	reactivate: async ({ request }) => {
		const data = await request.formData()
		let id: any = data.get('id') === null ? undefined : data.get('id')

		reactivateCustomer(id, currentApi)
	}
}
