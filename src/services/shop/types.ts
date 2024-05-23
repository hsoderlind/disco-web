import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgNumberOrSsn, validateZipCode } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { LogotypeSchema } from "../logotype/types";
import { User, UserStateUnion } from "../user/types";

const vsb = app.getValidationSchemaBuilder();

export const shopSchema = vsb.object({
	name: vsb.string().nonempty(),
	orgnumber: vsb.string().nonempty().refine(validateOrgNumberOrSsn),
	address_street1: vsb.string().nonempty(),
	address_street2: vsb.string().nullable().optional(),
	address_zip: vsb.string().nonempty().refine(validateZipCode),
	address_city: vsb.string().nonempty(),
	support_phone: vsb.string().optional(),
	support_email: vsb.string().email().optional(),
	official_website: vsb.string().url().optional(),
	support_website: vsb.string().url().optional(),
	terms_of_agreement_url: vsb.string().url().optional(),
	privacy_police_url: vsb.string().url().optional(),
});

export const shopUserSchema = vsb.object({
	name: vsb.string(),
	email: vsb.string().email(),
	roles: vsb.array(vsb.number().int().nonnegative()).min(1)
});

export type ShopSchema = vsbInfer<typeof shopSchema>;

export type ShopUserSchema = vsbInfer<typeof shopUserSchema>;

export type ShopUserType = {
	id: User['id'];
	state: UserStateUnion;
	roles: User['roles'];
} & ShopUserSchema;

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
