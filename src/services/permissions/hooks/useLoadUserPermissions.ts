import { useQuery } from "@tanstack/react-query";
import { useUserPermissionsStore } from "../user-permissions-store";
import { PermissionCollection } from "../PermissionCollection";
import { UseQueryOptions } from "../../../types/common";

export const useLoadUserPermissions = (shopId: number, options?: UseQueryOptions<PermissionCollection>) => {
	const update = useUserPermissionsStore(state => state.update);
	const queryKey = [`${PermissionCollection.ENDPOINT}/user`, shopId];
	const queryFn = async () => {
		const permissions = await PermissionCollection.listUserPermissions(shopId);
		update(permissions);

		return permissions;
	}

	const query = useQuery(queryKey, queryFn, options);

	return query;
}
