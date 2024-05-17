import { Collection } from "../../lib/model/Collection";
import { CreditBalance } from "./CreditBalance";
import { CreditBalanceType } from "./types";

export class CreditBalanceCollection extends Collection<CreditBalanceType, 'id', CreditBalance> {
	static readonly ENDPOINT = '/api/credit-balance';

	constructor(items: CreditBalance[], shopId: number) {
		super(items);
		CreditBalanceCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async getHistory(customerId: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<CreditBalanceType[]>(`${this.ENDPOINT}/customer/${customerId}/history`);

		if (response.data) {
			const models = response.data.map(item => CreditBalance.make(item, shopId));
			return new CreditBalanceCollection(models, shopId);
		}
	}
}
