import { useQuery } from "@tanstack/react-query";
import Shop from "../Shop";
import { useShopStore } from "../store";

export const useGetShop = (id: number) => {
	const update = useShopStore(state => state.update);
	const queryKey = [Shop.GET_SHOP_URI, id] as const;
	const queryFn = async () => {
		const shop = await Shop.get(id);
		
		update(shop.toJSON());
		
		return shop;
	};

	const query = useQuery(queryKey, queryFn);

	return query;
}
