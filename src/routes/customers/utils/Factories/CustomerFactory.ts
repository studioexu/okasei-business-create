import { Customer } from '../models/Customer'
// import type {custo}

export class CustomerFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'customer') {
			return new Customer(data)
		}
	}
}
