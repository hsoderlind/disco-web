import Shop from "./Shop"
import { ShopUserCollection } from "./ShopUserCollection";

export const getShopByUrlAlias = (urlAlias: string) => {
	const queryKey = [Shop.GET_SHOP_URI, urlAlias] as const;
	const queryFn = async () => Shop.getByUrlAlias(urlAlias);

	return [queryKey, queryFn] as const;
}

export const queryListShopUsers = (shopId: number) => {
	const queryKey = [ShopUserCollection.ENDPOINT, shopId] as const;
	const queryFn = () => ShopUserCollection.list(shopId);

	return [queryKey, queryFn] as const;
}
