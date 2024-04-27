import dayjs from "dayjs";
import { Model } from "../../lib/model/Model";
import { ProductSpecialPriceType } from "./types";

export class ProductSpecialPrice extends Model<ProductSpecialPriceType, 'id'> {
	constructor(data: Partial<ProductSpecialPriceType>, shopId: number) {
		if (data.entry_date) {
			data.entry_date = dayjs(data.entry_date);
		}

		if (data.expiration_date) {
			data.expiration_date = dayjs(data.expiration_date);
		}

		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}

	static make(data: Partial<ProductSpecialPriceType>, shopId: number) {
		const specialPrice = new ProductSpecialPrice(data, shopId);

		return specialPrice;
	}
}
