import { getQueryData } from "../../../lib/loading/getQueryData";
import { Note } from "../Note";
import { queryLoadNote } from "../queries";

export const loadNote = (id: number, resource: string, resourceId: number) => {
	const [queryKey, queryFn] = queryLoadNote(id, resource, resourceId);
	return getQueryData<Note>(queryKey, queryFn);
}
