import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { Prettify } from "../../types/common";

const vsb = app.getValidationSchemaBuilder();

export const productStockSchema = vsb.object({
	sku: vsb.string().optional(),
	initial_quantity: vsb.number(),
	min_order_quantity: vsb.number(),
	out_of_stock_message: vsb.string().max(255).optional(),
	allow_order_out_of_stock: vsb.boolean(),
	send_email_out_of_stock: vsb.boolean(),
	in_stock_message: vsb.string().max(255).optional(),
});

export type ProductStockSchema = vsbInfer<typeof productStockSchema>;

export type ProductStockType = Prettify<{
	id: number;
} & ProductStockSchema>
