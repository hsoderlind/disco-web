import { useUserPermissionsStore } from "../../../services/permissions/user-permissions-store";
import { PermissionDeniedException } from "../PermissionDeniedException";
import { Can } from "./types";

export const can: Can = (permission, throwException = false) => {
	const permissions = useUserPermissionsStore.getState().permissions;

	if (permissions === null) {
		return false;
	}

	const hasPermission = permissions.search({name: permission}).length > 0;

	if (!hasPermission && throwException === true) {
		throw new PermissionDeniedException(permission);
	}

	return hasPermission;
}
