import { Collection } from "../../lib/model/Collection";
import { OrderTotalRepository } from "./OrderTotalRepository";
import { OrderTotalRepositorySchema } from "./types";

export class OrderTotalRepositoryCollection extends Collection<OrderTotalRepositorySchema, 'name', OrderTotalRepository> {
	static readonly ENDPOINT = '/api/order-total-repository';

	constructor(items: OrderTotalRepository[]) {
		super(items);
	}

	static createFromResponse(data: OrderTotalRepositorySchema[], shopId: number) {
		const models = data.map(item => OrderTotalRepository.make(item, shopId));

		return new OrderTotalRepositoryCollection(models);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<OrderTotalRepositorySchema[]>(this.ENDPOINT);

		return this.createFromResponse(response.data, shopId);
	}
}
