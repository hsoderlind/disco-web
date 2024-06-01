import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryGetOrderTotalRepository } from "../queries";

export const useGetOrderTotal = (name: string) => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryGetOrderTotalRepository(name, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
