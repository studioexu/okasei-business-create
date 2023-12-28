import { error } from '@sveltejs/kit'
import { loadCustomerData, loadCustomerImages, reactivateCustomer } from '@/libs/actions.js'
import { currentApi, currentKey } from '@/data/api.js'

import type { CustomerNewApi } from '@/models/BackendCustomer.js'

export const load = async ({ params }) => {
	const data: CustomerNewApi[] = await loadCustomerData(currentApi)
	const images = await loadCustomerImages(currentApi, params.id)

	const customer: CustomerNewApi | undefined = data.find(
		(customer: CustomerNewApi) => customer.id?.toString() === params.id.toString()
	)

	if (!customer) throw error(404)

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
