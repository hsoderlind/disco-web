import { Collection } from "../../lib/model/Collection";
import { Tax } from "./Tax";
import { TaxType } from "./types";

export class TaxCollection extends Collection<TaxType, 'id', Tax> {
	static readonly GET_TAXES_URI = '/api/tax';

	constructor(protected readonly items: Tax[], shopId: number) {
		super(items);
		TaxCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async fetchAll(shopId: number, withInactive = false) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<TaxType[]>(`${this.GET_TAXES_URI}${withInactive === true ? '?withInactive=true' : ''}`);

		if (response.data) {
			const taxes = response.data.map((taxData) => new Tax(taxData, shopId));
			return new TaxCollection(taxes, shopId);
		}

		return new TaxCollection([], shopId);
	}
}
