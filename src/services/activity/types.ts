import { isDayJs, vsbInfer } from './../../lib/validation/validation-schema-builder';
import app from "../../lib/application-builder/ApplicationBuilder";
import { id } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const activitySchema = vsb.object({
	id,
	causer: vsb.object({
		name: vsb.string()
	}),
	created_at: isDayJs,
	description: vsb.string(),
	event: vsb.string()
});

export type ActivitySchema = vsbInfer<typeof activitySchema>;
