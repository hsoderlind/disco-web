import { useMemo, useState } from 'react';
import { ErrorBoundary } from '../../components/error-boundary';
import { useListProductStock } from '../../services/product-stock/hooks/useListProductStock';
import { DataGrid, DataGridProps } from '../../components/data-grid/DataGrid';
import { ProductStockType, UpdateProductStockSchema } from '../../services/product-stock/types';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { Num } from '../../lib/number/Num';
import { CellRendererProps } from '../../components/data-grid/types';
import { File } from '../../services/file/File';
import { useShopStore } from '../../services/shop/store';
import { ProductImageType } from '../../services/product-image/types';
import { FileType } from '../../services/file/types';
import { Button, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { EditStock } from './edit';

export { ErrorBoundary };

export function Component() {
	const [selectedStock, setSelectedStock] = useState<ProductStockType | null>(null);
	const shopId = useShopStore((state) => state.shop.id);
	const { data: productStocks, refetch } = useListProductStock();

	const columnDefs = useMemo<DataGridProps<ProductStockType>['columnDefs']>(
		() => [
			{
				field: 'product.item_number',
				headerName: 'Art.nr',
				maxWidth: 100
			},
			{
				colId: 'cover_image',
				headerName: '',
				cellRenderer: (props: CellRendererProps<ProductStockType, never>) => {
					if (!props.data.product.images) {
						return null;
					} else if (!(props.data.product.images as ProductImageType[])[0]) {
						return null;
					}

					const file = new File((props.data.product.images as ProductImageType[])[0].meta as FileType, shopId);
					return <img src={file.getPublicDownloadUrl()} alt={props.data.product.name} style={{ maxHeight: '50px' }} />;
				},
				maxWidth: 100
			},
			{
				field: 'product.name',
				headerName: 'Produkt',
				minWidth: 350
			},
			{
				field: 'product.reference',
				headerName: 'Referens'
			},
			//{} // Supplier name (ProductStock has a relationship with Supplier on ProductStock::supplier())
			{
				field: 'available_quantity',
				headerName: 'Disponibelt antal',
				valueFormatter: (params) => Num.decimal(params.value),
				type: 'rightAligned'
			},
			{
				field: 'reserved_quantity',
				headerName: 'Reserverat antal',
				valueFormatter: (params) => Num.decimal(params.value),
				type: 'rightAligned'
			},
			{
				field: 'sold_quantity',
				headerName: 'Sålt antal',
				valueFormatter: (params) => Num.decimal(params.value),
				type: 'rightAligned'
			},
			{
				colId: 'actions',
				headerName: '',
				cellRenderer: (props: CellRendererProps<ProductStockType, never>) => {
					return (
						<Tooltip title='Redigera'>
							<Button icon={<EditOutlined />} onClick={() => setSelectedStock(props.data)} />
						</Tooltip>
					);
				},
				type: 'rightAligned',
				maxWidth: 80
			}
		],
		[]
	);

	const rowData = productStocks?.toJSON();

	const handleCancel = () => setSelectedStock(null);

	const handleUpdated = () => {
		setSelectedStock(null);
		refetch();
	};

	return (
		<>
			<ContentLayout>
				<MainContentLayout noSpacing>
					<DataGrid columnDefs={columnDefs} rowData={rowData} />
				</MainContentLayout>
			</ContentLayout>
			<EditStock
				open={!!selectedStock}
				onCancel={handleCancel}
				onUpdated={handleUpdated}
				stock={selectedStock as UpdateProductStockSchema}
			/>
		</>
	);
}
