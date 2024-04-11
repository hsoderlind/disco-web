import { Model } from "../../lib/model/Model";
import { ProductImageType } from "./types";
import { File } from "../file/File";

export class ProductImage extends Model<ProductImageType, 'id'> {
	constructor(data: Partial<ProductImageType>, shopId: number) {
		if (typeof data.meta !== 'undefined' && !(data.meta instanceof File)) {
			data.meta = new File(data.meta, shopId);
		}

		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
