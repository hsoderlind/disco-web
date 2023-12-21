import { FC, useState } from 'react';
import { useGetProducts } from '../../services/product/hooks/useGetProducts';
import { useQuery } from '@tanstack/react-query';
import { GridOptions } from 'ag-grid-community';
import { ProductType } from '../../services/product/types';
import { DataGrid } from '../../components/data-grid/DataGrid';
import { Button, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

export const OverviewPage: FC = () => {
	const [queryKey, queryFn] = useGetProducts();
	const { data, isSuccess, isLoading } = useQuery(queryKey, queryFn);
	const rowData = isSuccess ? data?.toJSON() : isLoading ? undefined : [];

	const [columnDefs] = useState<GridOptions<ProductType>['columnDefs']>([
		{
			field: 'name',
			filter: true
		},
		{
			field: 'price',
			filter: true
		},
		{
			colId: 'actions',
			cellRenderer: () => {
				return <Button shape='circle' icon={<ArrowRightOutlined />} />;
			}
		}
	]);

	return (
		<Row gutter={24}>
			<Col span={24}></Col>
			<Col span={24}>
				<DataGrid containerWidth={'100%'} containerHeight={'500px'} columnDefs={columnDefs} rowData={rowData} />
			</Col>
		</Row>
	);
};
