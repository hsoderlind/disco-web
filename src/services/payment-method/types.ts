import { Upload } from "../../components/forms/controls/upload/types";
import app from "../../lib/application-builder/ApplicationBuilder";
import { emptyObject, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { logotypeSchema } from "../logotype/types";

const vsb = app.getValidationSchemaBuilder();

export const basePaymentMethodSchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	description: vsb.string().nullable().optional(),
	sort_order: vsb.number().int().nonnegative(),
	active: vsb.boolean(),
	fee: vsb.number().int().nullable(),
	component: vsb.string(),
	admin_component: vsb.string().nullable(),
	configuration: vsb.array(vsb.any()).nullable().optional(),
	version: vsb.string(),
	logotype: vsb.instanceof(Upload).or(logotypeSchema).or(emptyObject).nullable().optional()
});

export const paymentMethodSchema = basePaymentMethodSchema;

export const paymentMethodModuleSchema = basePaymentMethodSchema.omit({logotype: true}).extend({
	presentation_component: vsb.string(),
	installed: vsb.boolean(),
	update_available: vsb.number().int().min(-1).max(1),
	published_at: vsb.string(),
	updated_at: vsb.string(),
	logotype: logotypeSchema.nullable().optional(),
})

export type BasePaymentMethodSchema = vsbInfer<typeof basePaymentMethodSchema>;

export type PaymentMethodSchema = vsbInfer<typeof basePaymentMethodSchema>;

export type PaymentMethodModuleSchema = vsbInfer<typeof paymentMethodModuleSchema>;

export type PaymentMethodType = PaymentMethodSchema;

export type PaymentMethodModuleType = PaymentMethodModuleSchema;
