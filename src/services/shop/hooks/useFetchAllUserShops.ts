import Shop from "../Shop"

export const useFetchAllUserShops = () => {
	const queryKey = [Shop.GET_SHOP_URI] as const;
	const queryFn = async () => await Shop.fetchAllByUser();

	return [queryKey, queryFn] as const;
}
