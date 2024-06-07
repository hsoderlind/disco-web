import { Model } from "../../lib/model/Model";
import { CreateOrderSchema } from "./types";

export class OrderForm extends Model<CreateOrderSchema, 'id'> {
	constructor(data: Partial<CreateOrderSchema>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	getBaseEndpoint(): string {
		return '/api/order';
	}

	static make(data: Partial<CreateOrderSchema>, shopId: number) {
		const instance = new OrderForm(data, shopId);

		return instance;
	}
}
