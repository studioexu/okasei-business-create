import { CustomerAPI } from '@/models/Customer'

export class CustomerFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'newApi') {
			return new CustomerAPI(data)
		}
	}
}
