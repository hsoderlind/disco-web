import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { Customer } from "../customer/Customer";
import { CustomerType } from "../customer/types";
import { OrderType } from "./types";
import { OrderStatusHistory } from "./OrderStatusHistory";
import { OrderStatusHistoryCollection } from "./OrderStatusHistoryCollection";
import { ActivityLogCollection } from "../activity/ActivityLogCollection";
import { ActivityLog } from "../activity/ActivityLog";

export class Order extends Model<OrderType, 'id'> {
	constructor(data: Partial<OrderType>, public readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	customer(): Customer {
		if (!this.hasRelation('customer')) {
			return this.hasOneRelation(Customer.make(this.get<CustomerType>('customer'), this.shopId), 'customer');
		}

		return this.getHasOneRelation('customer');
	}

	currentStatus(): OrderStatusHistory {
		if (!this.hasRelation('current_status')) {
			return this.hasOneRelation(OrderStatusHistory.make(this.get<OrderType['current_status']>('current_status'), this.shopId), 'current_status');
		}

		return this.getHasOneRelation('current_status');
	}

	statusHistory(): OrderStatusHistoryCollection {
		if (!this.hasRelation('status_history')) {
			const collection = this.get<OrderType['status_history']>('status_history').map(item => OrderStatusHistory.make(item, this.shopId));
			return this.hasManyRelation(new OrderStatusHistoryCollection(collection), 'status_history');
		}

		return this.getHasManyRelation('status_history');
	}

	activities(): ActivityLogCollection {
		if (!this.hasRelation('activities')) {
			const collection = this.get<OrderType['activities']>('activities').map(ActivityLog.make);
			return this.hasManyRelation(new ActivityLogCollection(collection), 'activities');
		}

		return this.getHasManyRelation('activities');
	}

	static make(data: Partial<OrderType>, shopId: number) {
		if (data.created_at) {
			data.created_at = dayjs(data.created_at);
		}
		
		const instance = new Order(data, shopId);

		return instance;
	}
}
