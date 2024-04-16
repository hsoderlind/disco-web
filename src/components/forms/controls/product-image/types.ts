import { ProductImage } from "../../../../services/product-image/ProductImage";
import { Upload } from "../upload/types";

export type UpdateCb = (file: ProductImage) => void;

export type RemoveCb = (file: ProductImage) => void;

export type removeFailedUploadedFilCb = (file: Upload) => void;

export type ProductImageContextType = {
	removeFailedUploadedFile: removeFailedUploadedFilCb
}
