import { Dayjs } from "dayjs";
import app from "../../lib/application-builder/ApplicationBuilder";
import { id, sortOrder, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { CustomerType } from "../customer/types";
import { shippingMethodSchema } from "../shipping-method/types";
import { OrderStatusSchema } from "../order-status/types";
import { MetadataSchema } from "../metadata/types";
import { NoteSchema } from "../note/types";
import { ReceiptType } from "../receipt/types";
import { ActivitySchema } from "../activity/types";

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
	item_number: vsb.string().nullable(),
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
	order_number: vsb.string(),
	customer_id: id,
	status: vsb.string(),
	items: vsb.array(orderItemSchema).min(1),
	payment_method: orderPaymentSchema,
	shipping_method: shippingMethodSchema,
	totals: vsb.array(orderTotalSchema)
});

export type OrderSchema = vsbInfer<typeof orderSchema>;

export type OrderPaymentType = {
	id: number,
	payment_method_name: string;
	title: string;
	transaction_id: string;
};

export type OrderShippingType = {
	id: number;
	shipping_method_repository_id: number;
	shipping_method_name: string;
	title: string;
};

export const createOrderStatusHistorySchema = vsb.object({
	order_status_id: id,
	note: vsb.string().optional(),
	mail_content: vsb.string().optional()
});

export type CreateOrderStatusHistorySchema = {
	order_id: number;
} & vsbInfer<typeof createOrderStatusHistorySchema>;

export type OrderStatusHistoryType = {
	id: number;
	old_status_id: number | null;
	old_status?: OrderStatusSchema;
	new_status_id: number;
	new_status: OrderStatusSchema;
	note?: NoteSchema;
	created_at: Dayjs;
};

export type OrderTotalType = {
	name: string;
	label: string;
	value: number;
	sort_order: number;
}

export type OrderType = {
	customer: CustomerType;
	payment: OrderPaymentType;
	status_history: OrderStatusHistoryType[];
	current_status: OrderStatusHistoryType;
	totals: OrderTotalType[];
	metadata: MetadataSchema[];
	notes: NoteSchema[];
	shipping: OrderShippingType;
	receipt: ReceiptType;
	created_at: Dayjs;
	activities: ActivitySchema[];
} & Omit<OrderSchema, 'totals'>;

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

export const createOrderItemSchema = orderItemSchema;

export type CreateOrderItemSchema = vsbInfer<typeof createOrderItemSchema>;

export const createOrderTotalSchema = vsb.record(vsb.string(), vsb.object({
	name: vsb.string(),
	entries: vsb.array(vsb.object({
		label: vsb.string(),
		value: vsb.number().int(),
		vat: vsb.number().int().optional(),
		sort_order: sortOrder
	})),
	sort_order: sortOrder
}));

export type CreateOrderTotalSchema = vsbInfer<typeof createOrderTotalSchema>;

export const createOrderSchema = orderSchema.omit({
	order_number: true,
	payment_method: true,
	status: true
}).extend({
	payment_name: vsb.string(),
	shipping_name: vsb.string(),
	items: vsb.array(createOrderItemSchema).min(1, 'Ordern måste innehålla minst en orderrad'),
	totals: createOrderTotalSchema,
	fees: vsb.record(vsb.string(), vsb.object({
		value: vsb.number().int().min(0),
		vat: vsb.number().int().min(0),
	})),
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
