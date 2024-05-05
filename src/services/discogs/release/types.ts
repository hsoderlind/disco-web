import { vsbInfer } from './../../../lib/validation/validation-schema-builder';
import app from "../../../lib/application-builder/ApplicationBuilder";
import { commonArtistSchema, commonLabelSchema, companySchema, currAbbrSchema, formatSchema, idSchema, identifierSchema, imageSchema, ratingSchema, tracksSchema, videoSchema } from '../types';

const vsb = app.getValidationSchemaBuilder();

export const releaseStatsSchema = vsb.object({
	release_id: vsb.number().int().nonnegative()
});

export const releaseStatsResultSchema = vsb.object({
	id: vsb.number().int().nonnegative(),
	num_have: vsb.number(),
	num_want: vsb.number(),
	rating: ratingSchema
});

export const releaseRequestSchema = vsb.object({
	release_id: vsb.number().int(),
	curr_abbr: currAbbrSchema
});

export const releaseResponseSchema = vsb.object({
	title: vsb.string(),
	id: idSchema,
	artists: vsb.array(commonArtistSchema),
	data_quality: vsb.string(),
	thumb: vsb.string(),
	community: vsb.object({
		contributors: vsb.array(vsb.object({
			resource_url: vsb.string(),
			username: vsb.string()
		})),
		data_quality: vsb.string(),
		have: vsb.number().int(),
		rating: ratingSchema,
		status: vsb.string(),
		submitter: vsb.object({
			resource_url: vsb.string(),
			username: vsb.string()
		}),
		want: vsb.number().int(),
	}),
	companies: vsb.array(companySchema),
	country: vsb.string(),
	date_added: vsb.string(),
	date_changed: vsb.string(),
	estimated_weight: vsb.number().int(),
	extraartists: vsb.array(commonArtistSchema),
	format_quantity: vsb.number().int(),
	formats: vsb.array(formatSchema),
	genres: vsb.array(vsb.string()),
	identifiers: vsb.array(identifierSchema),
	images: vsb.array(imageSchema),
	labels: vsb.array(commonLabelSchema),
	lowest_price: vsb.number(),
	master_id: idSchema,
	master_url: vsb.string(),
	notes: vsb.string(),
	num_for_sale: vsb.number().int(),
	released: vsb.string(),
	released_formatted: vsb.string(),
	resource_url: vsb.string(),
	series: vsb.array(vsb.string()),
	styles: vsb.array(vsb.string()),
	tracklist: vsb.array(tracksSchema),
	uri: vsb.string(),
	videos: vsb.array(videoSchema),
	year: vsb.number().int()
});

export type ReleaseStatsSchema = vsbInfer<typeof releaseStatsSchema>;
export type ReleaseStatsResultSchema = vsbInfer<typeof releaseStatsResultSchema>;
export type ReleaseRequestSchema = vsbInfer<typeof releaseRequestSchema>;
export type ReleaseResponseSchema = vsbInfer<typeof releaseResponseSchema>;
