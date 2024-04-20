import { Model } from "../../lib/model/Model";
import { ProductStockType } from "./types";

export class ProductStock extends Model<ProductStockType, 'id'> {
	constructor(data: Partial<ProductStockType>, shopId: number) {
		super('id', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
