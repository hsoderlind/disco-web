import { Model } from "../../lib/model/Model";
import { ShopUserType } from "./types";

export class ShopUser extends Model<ShopUserType, 'id'> {
	constructor(data: Partial<ShopUserType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	getEndpoint(action: string): string {
		let endpoint = super.getEndpoint(action);

		if (!this.isCrudAction(action)) {
			endpoint += `/${action}`;
		}

		return endpoint;
	}

	static async transferOwnership(newOwnerId: number, shopId: number) {
		const model = ShopUser.make({}, shopId);
		const endpoint = model.getEndpoint('transfer-ownership');

		const response = await model.getHttpClient().post<ShopUserType>(`${endpoint}/${newOwnerId}`);

		model.fill(response.data);
		
		return model;
	}

	static make(data: Partial<ShopUserType>, shopId: number) {
		const instance = new ShopUser(data, shopId);

		return instance;
	}
}
