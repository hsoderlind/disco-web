import { MenuRef } from "antd";
import { CSSProperties, ReactNode, RefObject } from "react"

export type NoteIdType = number;

export type NoteKeyType = string;

export type PositionType = {
	x: number;
	y: number;
};

export type NoteType = {
	_id?: NoteIdType;
	key: NoteKeyType;
	position: PositionType;
	color: CSSProperties['backgroundColor'];
	visible: boolean;
	content?: string;
}

export type Updateable = Partial<Omit<NoteType, 'id' | 'position'>>;

export type CreateFn = () => Promise<void>;

export type RemoveFn = (id: NoteIdType) => Promise<void>

export type UpdateFn = (id: NoteIdType, values: Updateable) => Promise<void>;

export type NoteProps = {
	id: NoteIdType;
	key: NoteKeyType;
}

export type PostItContextType = {
	create: CreateFn;
	remove: RemoveFn;
	update: UpdateFn;
	visibleNotes?: NoteType[];
	notes?: NoteType[];
	buttonRef: RefObject<MenuRef>;
}

export type PostItProviderProps = {
	children: ReactNode;
}

export type DroppableProps = {
	children: ReactNode;
}
