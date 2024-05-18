import { ReactNode } from "react";
import { ReactCommonProps } from "../../../types/common";

export type CommonContentLayoutProps = {
	children: ReactCommonProps['children'];
};

export type ContentLayoutProps = CommonContentLayoutProps;

export type MainContentLayoutProps = {
	renderToolbarExtraContent?: ReactNode;
	renderButtonBar?: ReactNode | (() => ReactNode);
	noSpacing?: boolean;
	title?: ReactNode;
} & CommonContentLayoutProps;

export type SidebarContentLayoutProps = {
	enableShrink?: boolean;
	children: ReactNode | ((shrinked: boolean) => ReactNode);
};
