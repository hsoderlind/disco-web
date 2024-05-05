import { vsbInfer } from './../../../lib/validation/validation-schema-builder';
import app from "../../../lib/application-builder/ApplicationBuilder";
import { idSchema } from "../types";

const vsb = app.getValidationSchemaBuilder();

export const priceSuggestionsRequestSchema = vsb.object({
	release_id: idSchema
});

export const priceSchema = vsb.object({
	currency: vsb.string(),
	value: vsb.number()
})
export const priceSuggestionsResponseSchema = vsb.object({
	release_id: idSchema,
	'Very Good (VG)': priceSchema,
	'Good Plus (G+)': priceSchema,
	'Near Mint (NM or M-)': priceSchema,
	'Good (G)': priceSchema,
	'Very Good Plus (VG+)': priceSchema,
	'Mint (M)': priceSchema,
	'Fair (F)': priceSchema,
	'Poor (P)': priceSchema
});

export type PriceSuggestionsRequestSchema = vsbInfer<typeof priceSuggestionsRequestSchema>;
export type PriceSuggestionsResponseSchema = vsbInfer<typeof priceSuggestionsResponseSchema>;
export type PriceSchema = vsbInfer<typeof priceSchema>;
