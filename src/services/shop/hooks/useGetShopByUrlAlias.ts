import Shop from "../Shop"

export const useGetShopByUrlAlias = (urlAlias: string) => {
	const queryKey = [Shop.GET_SHOP_URI, urlAlias] as const;
	const queryFn = async () => await Shop.getByUrlAlias(urlAlias);

	return [queryKey, queryFn] as const;
}
