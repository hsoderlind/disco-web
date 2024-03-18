import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const categorySchema = vsb.object({
	name: vsb.string().nonempty(),
	parent: vsb.number().min(0),
	sort_order: vsb.number().default(0)
});

export type CategorySchemaType = vsbInfer<typeof categorySchema>;

export type CategoryType = {
	id: number;
	name: string;
	parent: number;
	level: number;
	sort_order: number;
	children_count?: number;
}
