import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgNumberOrSsn, validateZipCode } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const shopSchema = vsb.object({
	name: vsb.string().nonempty(),
	orgnumber: vsb.string().nonempty().refine(validateOrgNumberOrSsn),
	address_street1: vsb.string().nonempty(),
	address_street2: vsb.string().optional(),
	address_zip: vsb.string().nonempty().refine(validateZipCode),
	address_city: vsb.string().nonempty()
});

export type ShopSchema = vsbInfer<typeof shopSchema>;

export interface Shop {
	id: number;
	name: string;
	orgnumber: string;
	url_alias: string;
	address_street1: string;
	address_street2?: string;
	address_zip: string;
	address_city: string;
	account_owner: number;
	deleted_at?: string;
	created_at: string;
}

export type ShopStore = {
	shop: Shop;
	update: (shop: Shop) => void;
}
