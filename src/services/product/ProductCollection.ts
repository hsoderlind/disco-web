import { Collection } from "../../lib/model/Collection";
import { Product } from "./Product";
import { Criteria, ProductType } from "./types";

export class ProductCollection extends Collection<ProductType, 'id', Product> {
	static readonly GET_PRODUCTS_URI = '/api/product';

	constructor(protected readonly items: Product[], shopId: number) {
		super(items);
		ProductCollection.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static createFromResponse(data: ProductType[], shopId: number) {
		return new ProductCollection(data.map((item) => Product.make(item, shopId)), shopId);
	}

	static async fetchAll(shopId: number, category = 0) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<ProductType[]>(`${this.GET_PRODUCTS_URI}?category=${category}`);

		return this.createFromResponse(response.data, shopId);
	}

	static async listAsSummary(shopId: number, criteria?: Criteria) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<ProductType[]>(`${this.GET_PRODUCTS_URI}/summary`, {params: criteria});

		return this.createFromResponse(response.data, shopId);
	}
}
