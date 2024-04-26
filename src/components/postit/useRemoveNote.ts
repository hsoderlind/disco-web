import app from "../../lib/application-builder/ApplicationBuilder"
import { db } from "../../storage/Db"
import { NoteIdType } from "./types"

export const useRemoveNote = () => {
	const remove = async (id: NoteIdType) => {
		try {
			return db.notes.delete(id);
		} catch (error) {
			app.addErrorNotification({description: error as string});
		}
	}

	return remove;
}
