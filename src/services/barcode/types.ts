import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const barcodeSchema = vsb.object({
	value: vsb.string().nonempty(),
	barcode_type: vsb.number().nonnegative()
});

export type BarcodeSchema = vsbInfer<typeof barcodeSchema>;
