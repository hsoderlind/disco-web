import { AgGridReact } from 'ag-grid-react';
import { CSSProperties, ComponentProps, FC, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import './data-grid.scss';
import { ColDef } from 'ag-grid-community';
import { locale } from './locales/sv';

export type DataGridProps<TData = any> = Omit<
	ComponentProps<typeof AgGridReact<TData>>,
	'defaultColDef' | 'localeText'
> & {
	containerWidth?: CSSProperties['width'];
	containerHeight?: CSSProperties['height'];
	style?: CSSProperties;
};

export const DataGrid: FC<DataGridProps> = ({ style, containerWidth, containerHeight, rowHeight = 50, ...props }) => {
	const width = containerWidth ?? style?.['width'] ?? 'auto';
	const height = containerHeight ?? style?.['height'] ?? '100%';

	const defaultColDef = useMemo<ColDef>(() => {
		return {
			flex: 1
		};
	}, []);

	return (
		<div className='ag-theme-material-auto-dark data-grid' style={{ ...style, width, height }}>
			<AgGridReact {...props} defaultColDef={defaultColDef} rowHeight={rowHeight} localeText={locale} />
		</div>
	);
};
