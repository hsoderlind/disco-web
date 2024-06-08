import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ProductStockType } from "./types";

export class ProductStock extends Model<ProductStockType, 'id'> {
	constructor(data: Partial<ProductStockType>, shopId: number) {		
		super('id', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	inStock() {
		return this.get<number>('available_quantity') > 0;
	}

	static make(data: Partial<ProductStockType>, shopId: number) {
		if (data && data.available_at !== null) {
			data.available_at = dayjs(data.available_at);
		}

		const instance = new ProductStock(data, shopId);

		return instance;
	}
}
