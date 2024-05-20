import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { fileSchema } from "../file/types";

const vsb = app.getValidationSchemaBuilder();

export const logotypeSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	meta: fileSchema
});

export type LogotypeSchema = vsbInfer<typeof logotypeSchema>;
