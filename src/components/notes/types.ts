import { ReactNode } from "react";
import { EmptyFn } from "../../types/common";

export type RenderButtonBarParams = {
	openModal: EmptyFn;
	closeModal: EmptyFn;
}

export type NotesProps = {
	renderButtonBar?: (params: RenderButtonBarParams) => ReactNode;
	resource: string;
	resourceId: number;
}
