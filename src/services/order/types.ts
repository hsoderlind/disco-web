import app from "../../lib/application-builder/ApplicationBuilder";
import { id, sortOrder, vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const orderAttributeSchema = vsb.object({
	attribute_product_id: id,
	attribute_type_id: id,
	attribute_value_id: id,
	order_item_id: id,
	attribute_type_name: vsb.string(),
	attribute_value_name: vsb.string(),
	price: vsb.number().int(),
	total: vsb.number().int(),
	vat: vsb.number().int(),
	tax_value: vsb.number().int(),
	quantity: vsb.number().int().nonnegative()
});

export type OrderAttributeSchema = vsbInfer<typeof orderAttributeSchema>;

export const orderItemSchema = vsb.object({
	id: id.optional(),
	product_id: id,
	tax_id: id,
	product_name: vsb.string(),
	price: vsb.number().int(),
	total: vsb.number().int(),
	vat: vsb.number().int(),
	tax_value: vsb.number().int(),
	quantity: vsb.number().int().nonnegative(),
	itemAttributes: vsb.array(orderAttributeSchema).optional()
});

export type OrderItemSchema = vsbInfer<typeof orderItemSchema>;

export const orderPaymentSchema = vsb.object({
	id: id.optional(),
	payment_method_name: vsb.string(),
});

export type OrderPaymentSchema = vsbInfer<typeof orderPaymentSchema>;

export const orderTotalSchema = vsb.object({
	id: id.optional(),
	label: vsb.string(),
	value: vsb.number().int(),
	sort_order: sortOrder
});

export type OrderTotalSchema = vsbInfer<typeof orderTotalSchema>;

export const orderSchema = vsb.object({
	id: id.optional(),
	customer_id: id,
	status: vsb.string(),
	items: vsb.array(orderItemSchema).min(1),
	payment_method: orderPaymentSchema,
	totals: vsb.array(orderTotalSchema)
});

export type OrderSchema = vsbInfer<typeof orderSchema>;

export const createOrderAttributeSchema = orderAttributeSchema.omit({
	attribute_type_id: true,
	attribute_value_id: true,
	attribute_type_name: true,
	attribute_value_name: true,
	order_item_id: true,
	tax_value: true,
	total: true,
	vat: true,
	quantity: true
});

export type CreateOrderAttributeSchema = vsbInfer<typeof createOrderAttributeSchema>;

export const createOrderItemSchema = orderItemSchema.extend({
	itemAttributes: vsb.array(createOrderAttributeSchema).optional()
});

export type CreateOrderItemSchema = vsbInfer<typeof createOrderItemSchema>;

export const createOrderTotalSchema = vsb.object({
	name: vsb.string(),
	entries: vsb.array(vsb.object({
		label: vsb.string(),
		value: vsb.number().int(),
		sort_order: sortOrder
	})),
	sort_order: sortOrder
});

export type CreateOrderTotalSchema = vsbInfer<typeof createOrderTotalSchema>;

export const createOrderSchema = orderSchema.extend({
	payment_name: vsb.string(),
	items: vsb.array(createOrderItemSchema).min(1, 'Ordern måste innehålla minst en orderrad'),
	totals: vsb.array(createOrderTotalSchema),
	note: vsb.string().optional()
});

export type CreateOrderSchema = vsbInfer<typeof createOrderSchema>;

export const orderTotalModuleSchema = vsb.object({
	name: vsb.string(),
	title: vsb.string(),
	description: vsb.string().nullable(),
	admin_component: vsb.string(),
	configuration: vsb.array(vsb.any()),
	installed: vsb.boolean(),
	published_at: vsb.string(),
	updated_at: vsb.string().nullable().optional(),
	version: vsb.string(),
	update_available: vsb. number().int().min(-1).max(1),
});

export const baseOrderTotalRepositorySchema = vsb.object({
	title: vsb.string(),
	description: vsb.string().nullable().optional(),
	sort_order: vsb.number().int().min(0),
	active: vsb.boolean(),
	component: vsb.string(),
	admin_component: vsb.string().nullable().optional(),
	configuration: vsb.array(vsb.any()).nullable().optional(),
});

export const orderTotalRepositorySchema = baseOrderTotalRepositorySchema.extend({
	name: vsb.string(),
	published_at: vsb.string(),
	updated_at: vsb.string().nullable().optional(),
	version: vsb.string(),
	update_available: vsb.number().int().min(-1).max(1),
});

export type OrderTotalModuleSchema = vsbInfer<typeof orderTotalModuleSchema>;

export type BaseOrderTotalRepositorySchema = vsbInfer<typeof baseOrderTotalRepositorySchema>;

export type OrderTotalRepositorySchema = vsbInfer<typeof orderTotalRepositorySchema>;
