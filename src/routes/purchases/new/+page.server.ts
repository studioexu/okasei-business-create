import { debounce } from '@/libs/utils.js'
import { purchase, purchases } from '@/stores/purchases.js'

export const actions = {
	create: debounce(async ({ request }) => {
		const data = await request.formData()
		console.log(data)

		const initialStateString = data.get('initialState')
		console.log(initialStateString)

		let initialState = JSON.parse(initialStateString)
		console.log(initialState)

		// const allPurchases = $purchases

		// let customer = customers.find(customer => customer.id === currentCustomerId)
		// initialState.customerName = customer?.custName
		// purchases.set([...purchases, initialState])
		// let newPurchase = formatCustomer('create', initialState)

		// createCustomer(newCustomer, currentApi)

		// const initialStateString = data.get('initialState')
		// let initialState: CustomerEntries = JSON.parse(initialStateString)
		// let newCustomer: CustomerNewApi = formatCustomer('create', initialState)
	}, 200)
}
