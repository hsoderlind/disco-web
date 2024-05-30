import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryListPaymentMethods } from "../queries";

export const useListPaymentMethods = (includeInactive = false) => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryListPaymentMethods(shopId, includeInactive);

	const query = useQuery(queryKey, queryFn);

	return query;
}
