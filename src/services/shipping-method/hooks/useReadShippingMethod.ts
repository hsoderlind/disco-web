import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store";
import { queryReadShippingMethod } from "../queries";

export const useReadShippingMethod = (name: string) => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = queryReadShippingMethod(name, shopId);
	
	return useQuery(queryKey, queryFn);
}
