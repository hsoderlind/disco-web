import { Dayjs } from "dayjs";
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const noteSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	title: vsb.string().optional(),
	content: vsb.string()
});

export type NoteSchema = vsbInfer<typeof noteSchema>;

export type NoteType = {
	created_at: Dayjs;
} & NoteSchema;
