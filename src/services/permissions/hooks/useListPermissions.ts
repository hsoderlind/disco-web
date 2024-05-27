import { UseQueryOptions } from './../../../types/common';
import { useQuery } from "@tanstack/react-query";
import { useShopStore } from "../../shop/store"
import { PermissionCollection } from "../PermissionCollection";

export const useListPermissions = (options?: UseQueryOptions<PermissionCollection>) => {
	const shopId = useShopStore((state) => state.shop.id);
	const queryKey = [PermissionCollection.ENDPOINT, shopId];
	const queryFn = () => PermissionCollection.list(shopId);

	const query = useQuery(queryKey, queryFn, options);

	return query;
}
