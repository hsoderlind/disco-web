import { Model } from "../../lib/model/Model";
import { ProductAttributeType } from "./types";

export class ProductAttribute extends Model<ProductAttributeType, 'id'> {
	constructor(data: Partial<ProductAttributeType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	static make(data: Partial<ProductAttributeType>, shopId: number): ProductAttribute {
		const productAttribute = new ProductAttribute(data, shopId);
		
		return productAttribute;
	}
}
