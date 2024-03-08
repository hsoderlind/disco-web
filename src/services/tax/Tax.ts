import { Model } from "../../lib/model/Model";
import { TaxType } from "./types";

export class Tax extends Model<TaxType, 'id'> {
	static readonly GET_TAX_URI = '/api/tax';

	constructor(data: Partial<TaxType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
