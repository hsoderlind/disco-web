import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { ProductStockCollection } from "../ProductStockCollection";

export const useListProductStock = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ProductStockCollection.ENDPOINT, shopId];
	const queryFn = () => ProductStockCollection.list(shopId);

	return useQuery(queryKey, queryFn);
}
