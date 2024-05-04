import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { ReleaseVersions } from "../ReleaseVersions";

export const useFindMasterReleaseVersions = (masterId: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ReleaseVersions.ENDPOINT, shopId, masterId];
	const queryFn = () => ReleaseVersions.find(masterId, shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
