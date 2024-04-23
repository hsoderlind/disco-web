import { Options } from "react-barcode";
import { Path } from "react-hook-form";
import { ProductSchemaType } from "../../../../../services/product/types";

export type VisualBarcodeProps = {
	name: Path<ProductSchemaType>;
} & Options;
