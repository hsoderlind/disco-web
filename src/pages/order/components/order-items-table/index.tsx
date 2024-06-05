import { useCallback, useMemo } from 'react';
import { DataGrid, DataGridProps } from '../../../../components/data-grid/DataGrid';
import { OrderItemsTableProps } from './types';
import { OrderItemSchema } from '../../../../services/order/types';
import { Currency } from '../../../../lib/number/Currency';
import { Num } from '../../../../lib/number/Num';
import { CellRendererProps } from '../../../../components/data-grid/types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CellEditRequestEvent } from 'ag-grid-community';

export const OrderItemsTable = ({ items, update, remove }: OrderItemsTableProps) => {
	const handleDeleteClick = useCallback(
		(model: OrderItemSchema) => {
			const index = items.findIndex((item) => item.id === model.id);

			remove(index);
		},
		[items, remove]
	);

	const handleCellEditRequest = useCallback(
		(event: CellEditRequestEvent<OrderItemSchema, number>) => {
			const index = items.findIndex((item) => item.id === event.data.id);
			const newQuantity = event.newValue!;
			update(index, {
				...items[index],
				quantity: newQuantity,
				total: items[index]['price'] * newQuantity
			});
		},
		[update, items]
	);

	const columnDefs = useMemo<DataGridProps<OrderItemSchema>['columnDefs']>(
		() => [
			{
				field: 'product_id',
				headerName: 'ID',
				maxWidth: 65
			},
			{
				field: 'product_name',
				headerName: 'Benämning',
				maxWidth: 300
			},
			{
				field: 'price',
				headerName: 'Pris (ex. moms)',
				valueFormatter: (params) => Currency.format(params.value as number),
				type: 'rightAligned'
			},
			{
				field: 'tax_value',
				headerName: 'Moms',
				maxWidth: 100,
				valueFormatter: (params) => Num.percent(params.value as number),
				type: 'rightAligned'
			},
			{
				colId: 'price_incl_vat',
				headerName: 'Pris (ink. moms)',
				valueFormatter: (params) => Currency.format(params.data!.price + params.data!.vat),
				type: 'rightAligned'
			},
			{
				field: 'quantity',
				headerName: 'Antal',
				maxWidth: 100,
				valueFormatter: (params) => Num.decimal(params.value as number),
				editable: true,
				cellEditor: 'agNumberCellEditor',
				cellEditorParams: {
					showStepperButtons: true
				},
				cellDataType: 'number',
				type: 'rightAligned'
			},
			{
				field: 'total',
				headerName: 'Summa (ex. moms)',
				valueFormatter: (params) => Currency.format(params!.value),
				type: 'rightAligned'
			},
			{
				colId: 'total_incl_vat',
				headerName: 'Summa (ink. moms)',
				valueFormatter: (params) => Currency.format(params.data!.total + params.data!.quantity * params.data!.vat),
				type: 'rightAligned'
			},
			{
				colId: 'actions',
				headerName: '',
				cellRenderer: (props: CellRendererProps<OrderItemSchema, never>) => (
					<Tooltip title='Radera'>
						<Button type='text' icon={<DeleteOutlined />} onClick={() => handleDeleteClick(props.data)} />
					</Tooltip>
				),
				type: 'rightAligned',
				maxWidth: 80
			}
		],
		[]
	);

	return (
		<DataGrid
			className='mb-input'
			columnDefs={columnDefs}
			rowData={items}
			rowHeight={40}
			containerHeight={`${(items?.length > 3 ? items.length : 3) * 54 + 54}px`}
			onCellEditRequest={handleCellEditRequest}
			singleClickEdit
			readOnlyEdit
		/>
	);
};
