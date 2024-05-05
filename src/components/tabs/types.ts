import { ReactNode } from 'react';
import { ExtractObjectStructure } from './../../types/common';
import { TabsProps as AntdTabsProps } from "antd";

export type Tab = {
	key: ExtractObjectStructure<AntdTabsProps['items']>['key'];
	label: ExtractObjectStructure<AntdTabsProps['items']>['label'];
	icon?: ExtractObjectStructure<AntdTabsProps['items']>['icon'];
	url: string;
};

export type TabStore = {
	tabs: Tab[];
	add: (tab: Tab) => void;
	remove: (tab: Tab) => void;
	move: (fromIndex: number, toIndex: number) => void;
}

export type TabsProps = {
	renderExtraContent?: ReactNode
}
