import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { LogotypeSchema } from "../logotype/types";

const vsb = app.getValidationSchemaBuilder();

export const invoiceSettingsSchema = vsb.object({
	show_orgnumber: vsb.boolean(),
	show_company_name: vsb.boolean(),
	show_shop_name: vsb.boolean(),
	show_company_official_website: vsb.boolean(),
	show_shop_official_website: vsb.boolean(),
	show_company_support_url: vsb.boolean(),
	show_shop_support_url: vsb.boolean(),
	show_company_terms_of_agreement_url: vsb.boolean(),
	show_shop_terms_of_agreement_url: vsb.boolean(),
	show_company_privacy_police_url: vsb.boolean(),
	show_shop_privacy_police_url: vsb.boolean(),
	show_company_support_phone: vsb.boolean(),
	show_shop_support_phone: vsb.boolean(),
	show_company_support_email: vsb.boolean(),
	show_shop_support_email: vsb.boolean(),
	show_support_address: vsb.boolean(),
	show_shop_address: vsb.boolean(),
});

export type InvoiceSettingsSchema = vsbInfer<typeof invoiceSettingsSchema>;

export type InvoiceSettingsType = {
	id: number;
	logotype: LogotypeSchema
} & InvoiceSettingsSchema;
