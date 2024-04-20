import { Collection } from "../../lib/model/Collection";
import { Barcode } from "../barcode/Barcode";
import { BarcodeCollection } from "../barcode/BarcodeCollection";
import { BarcodeType } from "./BarcodeType";
import { BarcodeTypeResponseType, BarcodeTypeType } from "./types";

export class BarcodeTypeCollection extends Collection<BarcodeTypeType, 'id', BarcodeType> {
	public static readonly GET_BARCODE_TYPES_URI = '/api/barcode-type';

	constructor(items: BarcodeType[], protected readonly shopId: number) {
		super(items);
		BarcodeTypeCollection.httpClient.setHeaders({'x-shop-id': this.shopId});
	}

	static async fetchAll(shopId: number) {
		this.httpClient.setHeaders({'x-shop-id': shopId});
		const response = await this.httpClient.get<BarcodeTypeResponseType[]>(this.GET_BARCODE_TYPES_URI);

		if (response.data) {
			const items = response.data.map((data) => {
				let barcodes: BarcodeCollection | undefined = undefined;

				if (data.barcodes) {
					const barcodeModels = data.barcodes.map((barcode) => new Barcode(barcode, shopId));
					barcodes = new BarcodeCollection(barcodeModels, shopId);
				}

				const modelData: BarcodeTypeType = {...data, barcodes};
				return new BarcodeType(modelData, shopId);
			}) as BarcodeType[];
			return new BarcodeTypeCollection(items, shopId);
		}

		return new BarcodeTypeCollection([], shopId);
	}
}
