import { Collection } from "../../lib/model/Collection";
import { ShippingModule } from "./ShippingModule";
import { ShippingModuleSchema } from "./types";

export class ShippingModuleCollection extends Collection<ShippingModuleSchema, 'name', ShippingModule> {
	static readonly ENDPOINT = '/api/shipping-module';

	constructor(items: ShippingModule[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ShippingModuleSchema[]>(this.ENDPOINT);

		return new ShippingModuleCollection(response.data.map((item) => ShippingModule.make(item, shopId)));
	}
}
