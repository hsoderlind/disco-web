import { BarcodeCollection } from "../barcode/BarcodeCollection";
import { BarcodeType } from "../barcode/types";

export type BarcodeTypeType = {
	id: number;
	label: string;
	active: boolean;
	barcodes?: BarcodeCollection;
}

export type BarcodeTypeResponseType = Omit<BarcodeTypeType, 'barcodes'> & {
	barcodes?: BarcodeType[];
}
