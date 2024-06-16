import { Collection } from "../../lib/model/Collection";
import { ProductStock } from "./ProductStock";
import { ProductStockType } from "./types";

export class ProductStockCollection extends Collection<ProductStockType, 'id', ProductStock> {
	static readonly ENDPOINT = '/api/product-stock';

	constructor(items: ProductStock[]) {
		super(items);
	}

	static async list(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});

		const response = await this.httpClient.get<ProductStockType[]>(this.ENDPOINT);

		return new ProductStockCollection(response.data.map(item => ProductStock.make(item, shopId)));
	}
}
