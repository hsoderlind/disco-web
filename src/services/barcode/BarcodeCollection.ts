import { Collection } from "../../lib/model/Collection";
import { Barcode } from "./Barcode";
import { BarcodeType } from "./types";

export class BarcodeCollection extends Collection<BarcodeType, 'id', Barcode> {
	public static readonly GET_BARCODES_URI = '/api/barcode';

	constructor(items: Barcode[], protected readonly shopId: number) {
		super(items);
		BarcodeCollection.httpClient.setHeaders({'x-shop-id': this.shopId});
	}
}
