import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { NoteCollection } from "../NoteCollection";

export const useListNotes = (resource: string, resourceId: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [NoteCollection.ENDPOINT, shopId, resource, resourceId];
	const queryFn = () => NoteCollection.list(resource, resourceId, shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
