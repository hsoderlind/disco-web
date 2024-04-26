import { db } from "../../storage/Db"

export const useFetchAllNotes = () => {
	const fetch = () => db.notes.toArray();

	return fetch;
}
