import { Model } from "../../lib/model/Model";
import { TaxType } from "./types";

export class Tax extends Model<TaxType, 'id'> {
	static readonly GET_TAX_URI = '/api/tax';

	constructor(data: Partial<TaxType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async getById(id: number, shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		
		const response = await this.httpClient.get<TaxType>(`${this.GET_TAX_URI}/${id}`);

		return new Tax(response?.data, shopId);
	}
}
