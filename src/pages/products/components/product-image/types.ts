import { ProductImage } from "../../../../services/product-image/ProductImage";
import { Upload } from "../../../../components/forms/controls/upload/types";

export type UpdateCb = (file: ProductImage) => void;

export type RemoveCb = (file: ProductImage) => void;

export type removeFailedUploadedFilCb = (file: Upload) => void;

export type ProductImageContextType = {
	move: (fromIndex: number, toIndex: number) => void;
	remove: (model: Upload) => void;
}


export type ProductImageStore = {
	models: Upload[];
	add: (models: Upload | Upload[]) => void;
	remove: (model: Upload) => void;
	move: (fromIndex: number, toIndex: number) => void;
	clear: () => void;
}

export type ProductImageListProps = {
	models: Upload[]
};

export type ImageCardProps = {
	model: Upload;
	index: number;
	id: string | number;
};
