import { Note } from "../../../../../../services/note/Note";
import { EmptyFn } from "../../../../../../types/common";

export type NoteEditProps = {
	note: Note;
	open: boolean;
	onCancel?: EmptyFn;
	onUpdated?: (note: Note) => void;
	resource: string;
	resourceId: number;
}
