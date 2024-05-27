import { ReactNode } from "react";

export type CanProps = {
	permission: string;
	renderDecline?: ReactNode;
	children: ReactNode;
	throwException?: boolean;
}

export type Can = (permission: string, throwException?: boolean) => boolean;

export type UseUserCan = Can;
