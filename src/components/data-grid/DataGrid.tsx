import { AgGridReact } from 'ag-grid-react';
import { CSSProperties, ComponentProps, FC } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export type DataGridProps<TData = any> = ComponentProps<typeof AgGridReact<TData>> & {
	containerWidth: CSSProperties['width'];
	containerHeight: CSSProperties['height'];
};

export const DataGrid: FC<DataGridProps> = ({ containerWidth = '100%', containerHeight = '100%', ...props }) => {
	return (
		<div className='ag-grid-material' style={{ width: containerWidth, height: containerHeight }}>
			<AgGridReact {...props} />
		</div>
	);
};
