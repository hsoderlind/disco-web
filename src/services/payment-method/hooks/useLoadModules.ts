import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { PaymentMethodModuleCollection } from "../PaymentMethodModuleCollection";

export const useLoadModules = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [PaymentMethodModuleCollection.ENDPOINT, shopId];
	const queryFn = () => PaymentMethodModuleCollection.loadModules(shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
