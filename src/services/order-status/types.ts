import app from "../../lib/application-builder/ApplicationBuilder";
import { id, sortOrder, vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const orderStatusSchema = vsb.object({
	id: id.optional(),
	name: vsb.string(),
	sort_order: sortOrder,
	is_default: vsb.boolean(),
});

export type OrderStatusSchema = vsbInfer<typeof orderStatusSchema>;
