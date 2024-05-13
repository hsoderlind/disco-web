import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { getLoadCustomersConfig } from "../queries"

export const useGetCustomers = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = getLoadCustomersConfig(shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
