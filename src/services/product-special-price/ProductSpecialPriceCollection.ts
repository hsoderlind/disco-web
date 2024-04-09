import { Collection } from "../../lib/model/Collection";
import { ProductSpecialPrice } from "./ProductSpecialPrice";
import { ProductSpecialPriceType } from "./types";

export class ProductSpecialPriceCollection extends Collection<ProductSpecialPriceType, 'id', ProductSpecialPrice> {
	static readonly BASE_URI = '/api/product-special-price';

	constructor(items: ProductSpecialPrice[], shopId: number) {
		super(items);
		ProductSpecialPriceCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
