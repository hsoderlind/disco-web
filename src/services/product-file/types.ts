import { FileType, fileSchema } from "../file/types";
import { File } from "../file/File";
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const productFileSchema = vsb.object({
	id: vsb.any(),
	sort_order: vsb.number().min(0),
	meta: fileSchema
});

export type ProductFileSchemaType = vsbInfer<typeof productFileSchema>;

export type ProductFileType = {
	id: number
	sort_order: number;
	meta: FileType | File;
}
