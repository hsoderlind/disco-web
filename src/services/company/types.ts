import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgnumber } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { accountSchema } from "../account/types";

const vsb = app.getValidationSchemaBuilder();

export const companySchema = vsb.object({
	name: vsb.string(),
	orgnumber: vsb.string().refine(validateOrgnumber),
	vat_number: vsb.string(),
	official_website: vsb.string().url().nullable().optional(),
	support_website: vsb.string().url().nullable().optional(),
	terms_of_agreement_url: vsb.string().url().nullable().optional(),
	privacy_police_url: vsb.string().url().nullable().optional(),
	support_phone: vsb.string().optional(),
	support_email: vsb.string().email().nullable().optional(),
	support_address: accountSchema.omit({phone: true, country: true, name: true})
});

export type CompanySchema = vsbInfer<typeof companySchema>;

export type CompanyType = {
	id: number;
} & CompanySchema;

