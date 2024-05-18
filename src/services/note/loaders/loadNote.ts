import { getQueryData } from "../../../lib/loading/getQueryData";
import { useShopStore } from "../../shop/store"
import { Note } from "../Note";

export const loadNote = (id: number, resource: string, resourceId: number) => {
	const shopId = useShopStore.getState().shop.id;
	const queryKey = [Note.ENDPOINT, resource, resourceId, id, shopId];
	const queryFn = () => Note.find(id, resource, resourceId, shopId);

	return getQueryData(queryKey, queryFn);
}
