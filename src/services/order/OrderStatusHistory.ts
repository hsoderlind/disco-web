import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { OrderStatusHistoryType } from "./types";

export class OrderStatusHistory extends Model<OrderStatusHistoryType, 'id'> {
	constructor(data: Partial<OrderStatusHistoryType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<OrderStatusHistoryType>, shopId: number) {
		if ('created_at' in data) {
			data['created_at'] = dayjs(data['created_at']);
		}

		const instance = new OrderStatusHistory(data, shopId);

		return instance;
	}
}
