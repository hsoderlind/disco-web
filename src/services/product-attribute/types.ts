import dayjs, { Dayjs } from "dayjs";
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { AttributeType } from "./AttributeType";
import { AttributeValueCollection } from "./AttributeValueCollection";

const vsb = app.getValidationSchemaBuilder();

export const attributeTypeSchema = vsb.object({
	label: vsb.string().nonempty(),
	active: vsb.boolean().default(true)
});

export const attributeValueSchema = vsb.object({
	label: vsb.string().nonempty(),
	sort_order: vsb.number().min(0),
	attribute_type_id: vsb.number().nonnegative()
});

export const productAttributeSchema = vsb.object({
	attribute_type_id: vsb.number().nonnegative(),
	attribute_value_id: vsb.number().nonnegative(),
	sort_order: vsb.number().min(0),
	active: vsb.boolean()
});

export const productAttributeStockSchema = vsb.object({
	sku: vsb.string().optional(),
	stock_unit: vsb.string().optional(),
	out_of_stock_message: vsb.string().optional(),
	available_at: vsb.instanceof(dayjs as unknown as typeof Dayjs),
	allow_order_out_of_stock: vsb.boolean().default(true),
	initial_quantity: vsb.number().default(0),
	reserved_quantity: vsb.number().optional(),
	sold_quantity: vsb.number().optional()
});

export type AttributeTyoeSchemaType = vsbInfer<typeof attributeTypeSchema>;
export type AttributeValueSchemaType = vsbInfer<typeof attributeValueSchema>;
export type ProductAttributeSchemaType = vsbInfer<typeof productAttributeSchema>;
export type ProductAttributeStockSchemaType = vsbInfer<typeof productAttributeStockSchema>;

export type AttributeValueType = {
	id: number;
	label: string;
	attribute_type_id?: number;
	attribute_type?: AttributeTypeType | AttributeType;
}

export type AttributeTypeType = {
	id: number;
	active: boolean;
	label: string;
	attribute_values?: AttributeValueType[] | AttributeValueCollection;
}
