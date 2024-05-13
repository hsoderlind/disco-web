import { MenuProps } from "antd";

export type CellRendererProps<TData extends object, TValue> = {
	data: TData;
	value: TValue;
}

export type ArrayCellRendererProps<TData extends object, TValue extends any[]> = {
	data: TData;
	value: TValue;
}

export type HandleDropdownClick<TData extends object = object> = (model: TData) => MenuProps['onClick'];
