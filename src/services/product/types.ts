import { ProductAttributeType } from './../product-attribute/types';
import app from "../../lib/application-builder/ApplicationBuilder";
import { vsbInfer } from "../../lib/validation/validation-schema-builder";
import { BarcodeType, barcodeSchema } from "../barcode/types";
import { productAttributeSchema } from "../product-attribute/types";
import { ProductConditions, ProductConditionsUnion } from "./ProductConditions";
import { Category } from '../category/Category';
import { ProductSpecialPriceType, productSpecialPriceSchema } from '../product-special-price/types';
import { ProductSpecialPriceCollection } from '../product-special-price/ProductSpecialPriceCollection';
import { ProductFileType } from '../product-file/types';
import { ProductFileCollection } from '../product-file/ProductFileCollection';
import { ProductImageType } from '../product-image/types';
import { ProductImageCollection } from '../product-image/ProductImageCollection';
import { ProductStockType, productStockSchema } from '../product-stock/types';
import { ProductStock } from '../product-stock/ProductStock';
import { ProductStates, ProductStatesUnion } from './ProductStates';
import { ProductAttributeCollection } from '../product-attribute/ProductAttributeCollection';
import { BarcodeCollection } from '../barcode/BarcodeCollection';
import { TaxType } from '../tax/types';
import { Tax } from '../tax/Tax';
import {Upload} from '../../components/forms/controls/upload/types';

const vsb = app.getValidationSchemaBuilder();

export const productSchema = vsb.object({
	id: vsb.number().nonnegative().optional(),
	state: vsb.enum(ProductStates.values()),
	tax_id: vsb.number(),
	supplier_id: vsb.number().optional(),
	manufacturer_id: vsb.number().optional(),
	item_number: vsb.string().optional(),
	price: vsb.number().min(0),
	price_incl_vat: vsb.number().optional(),	
	cost_price: vsb.number().min(0),
	reference: vsb.string().max(255).optional(),
	supplier_reference: vsb.string().max(255).optional(),
	condition: vsb.enum(ProductConditions.values()),
	name: vsb.string().max(255).nonempty(),
	summary: vsb.string().optional(),
	description: vsb.string().optional(),
	categories: vsb.array(vsb.number().nonnegative()),
	barcodes: vsb.array(barcodeSchema).optional(),
	product_attributes: vsb.array(productAttributeSchema).optional(),
	special_prices: vsb.array(productSpecialPriceSchema).optional(),
	images: vsb.array(vsb.instanceof(Upload)).optional(),
	files: vsb.array(vsb.instanceof(Upload)).optional(),
	stock: productStockSchema
});

export type ProductSchemaType = vsbInfer<typeof productSchema>

export type ProductType = {
	id: number;
	state: ProductStatesUnion,
	tax_id: number;
	supplier_id?: number;
	manufacturer_id?: number;
	item_number?: string;
	price: number;
	price_incl_vat: number;
	cost_price: number;
	current_special_price?: number;
	selling_price: number;
	reference?: string;
	supplier_reference?: string;
	condition: ProductConditionsUnion;
	name: string;
	summary?: string;
	description?: string;
	categories?: Category[] | number[];
	barcodes?: Partial<BarcodeType>[] | BarcodeCollection;
	product_attributes?: Partial<ProductAttributeType>[] | ProductAttributeCollection;
	special_prices?: Partial<ProductSpecialPriceType>[] | ProductSpecialPriceCollection;
	files?: Partial<ProductFileType>[] | ProductFileCollection;
	images?: Partial<ProductImageType>[] | ProductImageCollection;
	stock: Partial<ProductStockType> | ProductStock;
	tax: Partial<TaxType> | Tax;
};

export type Criteria = {
	category?: number;
	includeSubcategories?: boolean;
	state?: ProductStatesUnion;
}
