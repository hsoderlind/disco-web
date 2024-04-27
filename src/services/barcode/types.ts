import { BarcodeType as BarcodeTypeClass } from './../barcode-type/BarcodeType';
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const barcodeSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	value: vsb.string().nonempty(),
	barcode_type_id: vsb.number().nonnegative()
});

export type BarcodeSchema = vsbInfer<typeof barcodeSchema>;

export type BarcodeType = BarcodeSchema & {
	barcode_type: BarcodeTypeClass
}
