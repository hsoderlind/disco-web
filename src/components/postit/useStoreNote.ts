import app from "../../lib/application-builder/ApplicationBuilder"
import { db } from "../../storage/Db"
import { NoteType } from "./types"

export const useStoreNote = () => {
	const store = async (note: NoteType) => {
		try {
			const id = await db.notes.add(note);

			return id;
		} catch (error) {
			app.addErrorNotification({description: error as string});
			throw error;
		}
	}

	return store;
}
