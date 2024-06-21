import { Model } from "../../lib/model/Model";
import { CreateOrderStatusHistorySchema } from "./types";

export class OrderStatusHistoryForm extends Model<CreateOrderStatusHistorySchema, 'order_id'> {
	constructor(order_id: number, data: Partial<Omit<CreateOrderStatusHistorySchema, 'order_id'>>, shopId: number) {
		super('order_id', {...data, order_id});
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	getEndpoint(action: string): string {
		if (action === OrderStatusHistoryForm.ACTION_CREATE) {
			const baseEndpoint = this.getBaseEndpoint();
			return `${baseEndpoint}/${this.getKey()}`;
		}

		return super.getEndpoint(action);
	}

	getBaseEndpoint(): string {
		return `api/order-status-history`;
	}
}
