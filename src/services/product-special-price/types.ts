import { Dayjs } from "dayjs";
import app from "../../lib/application-builder/ApplicationBuilder"
import { isDayJs, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { ProductType } from "../product/types";
import { Product } from "../product/Product";

const vsb = app.getValidationSchemaBuilder();

export const productSpecialPriceSchema = vsb.object({
	special_price: vsb.number().min(0),
	entry_date: isDayJs,
	expiration_date: isDayJs
});

export type ProductSpecialPriceSchemaType = vsbInfer<typeof productSpecialPriceSchema>;

export type ProductSpecialPriceType = {
	id: number;
	special_price: number;
	entry_date: Dayjs;
	expiration_date?: Dayjs;
	product?: ProductType | Product;
}
