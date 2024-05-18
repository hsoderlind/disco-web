import { useShopStore } from "../shop/store";
import { Note } from "./Note";
import { NoteCollection } from "./NoteCollection";

export const queryListNotes = (resource: string, resourceId: number) => {
	const shopId = useShopStore.getState().shop.id;
	const queryKey = [NoteCollection.ENDPOINT, shopId, resource, resourceId] as const;
	const queryFn = () => NoteCollection.list(resource, resourceId, shopId);

	return [queryKey, queryFn] as const;
}

export const queryLoadNote = (id: number, resource: string, resourceId: number) => {
	const shopId = useShopStore.getState().shop.id;
	const endpoint = (new Note({}, resource, resourceId, shopId)).getEndpoint('read');
	const queryKey = [endpoint, resource, resourceId, id, shopId];
	const queryFn = () => Note.find(id, resource, resourceId, shopId);

	return [queryKey, queryFn] as const;
}
