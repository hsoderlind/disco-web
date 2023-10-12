import Shop from "../Shop";

export const useGetShop = (id: number) => {
	const queryKey = [Shop.GET_SHOP_URI, id] as const;
	const queryFn = async () => await Shop.get(id);

	return [queryKey, queryFn] as const;
}
