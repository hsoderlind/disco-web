import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { ReleaseStats } from "../ReleaseStats";

export const useFindReleaseStats = (releaseId: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ReleaseStats.ENDPOINT, shopId, releaseId];
	const queryFn = () => ReleaseStats.find(releaseId, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
