import { AgGridReact } from 'ag-grid-react';
import { CSSProperties, ComponentProps, FC } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export type DataGridProps<TData = any> = ComponentProps<typeof AgGridReact<TData>> & {
	containerWidth?: CSSProperties['width'];
	containerHeight?: CSSProperties['height'];
	style?: CSSProperties;
};

export const DataGrid: FC<DataGridProps> = ({ style, containerWidth, containerHeight, ...props }) => {
	const width = containerWidth ?? style?.['width'];
	const height = containerHeight ?? style?.['height'];

	return (
		<div className='ag-grid-material' style={{ ...style, width, height }}>
			<AgGridReact {...props} />
		</div>
	);
};
