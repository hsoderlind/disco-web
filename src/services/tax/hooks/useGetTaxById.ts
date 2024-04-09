import { useShopStore } from "../../shop/store"
import { Tax } from "../Tax";

export const useGetTaxById = (id: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [Tax.GET_TAX_URI, id, shopId] as const;
	const queryFn = () => Tax.getById(id, shopId);

	return [queryKey, queryFn] as const;
}
