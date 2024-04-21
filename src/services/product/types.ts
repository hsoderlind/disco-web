import { productAttributeStockSchema } from './../product-attribute/types';
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { BarcodeSchema, barcodeSchema } from "../barcode/types";
import { productAttributeSchema } from "../product-attribute/types";
import { ProductConditions, ProductConditionsUnion } from "./ProductConditions";
import { Category } from '../category/Category';
import { Barcode } from '../barcode/Barcode';
import { ProductSpecialPriceType, productSpecialPriceSchema } from '../product-special-price/types';
import { ProductSpecialPriceCollection } from '../product-special-price/ProductSpecialPriceCollection';
import { ProductFileType, productFileSchema } from '../product-file/types';
import { ProductFileCollection } from '../product-file/ProductFileCollection';
import { ProductImageType, productImageSchema } from '../product-image/types';
import { ProductImageCollection } from '../product-image/ProductImageCollection';
import { ProductStockType, productStockSchema } from '../product-stock/types';
import { ProductStock } from '../product-stock/ProductStock';
import { ProductStates } from './ProductStates';

const vsb = app.getValidationSchemaBuilder();

const productBarcodeSchema = barcodeSchema.extend({key: vsb.string()});
const combinedProductAttributeSchema = productAttributeSchema.extend({key: vsb.string(), stock: productAttributeStockSchema})
const extendedProductSpecialPriceSchema = productSpecialPriceSchema.extend({key: vsb.string()});
const extendedProductImageSchema = productImageSchema.extend({key: vsb.string()});
const extendedProductFileSchema = productFileSchema.extend({key: vsb.string()});

export const productSchema = vsb.object({
	state: vsb.enum(ProductStates.values()),
	tax_id: vsb.number().optional(),
	supplier_id: vsb.number().optional(),
	manufacturer_id: vsb.number().optional(),
	price: vsb.number().min(0),	
	cost_price: vsb.number().min(0),
	reference: vsb.string().max(255).optional(),
	supplier_reference: vsb.string().max(255).optional(),
	condition: vsb.enum(ProductConditions.values()),
	name: vsb.string().max(255).nonempty(),
	summary: vsb.string().optional(),
	description: vsb.string().optional(),
	categories: vsb.array(vsb.number().nonnegative()),
	barcodes: vsb.array(productBarcodeSchema).optional(),
	product_attributes: vsb.array(combinedProductAttributeSchema),
	special_prices: vsb.array(extendedProductSpecialPriceSchema).optional(),
	images: vsb.array(extendedProductImageSchema).optional(),
	files: vsb.array(extendedProductFileSchema).optional(),
	stock: productStockSchema
});

export type ProductSchemaType = vsbInfer<typeof productSchema>

export type ProductType = {
	id: number;
	tax_id: number;
	supplier_id: number;
	manufacturer_id: number;
	price: number;
	price_incl_vat: number;
	cost_price: number;
	reference: string;
	supplier_reference: string;
	condition: ProductConditionsUnion;
	name: string;
	summary?: string;
	description: string;
	categories?: Category[] | number[],
	barcodes?: Barcode[] | BarcodeSchema[],
	special_prices?: ProductSpecialPriceType[] | ProductSpecialPriceCollection;
	files: ProductFileType[] | ProductFileCollection;
	images: ProductImageType[] | ProductImageCollection;
	stock: ProductStockType | ProductStock
};
