import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgnumberOptional, validateSsnOptional } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { AccountSchema, accountSchema } from "../account/types";
import { CreditBalance } from "./CreditBalance";

const vsb = app.getValidationSchemaBuilder();

export const customerSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	person_name: vsb.string().optional(),
	company_name: vsb.string().optional(),
	email: vsb.string().email(),
	ssn: vsb.string().refine(validateSsnOptional).optional(),
	orgno: vsb.string().refine(validateOrgnumberOptional).optional(),
	vatno: vsb.string().optional(),
	taxable: vsb.boolean(),
	currency: vsb.string().max(3),
	note: vsb.string().optional(),
	shipping_address: accountSchema,
	billing_address: accountSchema
});

export const creditBalanceSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	customer_id: vsb.number().int().nonnegative(),
	current_balance: vsb.number().int(),
	adjustment_type: vsb.number(),
	note: vsb.string().optional()
});

export type CustomerSchema = vsbInfer<typeof customerSchema>;
export type CreditBalanceSchema = vsbInfer<typeof creditBalanceSchema>;

export type CustomerType = {
	name: string;
	created_at: number;
	account: AccountSchema;
	shipping_address: AccountSchema;
	billing_address: AccountSchema;
	credit_balance: CreditBalanceSchema | CreditBalance;
} & CustomerSchema;
