import { useState } from 'react';
import { useFindMasterReleaseVersions } from '../../../../../services/discogs/master/hooks/useFindMasterReleaseVersions';
import { ReleaseVersionsProps } from './types';
import { ColDef } from 'ag-grid-community';
import { MasterReleaseVersionsResultSchema } from '../../../../../services/discogs/master/types';
import { CellRendererProps } from '../../../../../components/data-grid/types';
import { WithTooltip } from '../../../../../components/data-grid/components/WithTooltip';
import { ArrayCellRenderer } from '../../../../../components/data-grid/components/ArrayCellRenderer';
import { DataGrid } from '../../../../../components/data-grid/DataGrid';

export const ReleaseVersions = ({ masterId }: ReleaseVersionsProps) => {
	const { data: releaseVersions, isFetching, isSuccess } = useFindMasterReleaseVersions(masterId);
	const [columnDefs] = useState<ColDef<MasterReleaseVersionsResultSchema>[]>([
		{
			field: 'thumb',
			headerName: '',
			filter: false,
			cellRenderer: (props: CellRendererProps<MasterReleaseVersionsResultSchema, string>) => {
				return <img src={props.value} alt={props.data.title} />;
			}
		},
		{
			field: 'title',
			headerName: 'Benämning',
			filter: true,
			flex: 2,
			cellRenderer: WithTooltip<MasterReleaseVersionsResultSchema>
		},
		{
			field: 'format',
			headerName: 'Format',
			filter: true,
			flex: 2,
			cellRenderer: ArrayCellRenderer<MasterReleaseVersionsResultSchema, string[]>
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
		}
	]);

	const rowData = isSuccess
		? releaseVersions
				?.getCollection()
				.getItems()
				.map((model) => model.toJSON())
		: isFetching
		? undefined
		: [];

	return (
		<>
			<h3 className='h3'>Versioner</h3>
			<DataGrid
				containerHeight={'100%'}
				containerWidth={'100%'}
				columnDefs={columnDefs}
				rowData={rowData}
				rowHeight={130}
			/>
		</>
	);
};
