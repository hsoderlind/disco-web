import { Tooltip } from 'antd';
import { CellRendererProps } from '../types';

export const WithTooltip = <TData extends object>(props: CellRendererProps<TData, string>) => {
	return (
		<Tooltip title={props.value} placement='topLeft'>
			{props.value}
		</Tooltip>
	);
};
