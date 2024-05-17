import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { getLoadCreditBalanceConfig } from "../queries";

export const useFindCreditBalance = (customerId: number) => {
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = getLoadCreditBalanceConfig(customerId, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
