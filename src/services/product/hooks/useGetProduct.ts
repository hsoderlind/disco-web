import { useShopStore } from "../../shop/store";
import { getProductQuery } from "../queries";

export const useGetProduct = (id: number) => {
	const shopId = useShopStore(state => state.shop.id);
	return getProductQuery(id, shopId);
}
