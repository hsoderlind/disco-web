import { Options } from "react-barcode";
import { Path } from "react-hook-form";
import { ProductSchemaType } from "../../../../../services/product/types";

export type Format = Options['format'];

export type VisualBarcodeProps = {
	name: Path<ProductSchemaType>;
	formatFrom: Path<ProductSchemaType>;
	id: string;
} & Omit<Options, 'value' | 'format'>;
