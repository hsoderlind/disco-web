import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { Search } from "../Search";
import { SearchSchema } from "../types";

export const useSearch = (criteria: SearchSchema | null, queryEnabled = true) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [Search.ENDPOINT, shopId];
	const queryFn = () => Search.find(criteria!, shopId);
	const query = useQuery(queryKey, queryFn, {enabled: queryEnabled});
	return query;
}
