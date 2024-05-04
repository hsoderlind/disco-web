import { useState } from 'react';
import { RecordGridProps } from './types';
import { CellRendererProps } from '../../../../components/data-grid/types';
import { SearchResultSchema } from '../../../../services/discogs/search/types';
import { ColDef } from 'ag-grid-community';
import { WithTooltip } from '../../../../components/data-grid/components/WithTooltip';
import { ArrayCellRenderer } from '../../../../components/data-grid/components/ArrayCellRenderer';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { DataGrid } from '../../../../components/data-grid/DataGrid';
import { useNavigation } from '../../../../hooks/useNavigation';

type HndleDropdownClick = (model: SearchResultSchema) => MenuProps['onClick'];

export const RecordGrid = ({ isLoading, isSuccess, searchResult }: RecordGridProps) => {
	const navigate = useNavigation();

	const handleDropdownClick: HndleDropdownClick = (data) => (event) => {
		switch (event.key) {
			case 'more-info':
				navigate(`../${data.type}/${data.id}`, data.title!);
		}
	};
	const [columnDefs] = useState<ColDef<SearchResultSchema>[]>([
		{
			field: 'cover_image',
			headerName: '',
			filter: false,
			cellRenderer: (props: CellRendererProps<SearchResultSchema, string>) => {
				return <img src={props.value} alt={props.data.title} />;
			}
		},
		{
			field: 'title',
			headerName: 'Benämning',
			filter: true,
			flex: 2,
			cellRenderer: WithTooltip<SearchResultSchema>
		},
		{
			field: 'format',
			headerName: 'Format',
			filter: true,
			flex: 2,
			cellRenderer: ArrayCellRenderer<SearchResultSchema, string[]>
		},
		{
			field: 'catno',
			headerName: 'Katalognr',
			filter: true
		},
		{
			field: 'country',
			headerName: 'Land',
			filter: true
		},
		{
			field: 'label',
			headerName: 'Label',
			filter: true,
			flex: 2,
			cellRenderer: ArrayCellRenderer<SearchResultSchema, string[]>
		},
		{
			field: 'genre',
			headerName: 'Genre',
			filter: true,
			flex: 2,
			cellRenderer: ArrayCellRenderer<SearchResultSchema, string[]>
		},
		{
			colId: 'actions',
			cellRenderer: (props: CellRendererProps<SearchResultSchema, never>) => {
				return (
					<Dropdown
						menu={{
							items: [
								{
									key: 'more-info',
									label: 'Mer information'
								},
								{
									key: 'import',
									label: <Tooltip title='Importera artikeln till din produktkatalog'>Importera artikeln</Tooltip>
								}
							],
							onClick: handleDropdownClick(props.data)
						}}>
						<Button type='text' icon={<EllipsisOutlined />} />
					</Dropdown>
				);
			},
			type: 'rightAligned'
		}
	]);

	const rowData = isSuccess
		? searchResult
				?.getCollection()
				.getItems()
				.map((model) => model.toJSON())
		: isLoading
		? undefined
		: [];

	return (
		<DataGrid
			containerHeight={'calc(100% - 64px - 62px - 48px)'}
			containerWidth={'max(1512px, 100%)'}
			columnDefs={columnDefs}
			rowData={rowData}
			rowHeight={112}
		/>
	);
};
