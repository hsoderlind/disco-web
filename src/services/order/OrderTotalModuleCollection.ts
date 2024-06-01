import { Collection } from "../../lib/model/Collection";
import { OrderTotalModule } from "./OrderTotalModule";
import { OrderTotalModuleSchema } from "./types";

export class OrderTotalModuleCollection extends Collection<OrderTotalModuleSchema, 'name', OrderTotalModule> {
	static readonly ENDPOINT = '/api/order-total-module';

	constructor(items: OrderTotalModule[]) {
		super(items);
	}

	static createFromResponse(data: OrderTotalModuleSchema[], shopId: number) {
		const items = data.map((item) => OrderTotalModule.make(item, shopId));
		
		return new OrderTotalModuleCollection(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<OrderTotalModuleSchema[]>(this.ENDPOINT);

		return this.createFromResponse(response.data, shopId);
	}
}
