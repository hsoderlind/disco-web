import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { MetadataCollection } from "../MetadataCollection";

export const useListMetadata = (resource: string, resourceId: number) => {
	const shopId = useShopStore(state => state.shop.id);
	const queryKey = [MetadataCollection.ENDPOINT, resource, resourceId, shopId];
	const queryFn = () => MetadataCollection.list(resource, resourceId, shopId);

	const query = useQuery(queryKey, queryFn);

	return query;
}
