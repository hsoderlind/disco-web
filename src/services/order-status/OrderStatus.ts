import { Model } from "../../lib/model/Model";
import { OrderStatusAction } from "./OrderStatusAction";
import { OrderStatusActionCollection } from "./OrderStatusActionCollection";
import { OrderStatusSchema } from "./types";

export class OrderStatus extends Model<OrderStatusSchema, 'id'> {
	constructor(data: Partial<OrderStatusSchema>, public readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	actions(): OrderStatusActionCollection {
		if (!this.hasRelation('actions')) {
			const collection = new OrderStatusActionCollection(this.get<OrderStatusSchema['actions']>('actions').map(action => OrderStatusAction.make(action)));
			return this.hasManyRelation(collection, 'actions');
		}

		return this.getHasManyRelation('actions');
	}

	static make(data: Partial<OrderStatusSchema>, shopId: number) {
		const instance = new OrderStatus(data, shopId);

		instance.actions();

		return instance;
	}
}
