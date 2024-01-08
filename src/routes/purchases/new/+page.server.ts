import type { Purchase } from '@/libs/purchaseTypes.js'
import { debounce } from '@/libs/utils.js'
import { purchases } from '@/stores/purchases.js'
import type { InitialStatePurchase } from './+page.svelte'
import type { Status } from '@/libs/negotiationTypes'

export const actions = {
	create: debounce(async ({ request }) => {
		const data = await request.formData()

		const initialStateString = data.get('initialState')

		let initialState = JSON.parse(initialStateString)

		// const allPurchases = $purchases

		// let customer = customers.find(customer => customer.id === currentCustomerId)
		// initialState.customerName = customer?.custName
		// purchases.set([...purchases, initialState])
		// let newPurchase = formatCustomer('create', initialState)

		// createCustomer(newCustomer, currentApi)

		// const initialStateString = data.get('initialState')
		// let initialState: CustomerEntries = JSON.parse(initialStateString)
		// let newCustomer: CustomerNewApi = formatCustomer('create', initialState)
		// try {
	}, 200)
}
