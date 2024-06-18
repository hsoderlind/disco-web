import { useMemo } from 'react';
import { ErrorBoundary } from '../../components/error-boundary';
import { useListOrders } from '../../services/order/hooks/useListOrders';
import { OrderType } from '../../services/order/types';
import { DataGrid, DataGridProps } from '../../components/data-grid/DataGrid';
import { ContentLayout } from '../../components/layout/content-layout/ContentLayout';
import { MainContentLayout } from '../../components/layout/content-layout/MainContentLayout';
import { ColDef } from 'ag-grid-community';
import { Dayjs } from 'dayjs';
import { Currency } from '../../lib/number/Currency';
import { CellRendererProps } from '../../components/data-grid/types';
import { Button, Tooltip } from 'antd';
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from '../../hooks/useNavigate';
import { ButtonBar } from '../../components/forms/buttonbar';

export { ErrorBoundary };

export function Component() {
	const navigate = useNavigate();
	const { data: orders } = useListOrders();

	const handleViewMore = (model: OrderType) => () => navigate(`./${model.id}`, `Beställning ${model.order_number}`);

	const handleNewOrder = () => navigate('./create', 'Ny beställning');

	const columnDefs = useMemo<DataGridProps<OrderType>['columnDefs']>(
		() => [
			{
				field: 'order_number',
				headerName: 'Ordernr'
			},
			{
				field: 'customer.name',
				headerName: 'Kund'
			},
			{
				field: 'payment.title',
				headerName: 'Betalsätt'
			},
			{
				colId: 'total',
				headerName: 'Summa',
				valueFormatter: (params) =>
					Currency.format(params.data?.totals.find((total) => total.name === 'total')?.value ?? 0),
				type: 'rightAligned'
			},
			{
				field: 'current_status.new_status.name',
				headerName: 'Status'
			},
			{
				field: 'created_at',
				headerName: 'Datum',
				valueFormatter: (params) => params.value?.format('L LT')
			} as ColDef<OrderType, Dayjs>,
			{
				colId: 'actions',
				headerName: '',
				cellRenderer: (props: CellRendererProps<OrderType, never>) => {
					return (
						<Tooltip title='Mer information'>
							<Button icon={<EyeOutlined />} onClick={handleViewMore(props.data)} />
						</Tooltip>
					);
				},
				maxWidth: 80,
				type: 'rightAligned'
			}
		],
		[]
	);

	const rowData = orders?.toJSON();

	return (
		<ContentLayout>
			<MainContentLayout
				noSpacing
				renderButtonBar={
					<ButtonBar buttonsPlacement='end'>
						<Button icon={<PlusOutlined />} onClick={handleNewOrder}>
							Ny beställning
						</Button>
					</ButtonBar>
				}>
				<DataGrid columnDefs={columnDefs} rowData={rowData} />
			</MainContentLayout>
		</ContentLayout>
	);
}
