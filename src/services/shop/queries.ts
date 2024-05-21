import Shop from "./Shop"

export const getShopByUrlAlias = (urlAlias: string) => {
	const queryKey = [Shop.GET_SHOP_URI, urlAlias] as const;
	const queryFn = async () => Shop.getByUrlAlias(urlAlias);

	return [queryKey, queryFn] as const;
}