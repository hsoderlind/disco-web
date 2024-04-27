import { Model } from "../../lib/model/Model";
import { ProductAttributeStock } from "./ProductAttributeStock";
import { ProductAttributeType, ProductAttributeStockType } from "./types";

export class ProductAttribute extends Model<ProductAttributeType, 'id'> {
	constructor(data: Partial<ProductAttributeType>, protected readonly shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	stock(): ProductAttributeStock {
		if (!this.hasRelation('stock')) {
			return this.hasOneRelation(new ProductAttributeStock(this.get<ProductAttributeStockType>('stock'), this.shopId), 'stock');
		}

		return this.getHasOneRelation<ProductAttributeStock>('stock');
	}

	static make(data: Partial<ProductAttributeType>, shopId: number): ProductAttribute {
		const productAttribute = new ProductAttribute(data, shopId);
		
		// Init all relationships
		productAttribute.stock();
		
		return productAttribute;
	}
}
