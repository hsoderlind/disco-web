import { Model } from "../../lib/model/Model";
import { BarcodeTypeType } from "./types";

export class BarcodeType extends Model<BarcodeTypeType, 'id'> {
	public static readonly GET_BARCODE_TYPE_URI = '/api/barcode-type';

	constructor(data: Partial<BarcodeTypeType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
