import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const shippingModuleSchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	description: vsb.string().nullable(),
	admin_component: vsb.string(),
	configuration: vsb.array(vsb.any()),
	installed: vsb.boolean(),
	published_at: vsb.string(),
	updated_at: vsb.string().nullable().optional(),
	version: vsb.string(),
	update_available: vsb. number().int().min(-1).max(1),
});

export type ShippingModuleSchema = vsbInfer<typeof shippingModuleSchema>;
