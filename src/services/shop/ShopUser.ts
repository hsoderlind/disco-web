import { Model } from "../../lib/model/Model";
import { ShopUserType } from "./types";

export class ShopUser extends Model<ShopUserType, 'id'> {
	constructor(data: Partial<ShopUserType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<ShopUserType>, shopId: number) {
		const instance = new ShopUser(data, shopId);

		return instance;
	}
}
