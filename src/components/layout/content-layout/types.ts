import { ReactNode } from "react";
import { ReactCommonProps } from "../../../types/common";

export type CommonContentLayoutProps = {
	children: ReactCommonProps['children'];
};

export type ContentLayoutProps = CommonContentLayoutProps;

export type MainContentLayoutProps = {
	renderButtonBar?: ReactNode | (() => ReactNode);
	noSpacing?: boolean;
} & CommonContentLayoutProps;

export type SidebarContentLayoutProps = {
	enableShrink?: boolean;
	children: ReactNode | ((shrinked: boolean) => ReactNode);
};
