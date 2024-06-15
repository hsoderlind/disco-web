import { Model } from "../../lib/model/Model";
import { OrderStatusActionSchema } from "./types";

export class OrderStatusAction extends Model<OrderStatusActionSchema, 'action'> {
	constructor(data: Partial<OrderStatusActionSchema>) {
		super('action', data);
	}

	static make(data: Partial<OrderStatusActionSchema>) {
		const instance = new OrderStatusAction(data);

		return instance;
	}
}
