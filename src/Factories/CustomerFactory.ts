import { Customer } from '../models/Customer'
import { CustomerAPI } from '../models/CustomerAPI'

export class CustomerFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'customer') {
			return new Customer(data)
		}
		if (type === 'newApi') {
			return new CustomerAPI(data)
		}
	}
}
