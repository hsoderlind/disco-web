import { Upload } from "../../../../components/forms/controls/upload/types";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { UseFieldArrayRemove } from "react-hook-form";


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
	remove: UseFieldArrayRemove;
}

export type ProductFileStore = {
	models: Upload[];
	add: (models: Upload | Upload[]) => void;
	remove: (model: Upload) => void;
	clear: () => void;
	move: (fromIndex: number, toIndex: number) => void;
}
