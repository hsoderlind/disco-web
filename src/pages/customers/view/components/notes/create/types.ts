import { Note } from "../../../../../../services/note/Note";

export type NoteCreateProps = {
	open: boolean;
	onCancel?: () => void;
	onCreated?: (note: Note) => void;
}
