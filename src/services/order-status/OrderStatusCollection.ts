import { Collection } from "../../lib/model/Collection";
import { OrderStatus } from "./OrderStatus";
import { OrderStatusSchema } from "./types";

export class OrderStatusCollection extends Collection<OrderStatusSchema, 'id', OrderStatus> {
	static readonly ENDPOINT = '/api/order-status';

	constructor(items: OrderStatus[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<OrderStatusSchema[]>(this.ENDPOINT);

		return new OrderStatusCollection(response.data.map((item) => OrderStatus.make(item, shopId)));
	}
}
