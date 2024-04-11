import { Collection } from "../../lib/model/Collection";
import { ProductImage } from "./ProductImage";
import { ProductImageType } from "./types";

export class ProductImageCollection extends Collection<ProductImageType, 'id', ProductImage> {
	static readonly BASE_URI = '/api/product-image';

	constructor(items: ProductImage[], shopId: number) {
		super(items);
		ProductImageCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
