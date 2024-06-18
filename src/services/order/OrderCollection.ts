import { Collection } from "../../lib/model/Collection";
import { Order } from "./Order";
import { OrderType } from "./types";

export class OrderCollection extends Collection<OrderType, 'id', Order> {
	static readonly ENDPOINT = 'api/order';

	constructor(items: Order[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<OrderType[]>(this.ENDPOINT);

		return new OrderCollection(response.data.map(item => Order.make(item, shopId)));
	}
}
