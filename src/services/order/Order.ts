import { Model } from "../../lib/model/Model";
import { OrderSchema } from "./types";

export class Order extends Model<OrderSchema, 'id'> {
	constructor(data: Partial<OrderSchema>, public readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<OrderSchema>, shopId: number) {
		const instance = new Order(data, shopId);

		return instance;
	}
}
