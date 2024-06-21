import { Note } from "../../../services/note/Note";

export type NoteCreateProps = {
	open: boolean;
	resource: string;
	resourceId: number;
	onCancel?: () => void;
	onCreated?: (note: Note) => void;
}
