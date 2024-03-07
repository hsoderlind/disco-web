import { Collection } from "../../lib/model/Collection";
import { Product } from "./Product";
import { ProductType } from "./types";

export class ProductCollection extends Collection<ProductType, 'id', Product> {
	static readonly GET_PRODUCTS_URI = '/api/product';

	constructor(protected readonly items: Product[], shopId: number) {
		super(items);
		ProductCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static async fetchAll(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<ProductType[]>(this.GET_PRODUCTS_URI);

		if (response.data) {
			const products = response.data.map((productData) => new Product(productData, shopId));
			return new ProductCollection(products, shopId);
		}

		return new ProductCollection([], shopId);
	}
}
