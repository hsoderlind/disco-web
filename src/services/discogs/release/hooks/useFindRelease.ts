import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { getFindReleaseQueryConfig } from "../queries/getFindReleaseQueryConfig";

export const useFindRelease = (releaseId?: number) => {
	const shopId = useShopStore(state => state.shop?.id);
	const [queryKey, queryFn] = getFindReleaseQueryConfig(releaseId!, shopId);
	const query = useQuery(queryKey, queryFn, {enabled: !!releaseId})

	return query;
}
