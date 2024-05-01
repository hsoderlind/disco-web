import { ExtractObjectStructure } from './../../types/common';
import { TabsProps } from "antd";

export type Tab = {
	key: ExtractObjectStructure<TabsProps['items']>['key'];
	label: ExtractObjectStructure<TabsProps['items']>['label'];
	icon?: ExtractObjectStructure<TabsProps['items']>['icon'];
	url: string;
};

export type TabStore = {
	tabs: Tab[];
	add: (tab: Tab) => void;
	remove: (tab: Tab) => void;
	move: (fromIndex: number, toIndex: number) => void;
}
