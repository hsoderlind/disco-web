import { Dayjs } from "dayjs";
import app from "../../lib/application-builder/ApplicationBuilder";
import { validateOrgnumberOptional, validateSsnOptional } from "../../lib/validation/validation-rules";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { AccountSchema, accountSchema } from "../account/types";
import { CreditBalance } from "./CreditBalance";
import { AdjustmentTypes } from "./AdjustmentTypes";

const vsb = app.getValidationSchemaBuilder();

export const basicCustomerSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	person_name: vsb.string().optional(),
	company_name: vsb.string().optional(),
	email: vsb.string().email(),
	ssn: vsb.string().refine(validateSsnOptional).optional(),
	orgno: vsb.string().refine(validateOrgnumberOptional).optional(),
	vatno: vsb.string().optional(),
	taxable: vsb.boolean(),
	currency: vsb.string().max(3),
});

export const customerSchema = basicCustomerSchema.extend({
	note: vsb.string().optional(),
	shipping_address: accountSchema,
	billing_address: accountSchema
});

export const basicCreditBalanceSchema = vsb.object({
	id: vsb.number().int().nonnegative().optional(),
	adjusted_balance: vsb.number().int(),
	adjustment_type: vsb.enum(AdjustmentTypes.values()),
	note: vsb.string().optional(),
});

export const creditBalanceSchema = basicCreditBalanceSchema;

export type BasicCustomerSchema = vsbInfer<typeof basicCustomerSchema>;
export type CustomerSchema = vsbInfer<typeof customerSchema>;
export type CreditBalanceSchema = vsbInfer<typeof creditBalanceSchema>;

export type CreditBalanceType = {
	customer_id: number;
	current_balance: number;
	created_at: Dayjs;
	history: CreditBalanceType[];
} & CreditBalanceSchema;

export type CustomerType = {
	name: string;
	created_at: number;
	account: AccountSchema;
	shipping_address: AccountSchema;
	billing_address: AccountSchema;
	credit_balance: CreditBalanceSchema | CreditBalance;
} & CustomerSchema;
