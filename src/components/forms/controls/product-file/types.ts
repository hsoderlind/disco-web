import { FieldArrayWithId, UseFieldArrayMove, UseFieldArrayRemove } from "react-hook-form"
import { ProductSchemaType } from "../../../../services/product/types"
import { Upload } from "../upload/types";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type ProductFileUploadProps = {
	fields: FieldArrayWithId<ProductSchemaType, 'files', 'key'>[];
	append: (files: Upload[]) => void;
	remove: UseFieldArrayRemove;
	move: UseFieldArrayMove;
}

export type ProductFileUploadListProps = {
	fields: FieldArrayWithId<ProductSchemaType, 'files', 'key'>[];
	models: Upload[];
}

export type SortableItemProps = {
	id: string;
	model: Upload;
	index: number;
}

export type ProductFileUploadListItemProps = {
	model: Upload;
	index: number;
	attributes?: DraggableAttributes;
	listeners?: SyntheticListenerMap;
	style?: Record<string, string | undefined>;
}

export type ProductFileUploadContextType = {
	move: UseFieldArrayMove;
	remove: UseFieldArrayRemove;
}
