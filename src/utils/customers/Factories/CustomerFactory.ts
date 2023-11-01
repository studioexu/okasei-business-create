import { Customer } from '../models/Customer'
import { CustomerBis } from '../models/CustomerBis'

export class CustomerFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'customer') {
			return new Customer(data)
		}
		if (type === 'jsonServerOnline') {
			return new CustomerBis(data)
		}
	}
}
