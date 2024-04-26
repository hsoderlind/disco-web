import { ProductType } from './types';
import { Model } from "../../lib/model/Model";
import { ProductStock } from '../product-stock/ProductStock';

export class Product extends Model<ProductType, 'id'> {
	static readonly GET_PRODUCT_URI = '/api/product';

	constructor(data: Partial<ProductType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	stock() {
		return this.relation(ProductStock, 'stock', this.shopId);
	}
}
