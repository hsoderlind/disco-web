import { Model } from "../../lib/model/Model";
import { BarcodeType } from "./types";

export class Barcode extends Model<BarcodeType, 'id'> {
	public static readonly GET_BARCODE_URI = '/api/barcode';

	constructor(data: Partial<BarcodeType>, shopId: number) {
		super('id', data);
		this.httpClient.setHeaders({'x-shop-id': shopId});
	}
}
