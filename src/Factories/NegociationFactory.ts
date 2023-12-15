import { Negociation } from '@/models/Negociation'

export class NegociationFactory {
	[x: string]: any
	constructor(data: Object, type: string) {
		if (type === 'local') {
			return new Negociation(data)
		}
	}
}
