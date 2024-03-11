import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";

const vsb = app.getValidationSchemaBuilder();

export const productSchema = vsb.object({
	tax_id: vsb.number().optional(),
	supplier_id: vsb.number().optional(),
	manufacturer_id: vsb.number().optional(),
	price: vsb.number().min(0),
	price_incl_vat: vsb.number().min(0),
	reference: vsb.string().max(255).optional(),
	supplier_reference: vsb.string().max(255).optional(),
	available_for_order: vsb.boolean().default(true),
	available_at: vsb.date(),
	condition: vsb.enum(['new', 'used', 'refurbished']),
	name: vsb.string().max(255).nonempty(),
	description: vsb.string().optional()
});

export type ProductSchemaType = vsbInfer<typeof productSchema>

export type ProductType = {
	id: number;
	tax_id: number;
	supplier_id: number;
	manufacturer_id: number;
	price: number;
	price_incl_vat: number;
	reference: string;
	supplier_reference: string;
	available_for_order: boolean;
	available_at: string;
	condition: 'new' | 'used' | 'refurbished';
	name: string;
	description: string;
}
