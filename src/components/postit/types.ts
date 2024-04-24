import { CSSProperties } from "react"

type NoteIdType = string;

type PositionType = {
	x: number;
	y: number;
};

export type NoteProps = {
	color: CSSProperties['backgroundColor'];
	position: PositionType;
}

export type NoteType = {
	id: NoteIdType;
	position: PositionType
}

export type PostItContext = {
	add: () => void;
	remove: (id: NoteIdType) => void;
	latestNoteInitialPosition: PositionType;
	visibleNotes: NoteType[];
	notes: NoteType[]
}
