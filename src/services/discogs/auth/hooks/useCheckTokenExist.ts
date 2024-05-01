import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { Auth } from "../Auth";

export const useCheckTokenExist = () => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [Auth.CHECK_URL, shopId] as const;
	const queryFn = () => Auth.checkToken(shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
