import { useMemo } from 'react';
import { AnyArray, ExtractArrayType } from '../../types/common';
import { CardListProps } from './types';
import { Card, Col, Row } from 'antd';

export const CardList = <TDataSource extends AnyArray = AnyArray, TItem = ExtractArrayType<TDataSource>>({
	renderItem,
	colProps,
	column = 1,
	dataSource,
	loading = false,
	rowProps
}: CardListProps<TDataSource>) => {
	const rows = useMemo(() => {
		if (!dataSource || dataSource.length === 0) {
			return [];
		}

		if (column === 1) {
			return [dataSource];
		}

		const chunks: TItem[][] = [];

		for (let i = 0; i < dataSource.length; i += column) {
			chunks.push(dataSource.slice(i, i + column));
		}

		return chunks as TDataSource[];
	}, [dataSource, column]);

	if (typeof dataSource === 'undefined' && loading) {
		return (
			<Row {...(rowProps ?? {})}>
				<Col {...(colProps ?? { span: 24 })}>
					<Card loading />
				</Col>
			</Row>
		);
	}

	return (
		<>
			{rows.map((cols, rowIndex) => (
				<Row {...(rowProps ?? {})} key={`row-${rowIndex}`}>
					{cols.map((item, colIndex) => (
						<Col {...(colProps ?? { span: 24 / column })} key={`col-${rowIndex}-${colIndex}`}>
							{renderItem(item)}
						</Col>
					))}
				</Row>
			))}
		</>
	);
};
