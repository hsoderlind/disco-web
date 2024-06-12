import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { queryListShippingMethods } from "../queries";

export const useListShippingMethods = () => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryListShippingMethods(shopId);

	return useQuery(queryKey, queryFn);
}
