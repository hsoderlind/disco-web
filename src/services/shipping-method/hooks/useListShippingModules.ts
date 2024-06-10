import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { ShippingModuleCollection } from "../ShippingModuleCollection";

export const useListShippingModules = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ShippingModuleCollection.ENDPOINT, shopId];
	const queryFn = () => ShippingModuleCollection.list(shopId);

	return useQuery(queryKey, queryFn);
}
