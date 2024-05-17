import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { CreditBalanceCollection } from "../CreditbalanceCollection";

export const useLoadCreditBalanceHistory = (customerId: number) => {
	const shopId = useShopStore((state) => state.shop.id);
	const queryKey = [CreditBalanceCollection.ENDPOINT, customerId, 'history', shopId];
	const queryFn = () => CreditBalanceCollection.getHistory(customerId, shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
