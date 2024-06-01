import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { OrderTotalModuleCollection } from "../OrderTotalModuleCollection";

export const useListOrderTotalModules = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [OrderTotalModuleCollection.ENDPOINT, shopId];
	const queryFn = () => OrderTotalModuleCollection.list(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
