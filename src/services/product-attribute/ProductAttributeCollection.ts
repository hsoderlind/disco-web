import { Collection } from "../../lib/model/Collection";
import { ProductAttribute } from "./ProductAttribute";
import { ProductAttributeType } from "./types";

export class ProductAttributeCollection extends Collection<ProductAttributeType, 'id', ProductAttribute> {
	constructor(items: ProductAttribute[], shopId: number) {
		super(items);
		ProductAttributeCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
