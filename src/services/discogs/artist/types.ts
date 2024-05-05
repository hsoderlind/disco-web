import app from "../../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../../lib/validation/validation-schema-builder";
import { imageSchema } from "../types";

const vsb = app.getValidationSchemaBuilder();

export const memberSchema = vsb.object({
	active: vsb.boolean().optional(),
	id: vsb.number().nonnegative(),
	name: vsb.string().optional(),
	resource_url: vsb.string().optional()
});

export const getArtistSchema = vsb.object({
	artist_id: vsb.number().nonnegative()
});

export const artistSchema = vsb.object({
	id: vsb.number().nonnegative(),
	namevariations: vsb.string().optional(),
	profile: vsb.string().optional(),
	releases_url: vsb.string().optional(),
	resource_url: vsb.string().optional(),
	uri: vsb.string().optional(),
	urls: vsb.array(vsb.string()).optional(),
	data_quality: vsb.string().optional(),
	images: vsb.array(imageSchema).optional(),
	members: vsb.array(memberSchema).optional(),
});

export const getReleasesSchema = vsb.object({
	artist_id: vsb.number().nonnegative(),
	sort: vsb.enum(['year', 'title', 'format']).optional(),
	sort_order: vsb.enum(['asc', 'desc']).optional(),
	page: vsb.number().nonnegative().optional(),
	per_page: vsb.number().nonnegative().optional()
});

export const releaseSchema = vsb.object({
	artist: vsb.string(),
	id: vsb.number().nonnegative(),
	main_release: vsb.number().nonnegative().optional(),
	resource_url: vsb.string().optional(),
	role: vsb.string().optional(),
	thumb: vsb.string(),
	title: vsb.string(),
	type: vsb.string().optional(),
	year: vsb.number().nonnegative().optional()
});

export type GetArtistSchema = vsbInfer<typeof getArtistSchema>;
export type MemberSchema = vsbInfer<typeof memberSchema>;
export type ArtistSchema = vsbInfer<typeof artistSchema>;

export type GetReleaseSchema = vsbInfer<typeof getReleasesSchema>;
export type ReleaseSchema = vsbInfer<typeof releaseSchema>;
