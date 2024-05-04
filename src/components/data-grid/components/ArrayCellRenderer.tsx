import { Tooltip } from 'antd';
import { ArrayCellRendererProps } from '../types';

export const ArrayCellRenderer = <TData extends object, TValue extends any[]>(
	props: ArrayCellRendererProps<TData, TValue>
) => {
	const formattedValue = Array.isArray(props.value) ? props.value.join(', ') : props.value;
	return (
		<Tooltip title={formattedValue} placement='topLeft'>
			{formattedValue}
		</Tooltip>
	);
};
