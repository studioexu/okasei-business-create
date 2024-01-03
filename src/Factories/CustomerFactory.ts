import type { CustomerApi, customerImagesBackend } from '@/models/CustomerApi'
import { Customer, CustomerImage } from '@/models/Customer'

export class CustomerFactory {
	[x: string]: any
	constructor(data: CustomerApi, type: string) {
		if (type === 'APIv1') {
			return new Customer(data)
		}
	}
}

export class CustomerImageFactory {
	[x: string]: any
	constructor(data: customerImagesBackend, type: string) {
		if (type === 'APIv1') {
			return new CustomerImage(data)
		}
	}
}
