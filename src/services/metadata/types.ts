import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const metadataSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	key: vsb.string(),
	value: vsb.string()
});

export type MetadataSchema = vsbInfer<typeof metadataSchema>;
