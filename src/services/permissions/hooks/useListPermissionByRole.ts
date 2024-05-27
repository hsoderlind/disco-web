import { useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store";
import { PermissionCollection } from "../PermissionCollection";

export const useListPermissionsByRole = (roleId: number | undefined, options?: UseQueryOptions<PermissionCollection, (string | number | undefined)[]>) => {
	const shopId = useShopStore((state) => state.shop.id);
	const queryKey = [PermissionCollection.ENDPOINT, shopId, roleId];
	const queryFn = () => PermissionCollection.listByRole(roleId!, shopId);

	const query = useQuery(queryKey, queryFn, options);

	return query;
}
