import { Collection } from "../../lib/model/Collection";
import { ShippingMethod } from "./ShippingMethod";
import { ShippingMethodType } from "./types";

export class ShippingMethodCollection extends Collection<ShippingMethodType, 'name', ShippingMethod> {
	static readonly ENDPOINT = '/api/shipping-method';

	constructor(items: ShippingMethod[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ShippingMethodType[]>(this.ENDPOINT);

		return new ShippingMethodCollection(response.data.map((item) => ShippingMethod.make(item, shopId)));
	}
}
