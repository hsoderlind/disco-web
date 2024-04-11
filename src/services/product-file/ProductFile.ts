import { Model } from "../../lib/model/Model";
import { File } from "../file/File";
import { ProductFileType } from "./types";

export class ProductFile extends Model<ProductFileType, 'id'> {
	constructor(data: Partial<ProductFileType>, shopId: number) {
		if (typeof data.meta !== 'undefined' && !(data.meta instanceof File)) {
			data.meta = new File(data.meta, shopId);
		}
		
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
