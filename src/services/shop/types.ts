import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgNumberOrSsn, validateZipCode } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { LogotypeSchema } from "../logotype/types";

const vsb = app.getValidationSchemaBuilder();

export const shopSchema = vsb.object({
	name: vsb.string().nonempty(),
	orgnumber: vsb.string().nonempty().refine(validateOrgNumberOrSsn),
	address_street1: vsb.string().nonempty(),
	address_street2: vsb.string().nullable().optional(),
	address_zip: vsb.string().nonempty().refine(validateZipCode),
	address_city: vsb.string().nonempty()
});

export type ShopSchema = vsbInfer<typeof shopSchema>;

export type Shop = {
	id: number;
	url_alias: string;
	account_owner: number;
	deleted_at?: string;
	created_at: string;
	default_logotype?: LogotypeSchema;
	mini_logotype?: LogotypeSchema;
} & ShopSchema;

export type ShopStore = {
	shop: Shop;
	update: (shop: Shop) => void;
}
