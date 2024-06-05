import { Model } from "../../lib/model/Model";
import { CreateOrderSchema } from "./types";

export class OrderForm extends Model<CreateOrderSchema, 'id'> {
	constructor(data: Partial<CreateOrderSchema>) {
		super('id', data);
	}

	getBaseEndpoint(): string {
		return '/api/order';
	}

	static make(data: Partial<CreateOrderSchema>) {
		const instance = new OrderForm(data);

		return instance;
	}
}
