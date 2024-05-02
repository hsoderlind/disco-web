import { vsbInfer } from './../../lib/validation/validation-schema-builder';
import app from "../../lib/application-builder/ApplicationBuilder"

const vsb = app.getValidationSchemaBuilder();

export const imageSchema = vsb.object({
	height: vsb.number().nonnegative().optional(),
	resource_url: vsb.string().url().optional(),
	type: vsb.string().optional(),
	uri: vsb.string().url().optional(),
	uri150: vsb.string().url().optional(),
	width: vsb.number().nonnegative().optional()
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

export type ImageSchema = vsbInfer<typeof imageSchema>;
export type PaginationSchema = vsbInfer<typeof paginationSchema>;
export type CommunitySchema = vsbInfer<typeof communitySchema>;
export type UserData = vsbInfer<typeof userData>;

export type Pagination = PaginationSchema;

export type PaginatedResponse<Schema extends Record<string, any>, ResultKey extends string> = {
	pagination: Pagination,
} & Record<ResultKey, Schema[]>
