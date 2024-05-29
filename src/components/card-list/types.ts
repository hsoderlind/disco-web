import { ReactNode } from "react";
import { AnyArray, ExtractArrayType } from "../../types/common";
import { ColProps, RowProps } from "antd";

export type CardListProps<TDataSource extends AnyArray = AnyArray, TItem = ExtractArrayType<TDataSource>> = {
	loading?: boolean;
	column?: number;
	rowProps?: RowProps;
	colProps?: ColProps;
	dataSource?: TDataSource;
	renderItem: (item: TItem) => ReactNode;
}
