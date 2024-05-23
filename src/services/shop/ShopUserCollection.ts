import { Collection } from "../../lib/model/Collection";
import { ShopUser } from "./ShopUser";
import { ShopUserType } from "./types";

export class ShopUserCollection extends Collection<ShopUserType, 'id', ShopUser> {
	static readonly ENDPOINT = '/api/shop/user';

	constructor(items: ShopUser[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ShopUserType[]>(this.ENDPOINT);
		const models = response.data.map((item) => ShopUser.make(item, shopId));
		
		return new ShopUserCollection(models);
	}
}
