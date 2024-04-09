import { Model } from "../../lib/model/Model";
import { ProductSpecialPriceType } from "./types";

export class ProductSpecialPrice extends Model<ProductSpecialPriceType, 'id'> {
	constructor(data: Partial<ProductSpecialPriceType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
