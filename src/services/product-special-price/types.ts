import app from "../../lib/application-builder/ApplicationBuilder"
import { isDayJs, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { ProductType } from "../product/types";
import { Product } from "../product/Product";

const vsb = app.getValidationSchemaBuilder();

export const productSpecialPriceSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	special_price: vsb.number().min(0),
	entry_date: vsb.date().or(isDayJs).optional(),
	expiration_date: vsb.date().or(isDayJs).nullable().optional()
});

export type ProductSpecialPriceSchemaType = vsbInfer<typeof productSpecialPriceSchema>;

export type ProductSpecialPriceType = ProductSpecialPriceSchemaType & {
	product?: ProductType | Product;
}
