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
import { ProductStates } from '../../services/product/ProductStates';
import { Num } from '../../lib/number/Num';
import { ProductStockType } from '../../services/product-stock/types';

export function Component() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const shopId = useShopStore((state) => state.shop.id);
	const category = searchParams.has('category') ? parseInt(searchParams.get('category')!) : 0;
	const [queryKey, queryFn] = useGetProducts(shopId, category);
	const { data, isSuccess, isLoading } = useQuery(queryKey, queryFn);
	const rowData = isSuccess ? data?.toJSON() : isLoading ? undefined : [];

	const goToEditProduct = (id: number, name: string) => navigate(`./${id}`, { state: { title: name } });

	const [columnDefs] = useState<GridOptions<ProductType>['columnDefs']>([
		{
			field: 'name',
			headerName: 'Namn',
			filter: true
		},
		{
			field: 'price',
			headerName: 'Pris (exkl. moms)',
			filter: true,
			valueFormatter: (params) => Currency.format(params.value),
			type: 'rightAligned'
		},
		{
			field: 'cost_price',
			headerName: 'Inköpspris',
			filter: true,
			valueFormatter: (params) => Currency.format(params.value),
			type: 'rightAligned'
		},
		{
			field: 'state',
			headerName: 'Status',
			valueFormatter: (params) => (params.value === ProductStates.PUBLISHED ? 'Publicerad' : 'Utkast')
		},
		{
			field: 'stock.disposable_quantity',
			headerName: 'Disponibelt antal',
			valueFormatter: (params) => {
				const hasStock = !!params.data?.stock;
				const approxDisposableQty = (params.data?.stock as ProductStockType)?.approx_disposable_quantity;
				const disposableQty = params.value;
				const qtysDiffers = disposableQty !== approxDisposableQty;
				return !hasStock
					? '-'
					: `${Num.decimal(params.value)}${qtysDiffers ? ` (${Num.decimal(approxDisposableQty)})` : ''}`;
			},
			type: 'rightAligned'
		},
		{
			colId: 'actions',
			cellRenderer: (props: { data: { id: number; name: string } }) => {
				return <Button icon={<ArrowRightOutlined />} onClick={() => goToEditProduct(props.data.id, props.data.name)} />;
			},
			type: 'rightAligned'
		}
	]);

	const goToNewProductPage = () => {
		navigate(`./new?section=description&category=${category}`, { state: { title: 'Ny produkt' } });
	};

	return (
		<>
			<ContentLayout>
				<SidebarContentLayout enableShrink={false}>
					<CategoryMenu />
				</SidebarContentLayout>
				<MainContentLayout
					noSpacing
					renderButtonBar={
						<ButtonBar buttonsPlacement='end' size='narrow'>
							<Button icon={<PlusOutlined />} type='default' size='large' onClick={goToNewProductPage}>
								Ny produkt
							</Button>
						</ButtonBar>
					}>
					<DataGrid containerHeight={'100%'} containerWidth={'100%'} columnDefs={columnDefs} rowData={rowData} />
				</MainContentLayout>
			</ContentLayout>
		</>
	);
}
