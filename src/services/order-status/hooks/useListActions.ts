import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { ActionRepositoryCollection } from "../ActionRepositoryCollection";

export const useListActions = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ActionRepositoryCollection.ENDPOINT, shopId];
	const queryFn = () => ActionRepositoryCollection.list(shopId);

	return useQuery(queryKey, queryFn);
}
