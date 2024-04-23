import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const fileSchema = vsb.object({
	id: vsb.number().nonnegative(),
	filename: vsb.string().nonempty(),
	size: vsb.number().min(0),
	mimetype: vsb.string().nonempty(),
	extension: vsb.string().nonempty(),
	storage_provider: vsb.string().nonempty()
});

export type FileSchemaType = vsbInfer<typeof fileSchema>;

export type FileType = {
	id: number | string;
	filename: string;
	size: number;
	mimetype: string;
	extension: string;
	storage_provider: string;
}
