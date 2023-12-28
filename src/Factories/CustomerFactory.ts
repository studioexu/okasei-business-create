import type { CustomerNewApi, customerImagesBackend } from '@/models/BackendCustomer'
import { Customer, CustomerImage } from '@/models/Customer'

export class CustomerFactory {
	[x: string]: any
	constructor(data: CustomerNewApi, type: string) {
		if (type === 'newApi') {
			return new Customer(data)
		}
	}
}

export class CustomerImageFactory {
	[x: string]: any
	constructor(data: customerImagesBackend, type: string) {
		if (type === 'newApi') {
			return new CustomerImage(data)
		}
	}
}
