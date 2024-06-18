import app from "../../lib/application-builder/ApplicationBuilder";
import { id, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { User } from "../user/types";

const vsb = app.getValidationSchemaBuilder();

export const receiptSchema = vsb.object({
	id,
	receipt_number: vsb.string(),
	cashier_id: id,
});

export type ReceiptSchema = vsbInfer<typeof receiptSchema>;

export type ReceiptType = {
	cashier: User;
} & ReceiptSchema;
