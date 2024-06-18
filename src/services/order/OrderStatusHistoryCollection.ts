import { Collection } from "../../lib/model/Collection";
import { OrderStatusHistory } from "./OrderStatusHistory";
import { OrderStatusHistoryType } from "./types";

export class OrderStatusHistoryCollection extends Collection<OrderStatusHistoryType, 'id', OrderStatusHistory> {
	constructor(items: OrderStatusHistory[]) {
		super(items);
	}
}
