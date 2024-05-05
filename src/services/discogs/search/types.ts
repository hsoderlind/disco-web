import app from "../../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../../lib/validation/validation-schema-builder";
import { communitySchema, userData } from "../types";

const vsb = app.getValidationSchemaBuilder();

export const searchSchema = vsb.object({
	query: vsb.string().optional(),
	type: vsb.enum(['release', 'master', 'artist', 'label']).optional(),
	title: vsb.string().optional(),
	release_title: vsb.string().optional(),
	credit: vsb.string().optional(),
	artist: vsb.string().optional(),
	anv: vsb.string().optional(),
	label: vsb.string().optional(),
	genre: vsb.string().optional(),
	style: vsb.string().optional(),
	country: vsb.string().optional(),
	year: vsb.string().optional(),
	format: vsb.string().optional(),
	catno: vsb.string().optional(),
	barcode: vsb.string().optional(),
	track: vsb.string().optional(),
	submitter: vsb.string().optional(),
	contributor: vsb.string().optional(),
	page: vsb.number().nonnegative().optional(),
	per_page: vsb.number().nonnegative().optional()
});

export const searchResultSchema = vsb.object({
	cover_image: vsb.string().optional(),
	style: vsb.array(vsb.string()).optional(),
	thumb: vsb.string().optional(),
	title: vsb.string().optional(),
	country: vsb.string().optional(),
	format: vsb.array(vsb.string()).optional(),
	uri: vsb.string().optional(),
	community: communitySchema,
	label: vsb.array(vsb.string()).optional(),
	catno: vsb.string().optional(),
	year: vsb.string().optional(),
	genre: vsb.array(vsb.string()).optional(),
	resource_url: vsb.string().optional(),
	type: vsb.string().optional(),
	id: vsb.number().optional(),
	user_data: userData
})

export type SearchSchema = vsbInfer<typeof searchSchema>;
export type SearchResultSchema = vsbInfer<typeof searchResultSchema>;
