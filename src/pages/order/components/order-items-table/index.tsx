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

export const OrderItemsTable = ({ items, update, remove, readonly = false, minRows = 3 }: OrderItemsTableProps) => {
	const handleDeleteClick = useCallback(
		(model: OrderItemSchema) => {
			if (typeof items === 'undefined') {
				return;
			}

			const index = items.findIndex((item) => item.product_id === model.product_id);

			remove?.(index);
		},
		[items, remove]
	);

	const handleCellEditRequest = useCallback(
		(event: CellEditRequestEvent<OrderItemSchema, number>) => {
			if (typeof items === 'undefined') {
				return;
			}

			const index = items.findIndex((item) => item.product_id === event.data.product_id);
			const newQuantity = +event.newValue!;
			update?.(index, {
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
				field: 'item_number',
				headerName: 'Art.nr',
				maxWidth: 100
			},
			{
				field: 'product_name',
				headerName: 'Benämning',
				minWidth: 300
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
				editable: !readonly,
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
						<Button
							disabled={readonly}
							type='text'
							icon={<DeleteOutlined />}
							onClick={() => handleDeleteClick(props.data)}
						/>
					</Tooltip>
				),
				type: 'rightAligned',
				maxWidth: 80
			}
		],
		[handleDeleteClick, readonly]
	);

	return (
		<DataGrid
			className='mb-input'
			columnDefs={columnDefs}
			rowData={items}
			rowHeight={40}
			containerHeight={`${((items ?? [])?.length > minRows ? (items ?? []).length : minRows) * 54 + 54}px`}
			onCellEditRequest={handleCellEditRequest}
			singleClickEdit
			readOnlyEdit
		/>
	);
};
