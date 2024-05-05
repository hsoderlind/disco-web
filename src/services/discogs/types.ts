import { vsbInfer } from './../../lib/validation/validation-schema-builder';
import app from "../../lib/application-builder/ApplicationBuilder"

const vsb = app.getValidationSchemaBuilder();

export const imageSchema = vsb.object({
	height: vsb.number().nonnegative().optional(),
	resource_url: vsb.string().optional(),
	type: vsb.string().optional(),
	uri: vsb.string().optional(),
	uri150: vsb.string().optional(),
	width: vsb.number().nonnegative().optional(),
});

export const paginationSchema = vsb.object({
	per_page: vsb.number().nonnegative(),
	items: vsb.number().nonnegative(),
	page: vsb.number().nonnegative(),
	urls: vsb.object({}),
	pages: vsb.number().nonnegative()
})

export const communitySchema = vsb.object({
	want: vsb.number().optional(),
	have: vsb.number().optional()
})

export const userData = vsb.object({
	in_collection: vsb.boolean().optional(),
	in_wantlist: vsb.boolean().optional()
});

export const videoSchema = vsb.object({
	duration: vsb.number().optional(),
	description: vsb.string().optional(),
	embed: vsb.boolean().optional(),
	uri: vsb.string().optional(),
	title: vsb.string().optional()
});

export const commonArtistSchema = vsb.object({
	join: vsb.string().optional(),
	name: vsb.string().optional(),
	anv: vsb.string().optional(),
	tracks: vsb.string().optional(),
	role: vsb.string().optional(),
	resource_url: vsb.string().optional(),
	id: vsb.number().nonnegative().optional(),
	thumbnail_url: vsb.string().optional(),
});

export const tracksSchema = vsb.object({
	duration: vsb.string().optional(),
	position: vsb.string().optional(),
	type_: vsb.string().optional(),
	title: vsb.string().optional(),
	extraartists: vsb.array(commonArtistSchema).optional(),
	artists: vsb.array(commonArtistSchema).optional(),
});

export const ratingSchema = vsb.object({
	average: vsb.number(),
	count: vsb.number(),
});

export type ImageSchema = vsbInfer<typeof imageSchema>;
export type PaginationSchema = vsbInfer<typeof paginationSchema>;
export type CommunitySchema = vsbInfer<typeof communitySchema>;
export type UserData = vsbInfer<typeof userData>;
export type VideoSchema = vsbInfer<typeof videoSchema>;
export type CommonArtistSchema = vsbInfer<typeof commonArtistSchema>;
export type TrackSchema = vsbInfer<typeof tracksSchema>;
export type RatingSchema = vsbInfer<typeof ratingSchema>;

export type Pagination = PaginationSchema;

export type PaginatedResponse<Schema extends Record<string, any>, ResultKey extends string> = {
	pagination: Pagination,
} & Record<ResultKey, Schema[]>
