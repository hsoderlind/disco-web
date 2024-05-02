import { Tooltip } from 'antd';
import { ArrayCellRendererProps } from '../types';

export const ArrayCellRenderer = <TData extends object, TValue extends any[]>(
	props: ArrayCellRendererProps<TData, TValue>
) => {
	const formattedValue = props.value.join(', ');
	return (
		<div style={{ position: 'relative' }}>
			<Tooltip title={formattedValue} placement='topLeft'>
				<span>{formattedValue}</span>
			</Tooltip>
		</div>
	);
};
