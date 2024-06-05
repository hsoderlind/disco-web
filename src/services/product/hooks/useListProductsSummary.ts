import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { getListProductsSummaryQuery } from "../queries";
import { Criteria } from "../types";

export const useListProductsSummary = (criteria?: Criteria) => {
	const shopId = useShopStore(state => state.shop.id);
	const [queryKey, queryFn] = getListProductsSummaryQuery(shopId, criteria);

	return useQuery(queryKey, queryFn);
}
