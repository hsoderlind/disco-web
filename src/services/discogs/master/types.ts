import app from "../../../lib/application-builder/ApplicationBuilder"
import { vsbInfer } from "../../../lib/validation/validation-schema-builder";
import { commonArtistSchema, imageSchema, tracksSchema, videoSchema } from "../types";

const vsb = app.getValidationSchemaBuilder();

export const masterSchema = vsb.object({
	master_id: vsb.number().int().nonnegative()
});

export const masterResultSchema = vsb.object({
	styles: vsb.array(vsb.string()).optional(),
	genres: vsb.array(vsb.string()).optional(),
	videos: vsb.array(videoSchema).optional(),
	title: vsb.string().optional(),
	main_release: vsb.number().int().optional(),
	main_release_url: vsb.string().url().optional(),
	uri: vsb.string().url().optional(),
	artists:  vsb.array(commonArtistSchema).optional(),
	versions_url: vsb.string().url().optional(),
	year: vsb.number().nonnegative().optional(),
	images: vsb.array(imageSchema),
	resource_url: vsb.string().url().optional(),
	tracklist: vsb.array(tracksSchema).optional(),
	id: vsb.number().nonnegative().optional(),
	num_for_sale: vsb.number().optional(),
	lowest_price: vsb.number().optional(),
	data_quality: vsb.string().optional()
});

export const masterReleaseVersionsSchema = masterSchema.extend({
	page: vsb.number().int().nonnegative().optional(),
	per_page: vsb.number().int().nonnegative().optional(),
	format: vsb.string().optional(),
	label: vsb.string().optional(),
	released: vsb.number().int().optional(),
	country: vsb.string().optional(),
	sort: vsb.enum(['released', 'title', 'format', 'label', 'catno', 'country']).optional(),
	sort_order: vsb.enum(['asc', 'desc'])
});

export const masterReleaseVersionsResultSchema = vsb.object({
	status: vsb.string(),
	stats: vsb.object({
		user: vsb.object({
			in_collection: vsb.number().int(),
			in_wantlist: vsb.number().int()
		}),
		community: vsb.object({
			in_collection: vsb.number().int(),
			in_wantlist: vsb.number().int()
		})
	}),
	thumb: vsb.string().url(),
	format: vsb.string(),
	country: vsb.string(),
	title: vsb.string(),
	label: vsb.string(),
	released: vsb.string(),
	major_formats: vsb.array(vsb.string()),
	catno: vsb.string(),
	resource_url: vsb.string().url(),
	id: vsb.number().int()
});

export type MasterSchema = vsbInfer<typeof masterSchema>;
export type MasterResultSchema = vsbInfer<typeof masterResultSchema>;
export type MasterReleaseVersionsSchema = vsbInfer<typeof masterReleaseVersionsSchema>;
export type MasterReleaseVersionsResultSchema = vsbInfer<typeof masterReleaseVersionsResultSchema>;
