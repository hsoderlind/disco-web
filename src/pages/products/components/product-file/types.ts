import { Upload } from "../../../../components/forms/controls/upload/types";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";


export type ProductFileUploadListProps = {
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
	move: (fromIndex: number, toIndex: number) => void;
	remove: (model: Upload) => void;
}

export type ProductFileStore = {
	models: Upload[];
	add: (models: Upload | Upload[]) => void;
	remove: (model: Upload) => void;
	clear: () => void;
	move: (fromIndex: number, toIndex: number) => void;
}
