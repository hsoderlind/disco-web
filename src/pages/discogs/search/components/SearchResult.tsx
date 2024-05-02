import { Empty } from 'antd';
import { useSearch } from '../../../../services/discogs/search/hooks/useSearch';
import { SearchResultProps } from './types';
import { useState } from 'react';
import { ColDef, GridOptions } from 'ag-grid-community';
import { SearchResultSchema } from '../../../../services/discogs/search/types';
import { DataGrid } from '../../../../components/data-grid/DataGrid';
import { ArrayCellRenderer } from '../../../../components/data-grid/components/ArrayCellRenderer';

type CellRendererProps<T> = {
	value: T;
	data: SearchResultSchema;
};

export const SearchResult = ({ searchCriteria }: SearchResultProps) => {
	searchCriteria = { query: 'Springsteen' };
	const { data, isLoading, isFetching, isSuccess } = useSearch(searchCriteria, !!searchCriteria);
	const [columnDefs] = useState<ColDef<SearchResultSchema>[]>([
		{
			field: 'cover_image',
			headerName: '',
			filter: false,
			cellRenderer: (props: CellRendererProps<string>) => {
				return <img src={props.value} alt={props.data.title} />;
			}
		},
		{
			field: 'title',
			headerName: 'Benämning',
			filter: true,
			flex: 2
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
		}
	]);

	const rowData = isSuccess
		? data
				?.getCollection()
				.filter((model) => model.get('type') === 'release' || model.get('type') === 'master')
				.map((model) => model.toJSON())
		: isFetching
		? undefined
		: [];

	return <DataGrid containerHeight={'calc(100% - 64px)'} columnDefs={columnDefs} rowData={rowData} rowHeight={112} />;
};
