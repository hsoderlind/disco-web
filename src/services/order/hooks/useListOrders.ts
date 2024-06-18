import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { OrderCollection } from "../OrderCollection";

export const useListOrders = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [OrderCollection.ENDPOINT, shopId];
	const queryFn = () => OrderCollection.list(shopId);

	return useQuery(queryKey, queryFn);
}
