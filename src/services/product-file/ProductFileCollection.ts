import { Collection } from "../../lib/model/Collection";
import { ProductFile } from "./ProductFile";
import { ProductFileType } from "./types";

export class ProductFileCollection extends Collection<ProductFileType, 'id', ProductFile> {
	static readonly BASE_URI = '/api/product-file';

	constructor(items: ProductFile[], shopId: number) {
		super(items);
		ProductFileCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
