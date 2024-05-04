import { vsbInfer } from './../../../lib/validation/validation-schema-builder';
import app from "../../../lib/application-builder/ApplicationBuilder";
import { ratingSchema } from '../types';

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

export type ReleaseStatsSchema = vsbInfer<typeof releaseStatsSchema>;
export type ReleaseStatsResultSchema = vsbInfer<typeof releaseStatsResultSchema>;
