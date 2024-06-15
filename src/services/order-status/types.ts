import app from "../../lib/application-builder/ApplicationBuilder";
import { id, sortOrder, vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const orderStatusActionSchema = vsb.object({
	action: vsb.string(),
	sort_order: vsb.number().int()
});

export const orderStatusSchema = vsb.object({
	id: id.optional(),
	name: vsb.string(),
	sort_order: sortOrder,
	is_default: vsb.boolean(),
	actions: vsb.array(orderStatusActionSchema)
});

export const actionRepositorySchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	description: vsb.string()
});

export type OrderStatusSchema = vsbInfer<typeof orderStatusSchema>;

export type ActionRepositorySchema = vsbInfer<typeof actionRepositorySchema>;

export type OrderStatusActionSchema = vsbInfer<typeof orderStatusActionSchema>;
