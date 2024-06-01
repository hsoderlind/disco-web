import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { OrderTotalRepositoryCollection } from "../OrderTotalRepositoryCollection";

export const useListOrderTotals = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [OrderTotalRepositoryCollection.ENDPOINT, shopId];
	const queryFn = () => OrderTotalRepositoryCollection.list(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
