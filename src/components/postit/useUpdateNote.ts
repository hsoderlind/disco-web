import app from "../../lib/application-builder/ApplicationBuilder"
import { db } from "../../storage/Db"
import { NoteIdType, NoteType } from "./types"

export const useUpdateNote = () => {
	const update = async (id: NoteIdType, values: Partial<NoteType>) => {
		try {
			return await db.notes.update(id, values);
		} catch (error) {
			app.addErrorNotification({description: error as string});
		}
	}

	return update;
}
