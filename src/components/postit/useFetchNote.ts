import app from "../../lib/application-builder/ApplicationBuilder"
import { db } from "../../storage/Db"
import { NoteIdType } from "./types"

export const useFetchNote = () => {
	const fetch = async (id: NoteIdType) => {
		try {
			return await db.notes.get(id);
		} catch (error) {
			app.addErrorNotification({description: error as string});
		}
	}

	return fetch;
}
