import { useShopStore } from "../shop/store";
import { NoteCollection } from "./NoteCollection";

export const queryListNotes = (resource: string, resourceId: number) => {
	const shopId = useShopStore.getState().shop.id;
	const queryKey = [NoteCollection.ENDPOINT, shopId, resource, resourceId] as const;
	const queryFn = () => NoteCollection.list(resource, resourceId, shopId);

	return [queryKey, queryFn] as const;
}
