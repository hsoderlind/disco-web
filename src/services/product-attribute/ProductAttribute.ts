import { Model } from "../../lib/model/Model";
import { ProductAttributeType } from "./types";

export class ProductAttribute extends Model<ProductAttributeType, 'id'> {
	constructor(data: Partial<ProductAttributeType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
