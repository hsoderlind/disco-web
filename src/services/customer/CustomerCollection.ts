import { Collection } from "../../lib/model/Collection";
import { Customer } from "./Customer";
import { CustomerType } from "./types";

export class CustomerCollection extends Collection<CustomerType, 'id', Customer> {
	static readonly ENDPOINT = '/api/customer';

	constructor(items: Customer[], shopId: number) {
		super(items);
		CustomerCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<CustomerType[]>(this.ENDPOINT);

		if (response.data) {
			const models = response.data.map((data) => Customer.make(data, shopId));
			return new CustomerCollection(models, shopId);
		}
	}
}
