import { useMemo } from "react";
import { usePostItContext } from "./usePostItContext"
import { NoteIdType } from "./types";

export const useNote = (id: NoteIdType) => {
	const {notes} = usePostItContext();

	const note = useMemo(() => notes.find((note) => note._id === id), [notes, id]);

	return note!;
}
