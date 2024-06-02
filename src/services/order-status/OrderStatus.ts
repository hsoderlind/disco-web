import { Model } from "../../lib/model/Model";
import { OrderStatusSchema } from "./types";

export class OrderStatus extends Model<OrderStatusSchema, 'id'> {
	constructor(data: Partial<OrderStatusSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<OrderStatusSchema>, shopId: number) {
		const instance = new OrderStatus(data, shopId);

		return instance;
	}
}
