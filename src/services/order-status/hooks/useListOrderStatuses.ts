import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryListOrderStatuses } from "../queries";

export const useListOrderStatuses = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryListOrderStatuses(shopId);

	return useQuery(queryKey, queryFn);
}
