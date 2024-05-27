import { useMutation } from "@tanstack/react-query";
import { ServerValidationError } from "../../../lib/error/types";
import { UseMutationOptions } from "../../../types/common";
import { useShopStore } from "../../shop/store"
import { PermissionCollection } from "../PermissionCollection";
import { SyncPermissionsWithRoleSchema } from "../types";

export const useSyncWithRoles = (options?: UseMutationOptions<PermissionCollection, ServerValidationError, SyncPermissionsWithRoleSchema>) => {
	const shopId = useShopStore(state => state.shop.id);
	const mutationFn = (formValues: SyncPermissionsWithRoleSchema) => PermissionCollection.syncWithRole(formValues, shopId);

	const mutation = useMutation(mutationFn, options);

	return mutation;
}
