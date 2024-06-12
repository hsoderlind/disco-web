import { Model } from "../../lib/model/Model";
import { ShippingMethodType } from "./types";

export class ShippingMethod extends Model<ShippingMethodType, 'name'> {
	constructor(data: Partial<ShippingMethodType>, shopId: number) {
		super('name', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<ShippingMethodType>, shopId: number) {
		const instance = new ShippingMethod(data, shopId);

		return instance;
	}

	static async read(name: string, shopId: number) {
		const instance = new ShippingMethod({}, shopId);
		const endpoint = instance.getEndpoint(this.ACTION_READ);

		const response = await instance.httpClient.get<ShippingMethodType>(`${endpoint}/${name}`);

		return this.make(response.data, shopId);
	}

	create(): Promise<this> {
		throw 'Not implemented';
	}

	delete(): Promise<boolean> {
		throw 'Not implemented';
	}
}
