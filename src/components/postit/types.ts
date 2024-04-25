import { MenuRef } from "antd";
import { CSSProperties, ReactNode, RefObject } from "react"

type NoteIdType = string;

export type PositionType = {
	x: number;
	y: number;
};

export type NoteType = {
	id: NoteIdType;
	position: PositionType;
	color: CSSProperties['backgroundColor'];
	visible: boolean;
	content?: string;
}

export type NoteProps = {
	id: NoteIdType
}


export type CreateFn = () => void;

export type RemoveFn = (id: NoteIdType) => void

export type UpdateFn = (id: NoteIdType, values: Partial<Omit<NoteType, 'id' | 'position'>>) => void;

export type PostItContextType = {
	create: CreateFn;
	remove: RemoveFn;
	update: UpdateFn;
	visibleNotes: NoteType[];
	notes: NoteType[];
	buttonRef: RefObject<MenuRef>;
}

export type PostItProviderProps = {
	children: ReactNode;
}

export type DroppableProps = {
	children: ReactNode;
}
