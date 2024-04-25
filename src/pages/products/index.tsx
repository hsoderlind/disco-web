import { useState } from 'react';
import { useGetProducts } from '../../services/product/hooks/useGetProducts';
import { useQuery } from '@tanstack/react-query';
import { GridOptions } from 'ag-grid-community';
import { ProductType } from '../../services/product/types';
import { DataGrid } from '../../components/data-grid/DataGrid';
import { Button } from 'antd';
import { ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';
import { useShopStore } from '../../services/shop/store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { SidebarContentLayout } from '../../components/layout/content-layout/SidebarContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { CategoryMenu } from '../../components/category-menu/CategoryMenu';
import { Currency } from '../../lib/number/Currency';
import { ButtonBar } from '../../components/forms/buttonbar';

export function Component() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const shopId = useShopStore((state) => state.shop.id);
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const [queryKey, queryFn] = useGetProducts(shopId, category);
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
			filter: true,
			valueFormatter: (params) => Currency.format(params.value)
		},
		{
			colId: 'actions',
			cellRenderer: () => {
				return <Button shape='circle' icon={<ArrowRightOutlined />} />;
			},
			type: 'rightAligned'
		}
	]);

	const goToNewProductPage = () => {
		navigate(`./new?section=description&category=${category}`);
	};

	return (
		<>
			<ContentLayout>
				<SidebarContentLayout enableShrink={false}>
					<CategoryMenu />
				</SidebarContentLayout>
				<MainContentLayout
					renderButtonBar={
						<ButtonBar buttonsPlacement='end' size='narrow'>
							<Button icon={<PlusOutlined />} type='link' size='large' onClick={goToNewProductPage}>
								Ny produkt
							</Button>
						</ButtonBar>
					}>
					<DataGrid
						containerHeight={'100%'}
						containerWidth={'100%'}
						columnDefs={columnDefs}
						rowData={rowData}
						rowHeight={40}
					/>
				</MainContentLayout>
			</ContentLayout>
		</>
	);
}
