import { Model } from "../../lib/model/Model";
import { OrderTotalRepositorySchema } from "./types";

export class OrderTotalRepository extends Model<OrderTotalRepositorySchema, 'name'> {
	constructor(data: Partial<OrderTotalRepositorySchema>, shopId: number) {
		super('name', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<OrderTotalRepositorySchema>, shopId: number) {
		const instance = new OrderTotalRepository(data, shopId);

		return instance;
	}
}
