import { vsbInfer } from './../../lib/validation/validation-schema-builder';
import app from "../../lib/application-builder/ApplicationBuilder";

const vsb = app.getValidationSchemaBuilder();

export const accountSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	name: vsb.string(),
	address1: vsb.string().nullable().optional(),
	address2: vsb.string().nullable().optional(),
	zip: vsb.string().max(6).nullable().optional(),
	city: vsb.string().nullable().optional(),
	country: vsb.string().nullable().optional(),
	phone: vsb.string().optional()
});

export type AccountSchema = vsbInfer<typeof accountSchema>;
