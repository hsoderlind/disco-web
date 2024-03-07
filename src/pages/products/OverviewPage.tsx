import { FC, useState } from 'react';
import { useGetProducts } from '../../services/product/hooks/useGetProducts';
import { useQuery } from '@tanstack/react-query';
import { GridOptions } from 'ag-grid-community';
import { ProductType } from '../../services/product/types';
import { DataGrid } from '../../components/data-grid/DataGrid';
import { Button, Row, Col, FloatButton } from 'antd';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { useShopStore } from '../../services/shop/store';
import { useNavigate } from 'react-router-dom';

export const OverviewPage: FC = () => {
	const navigate = useNavigate();
	const shopId = useShopStore((state) => state.shop.id);
	const [queryKey, queryFn] = useGetProducts(shopId);
	const { data, isSuccess, isLoading } = useQuery(queryKey, queryFn);
	const rowData = isSuccess ? data?.toJSON() : isLoading ? undefined : [];

	const [columnDefs] = useState<GridOptions<ProductType>['columnDefs']>([
		{
			field: 'name',
			headerName: 'Namn',
			filter: true
		},
		{
			field: 'price',
			headerName: 'Pris',
			filter: true
		},
		{
			colId: 'actions',
			cellRenderer: () => {
				return <Button shape='circle' icon={<ArrowRightOutlined />} />;
			}
		}
	]);

	const goToNewProductPage = () => {
		navigate('./new');
	};

	return (
		<>
			<Row gutter={24}>
				<Col span={24}></Col>
				<Col span={24}>
					<DataGrid containerWidth={'100%'} containerHeight={'500px'} columnDefs={columnDefs} rowData={rowData} />
				</Col>
			</Row>
			<FloatButton icon={<PlusOutlined />} type='primary' tooltip='Ny produkt' onClick={goToNewProductPage} />
		</>
	);
};
