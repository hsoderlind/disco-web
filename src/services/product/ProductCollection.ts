import { Collection } from "../../lib/model/Collection";
import { Product } from "./Product";
import { ProductType } from "./types";

export class ProductCollection extends Collection<ProductType, 'id', Product> {
	static readonly GET_PRODUCTS_URI = '/api/product';

	constructor(protected readonly items: Product[]) {
		super(items);
	}

	static async fetchAll() {
		const response = await this.httpClient.get<ProductType[]>(this.GET_PRODUCTS_URI);

		if (response.data) {
			const products = response.data.map((productData) => new Product(productData));
			return new ProductCollection(products);
		}

		return new ProductCollection([]);
	}
}
