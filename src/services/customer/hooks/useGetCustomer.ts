import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { getLoadCustomerConfig } from "../queries";

export const useGetCustomer = (id: number) => {
	const shopId = useShopStore(state => state.shop?.id);
	const [queryKey, queryFn] = getLoadCustomerConfig(id, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
