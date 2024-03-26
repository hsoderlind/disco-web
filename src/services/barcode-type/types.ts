import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { BarcodeCollection } from "../barcode/BarcodeCollection";
import { BarcodeType } from "../barcode/types";

const vsb = app.getValidationSchemaBuilder();

export const barcodeTypeSchema = vsb.object({
	label: vsb.string().nonempty(),
	format: vsb.string().nonempty(),
	sort_order: vsb.number().nonnegative(),
	active: vsb.boolean().default(true)
});

export type BarcodeTypeSchemaType = vsbInfer<typeof barcodeTypeSchema>;

export type BarcodeTypeType = {
	id: number;
	label: string;
	format: string;
	active: boolean;
	barcodes?: BarcodeCollection;
}

export type BarcodeTypeResponseType = Omit<BarcodeTypeType, 'barcodes'> & {
	barcodes?: BarcodeType[];
}
