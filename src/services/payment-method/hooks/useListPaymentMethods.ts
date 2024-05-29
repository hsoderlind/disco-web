import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { PaymentMethodCollection } from "../PaymentMethodCollection";

export const useListPaymentMethods = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [PaymentMethodCollection.ENDPOINT, shopId];
	const queryFn = () => PaymentMethodCollection.list(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
