import app from "../../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../../lib/validation/validation-schema-builder";
import { commonArtistSchema } from "../types";

const vsb = app.getValidationSchemaBuilder();

export const addToWantListRequestSchema = vsb.object({
	release_id: vsb.number().int().nonnegative(),
	notes: vsb.string().optional(),
	rating: vsb.number().int().max(5),
});

export const addToWantlistResultSchema = vsb.object({
	id: vsb.number().int().nonnegative(),
	rating: vsb.number().optional(),
	notes: vsb.string(),
	resource_url: vsb.string(),
	basic_information: vsb.object({
		id: vsb.number().int().nonnegative(),
		resource_url: vsb.string(),
		thumb: vsb.string(),
		cover_image: vsb.string(),
		title: vsb.string(),
		year: vsb.number().int(),
		formats: vsb.array(vsb.object({
			qty: vsb.string(),
			descriptions: vsb.string(),
			name: vsb.string()
		})),
		labels: vsb.array(vsb.object({
			name: vsb.string(),
			entity_type: vsb.string(),
			catno: vsb.string(),
			resource_url: vsb.string(),
			id: vsb.number().int().nonnegative(),
			entity_type_name: vsb.string()
		})),
	}),
	artists: vsb.array(commonArtistSchema)
});

export type AddToWantListRequestSchema = vsbInfer<typeof addToWantListRequestSchema>;
export type AddToWantlistResultSchema = vsbInfer<typeof addToWantlistResultSchema>;
