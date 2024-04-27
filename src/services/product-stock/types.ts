import app from "../../lib/application-builder/ApplicationBuilder";
import { isDayJs, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { Prettify } from "../../types/common";

const vsb = app.getValidationSchemaBuilder();

export const productStockSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	sku: vsb.string().optional(),
	initial_quantity: vsb.number(),
	min_order_quantity: vsb.number(),
	out_of_stock_message: vsb.string().max(255).optional(),
	allow_order_out_of_stock: vsb.boolean(),
	send_email_out_of_stock: vsb.boolean(),
	in_stock_message: vsb.string().max(255).optional(),
	available_at: vsb.date().or(isDayJs).nullable().optional(),
});

export type ProductStockSchema = vsbInfer<typeof productStockSchema>;

export type ProductStockType = Prettify<{
	disposable_quantity: number;
	approx_disposable_quantity: number;
} & ProductStockSchema>
