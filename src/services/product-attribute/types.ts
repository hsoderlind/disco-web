import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
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

export const productAttributeSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	attribute_type_id: vsb.number().nonnegative(),
	attribute_value_id: vsb.number().nonnegative(),
	sort_order: vsb.number().min(0),
	active: vsb.boolean(),
});


export type AttributeTyoeSchemaType = vsbInfer<typeof attributeTypeSchema>;
export type AttributeValueSchemaType = vsbInfer<typeof attributeValueSchema>;
export type ProductAttributeSchemaType = vsbInfer<typeof productAttributeSchema>;

export type AttributeValueType = AttributeValueSchemaType & {
	attribute_type?: AttributeTypeType | AttributeType;
}

export type AttributeTypeType = AttributeTyoeSchemaType & {
	attribute_values?: AttributeValueType[] | AttributeValueCollection;
}

export type ProductAttributeType = {id: number} & ProductAttributeSchemaType;

