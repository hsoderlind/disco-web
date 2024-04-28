import { UseFieldArrayRemove, UseFieldArrayMove, FieldArrayWithId } from "react-hook-form";
import { ProductImage } from "../../../../services/product-image/ProductImage";
import { Upload } from "../../../../components/forms/controls/upload/types";
import { ProductSchemaType } from "../../../../services/product/types";

export type UpdateCb = (file: ProductImage) => void;

export type RemoveCb = (file: ProductImage) => void;

export type removeFailedUploadedFilCb = (file: Upload) => void;

export type ProductImageContextType = {
	move: UseFieldArrayMove;
	remove: UseFieldArrayRemove;
}

export type ProductImageStore = {
	models: Upload[];
	add: (models: Upload | Upload[]) => void;
	remove: (model: Upload) => void;
	clear: () => void;
}

export type ProductImageListProps = {
	fields: FieldArrayWithId<ProductSchemaType, 'images', 'key'>[];
	models: Upload[]
};

export type ImageCardProps = {
	model: Upload;
	index: number;
	id: string | number;
};
