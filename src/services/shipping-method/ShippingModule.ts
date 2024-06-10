import { Model } from "../../lib/model/Model";
import { ShippingModuleSchema } from "./types";

export class ShippingModule extends Model<ShippingModuleSchema, 'name'> {
	constructor(data: Partial<ShippingModuleSchema>, shopId: number) {
		super('name', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	install() {
		return this.create();
	}

	uninstall() {
		return this.delete();
	}

	static make(data: Partial<ShippingModuleSchema>, shopId: number) {
		const instance = new ShippingModule(data, shopId);

		return instance;
	}
}
