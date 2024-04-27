import { getShopByUrlAlias } from "../queries"

export const useGetShopByUrlAlias = (urlAlias: string) => {
	return getShopByUrlAlias(urlAlias);
}
