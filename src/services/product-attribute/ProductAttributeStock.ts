import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ProductAttributeStockType } from "./types";

export class ProductAttributeStock extends Model<ProductAttributeStockType, 'id'> {
	constructor(data: Partial<ProductAttributeStockType>, protected readonly shopId: number) {
		data.available_at = dayjs(data.available_at);
		
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': this.shopId})
	}
}
