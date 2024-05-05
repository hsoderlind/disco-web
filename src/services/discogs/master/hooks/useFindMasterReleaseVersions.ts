import { MasterReleaseVersionsSchema } from './../types';
import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../../shop/store"
import { ReleaseVersions } from "../ReleaseVersions";

export const useFindMasterReleaseVersions = (fields: Partial<MasterReleaseVersionsSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [ReleaseVersions.ENDPOINT, shopId, [fields]];
	const queryFn = () => ReleaseVersions.find(fields, shopId);
	const query = useQuery(queryKey, queryFn);

	return query;
}
