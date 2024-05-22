import { Model } from "../../lib/model/Model";
import { CompanyType } from "./types";

export class Company extends Model<CompanyType, 'id'> {
	constructor(data: Partial<CompanyType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<CompanyType>, shopId: number) {
		const instance = new Company(data, shopId);

		return instance;
	}

	static async find(id: number, shopId: number) {
		const instance = new Company({}, shopId);
		const endpoint = instance.getEndpoint('read');

		const response = await instance.getHttpClient().get<CompanyType>(`${endpoint}/${id}`);

		instance.fill(response.data);

		return instance;
	}

	static async forShop(shopId: number) {
		const instance = new Company({}, shopId);
		const endpoint = instance.getEndpoint('read');

		const response = await instance.getHttpClient().get<CompanyType>(endpoint);

		instance.fill(response.data);

		return instance;
	}
}
