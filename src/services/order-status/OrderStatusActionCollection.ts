import { Collection } from "../../lib/model/Collection";
import { OrderStatusAction } from "./OrderStatusAction";
import { OrderStatusActionSchema } from "./types";

export class OrderStatusActionCollection extends Collection<OrderStatusActionSchema, 'action', OrderStatusAction> {
	constructor(items: OrderStatusAction[]) {
		super(items);
	}
}
