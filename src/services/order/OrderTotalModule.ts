import { Model } from "../../lib/model/Model";
import { OrderTotalModuleSchema } from "./types";

export class OrderTotalModule extends Model<OrderTotalModuleSchema, 'name'> {
	constructor(data: Partial<OrderTotalModuleSchema>, shopId: number) {
		super('name', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	install() {
		return this.create();
	}

	uninstall() {
		return this.delete();
	}

	static make(data: Partial<OrderTotalModuleSchema>, shopId: number) {
		const instance = new OrderTotalModule(data, shopId);

		return instance;
	}
}
