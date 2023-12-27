import { Negotiation } from '@/models/Negotiation'

export class NegotiationFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'local') {
			return new Negotiation(data)
		}
	}
}
