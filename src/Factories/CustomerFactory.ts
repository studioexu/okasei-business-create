import type { CustomerNewApi } from '@/models/BackendCustomer'
import { Customer } from '@/models/Customer'

export class CustomerFactory {
	[x: string]: any
	constructor(data: CustomerNewApi, type: string) {
		if (type === 'newApi') {
			return new Customer(data)
		}
	}
}
