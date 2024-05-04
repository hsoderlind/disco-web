import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { Master } from "../Master";

export const useFindMaster = (masterId: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [Master.ENDPOINT, shopId, masterId];
	const queryFn = () => Master.find(masterId, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
