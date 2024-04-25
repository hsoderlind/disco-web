import { useMemo } from "react";
import { usePostItContext } from "./usePostItContext"

export const useNote = (id: string) => {
	const {notes} = usePostItContext();

	const note = useMemo(() => notes.find((note) => note.id === id), [notes, id]);

	return note;
}
