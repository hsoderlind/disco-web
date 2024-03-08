import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const taxSchema = vsb.object({
	name: vsb.string().nonempty(),
	value: vsb.number().min(0),
	priority: vsb.number().min(0),
	active: vsb.boolean().default(true)
});

export type TaxSchemaType = vsbInfer<typeof taxSchema>;

export type TaxType = {
	id: number;
	name: string;
	value: number;
	priority: number;
	active: boolean;
}
