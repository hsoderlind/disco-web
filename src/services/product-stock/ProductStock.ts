import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ProductStockType } from "./types";

export class ProductStock extends Model<ProductStockType, 'id'> {
	constructor(data: Partial<ProductStockType>, shopId: number) {
		data.available_at = dayjs(data.available_at);
		
		super('id', data);

		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
