import { AgGridReact } from 'ag-grid-react';
import { CSSProperties, ComponentProps, FC, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { ColDef } from 'ag-grid-community';

export type DataGridProps<TData = any> = Omit<ComponentProps<typeof AgGridReact<TData>>, 'defaultColDef'> & {
	containerWidth?: CSSProperties['width'];
	containerHeight?: CSSProperties['height'];
	style?: CSSProperties;
};

export const DataGrid: FC<DataGridProps> = ({ style, containerWidth, containerHeight, ...props }) => {
	const width = containerWidth ?? style?.['width'];
	const height = containerHeight ?? style?.['height'];

	const defaultColDef = useMemo<ColDef>(() => {
		return {
			flex: 1
		};
	}, []);

	return (
		<div className='ag-theme-material' style={{ ...style, width, height }}>
			<AgGridReact {...props} defaultColDef={defaultColDef} />
		</div>
	);
};
