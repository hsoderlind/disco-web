import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryLoadOrderStatus } from "../queries";

export const useLoadOrderStatus = (id: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryLoadOrderStatus(id, shopId);

	return useQuery(queryKey, queryFn);
}
