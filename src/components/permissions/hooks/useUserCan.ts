import { useCallback } from "react";
import { UseUserCan } from "../can/types";
import { can } from "../can/can";

export const useUserCan: UseUserCan = (permission, throwException = true) => {
	const _can = useCallback(() => can(permission, throwException), [permission, throwException]);
	const granted = _can();

	return granted;
}
