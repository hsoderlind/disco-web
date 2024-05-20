import { ReactNode } from "react";
import { ReactCommonProps } from "../../../types/common";

export type CommonContentLayoutProps = {
	children: ReactCommonProps['children'];
};

export type ContentLayoutProps = CommonContentLayoutProps;

export type MainContentLayoutProps = {
	className?: string;
	noSpacing?: boolean;
	renderToolbarExtraContent?: ReactNode;
	renderButtonBar?: ReactNode | (() => ReactNode);
	title?: ReactNode;
} & CommonContentLayoutProps;

export type SidebarContentLayoutProps = {
	enableShrink?: boolean;
	children: ReactNode | ((shrinked: boolean) => ReactNode);
};
