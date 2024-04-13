import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { File } from "../file/File";
import { FileType, fileSchema } from "../file/types";

const vsb = app.getValidationSchemaBuilder();

export const productImageSchema = vsb.object({
	use_as_cover: vsb.boolean().default(false),
	sort_order: vsb.number().min(0),
	meta: fileSchema
})

export type ProductImageSchemaType = vsbInfer<typeof productImageSchema>;

export type ProductImageType = {
	id: number;
	use_as_cover: boolean;
	sort_order: number;
	meta: FileType | File;
}
