import { ReactNode } from "react";
import { ReactCommonProps } from "../../../types/common";

export type CommonContentLayoutProps = {
	children: ReactCommonProps['children'];
};

export type ContentLayoutProps = CommonContentLayoutProps;

export type MainContentLayoutProps = CommonContentLayoutProps;

export type SidebarContentLayoutProps = {
	disableShrink?: boolean;
	children: ReactNode | ((shrinked: boolean) => ReactNode);
};
