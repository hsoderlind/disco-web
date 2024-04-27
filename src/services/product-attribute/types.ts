import app from "../../lib/application-builder/ApplicationBuilder";
import { isDayJs, vsbInfer } from "../../lib/validation/validation-schema-builder";
import { AttributeType } from "./AttributeType";
import { AttributeValueCollection } from "./AttributeValueCollection";

const vsb = app.getValidationSchemaBuilder();

export const attributeTypeSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	label: vsb.string().nonempty(),
	active: vsb.boolean().default(true)
});

export const attributeValueSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	label: vsb.string().nonempty(),
	sort_order: vsb.number().min(0),
	attribute_type_id: vsb.number().nonnegative()
});

export const productAttributeStockSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	sku: vsb.string().nullable().optional(),
	stock_unit: vsb.string().nullable().optional(),
	out_of_stock_message: vsb.string().optional(),
	available_at: vsb.date().or(isDayJs).nullable().optional(),
	allow_order_out_of_stock: vsb.boolean().default(true),
	initial_quantity: vsb.number().default(0),
	reserved_quantity: vsb.number().optional(),
	sold_quantity: vsb.number().optional()
});

export const productAttributeSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	attribute_type_id: vsb.number().nonnegative(),
	attribute_value_id: vsb.number().nonnegative(),
	sort_order: vsb.number().min(0),
	active: vsb.boolean(),
	stock: productAttributeStockSchema.optional()
});


export type AttributeTyoeSchemaType = vsbInfer<typeof attributeTypeSchema>;
export type AttributeValueSchemaType = vsbInfer<typeof attributeValueSchema>;
export type ProductAttributeSchemaType = vsbInfer<typeof productAttributeSchema>;
export type ProductAttributeStockSchemaType = vsbInfer<typeof productAttributeStockSchema>;

export type AttributeValueType = AttributeValueSchemaType & {
	attribute_type?: AttributeTypeType | AttributeType;
}

export type AttributeTypeType = AttributeTyoeSchemaType & {
	attribute_values?: AttributeValueType[] | AttributeValueCollection;
}

export type ProductAttributeStockType = {id: number} & ProductAttributeStockSchemaType;

export type ProductAttributeType = {id: number} & ProductAttributeSchemaType;

