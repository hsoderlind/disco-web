export type CellRendererProps<TData extends object, TValue> = {
	data: TData;
	value: TValue;
}

export type ArrayCellRendererProps<TData extends object, TValue extends any[]> = {
	data: TData;
	value: TValue;
}
