import app from "../../lib/application-builder/ApplicationBuilder";
import { sortOrder, vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const shippingModuleSchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	description: vsb.string().nullable(),
	admin_component: vsb.string(),
	configuration: vsb.array(vsb.any()).or(vsb.null()).optional(),
	installed: vsb.boolean(),
	published_at: vsb.string(),
	updated_at: vsb.string().nullable().optional(),
	version: vsb.string(),
	update_available: vsb. number().int().min(-1).max(1),
});

export const shippingMethodSchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	fee: vsb.number().int().min(0),
	description: vsb.string().nullable(),
	configuration: vsb.array(vsb.any()).or(vsb.null()).optional(),
	sort_order: sortOrder,
	active: vsb.boolean()
});

export type ShippingModuleSchema = vsbInfer<typeof shippingModuleSchema>;

export type ShippingMethodSchema = vsbInfer<typeof shippingMethodSchema>;

export type ShippingMethodType = {
	id: number;
	component?: string;
	admin_component?: string;
} & ShippingMethodSchema;
