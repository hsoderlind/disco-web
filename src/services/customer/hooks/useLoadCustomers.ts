import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { getLoadCustomersConfig } from "../queries";

export const useLoadCustomers = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = getLoadCustomersConfig(shopId);

	return useQuery(queryKey, queryFn);
}
