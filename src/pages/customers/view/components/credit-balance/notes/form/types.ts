import { Note } from "../../../../../../../services/note/Note";

export type NoteFormProps = {
	open: boolean;
	onCancel?: () => void;
	onCreated?: (note: Note) => void;
}
