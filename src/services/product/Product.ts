import { ProductType } from './types';
import { Model } from "../../lib/model/Model";

export class Product extends Model<ProductType, 'id'> {
	static readonly GET_PRODUCT_URI = '/api/product';

	constructor(data: Partial<ProductType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
