import { useCallback, useEffect, useState } from "react";
import { UseUserCan } from "../can/types";
import { can } from "../can/can";

export const useUserCan: UseUserCan = (permission, throwException = true) => {
	const [granted, setGranted] = useState(false);
	const _can = useCallback(() => can(permission, throwException), [permission, throwException]);

	useEffect(() => {
		const _granted = _can();
		setGranted(_granted);
	}, [_can]);

	return granted;
}
