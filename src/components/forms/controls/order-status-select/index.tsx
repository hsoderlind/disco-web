import { forwardRef, useMemo } from 'react';
import { OrderStatusSelectProps, OrderStatusSelectRef } from './types';
import { useListOrderStatuses } from '../../../../services/order-status/hooks/useListOrderStatuses';
import { Select, SelectProps } from 'antd';

export const OrderStatusSelect = forwardRef<OrderStatusSelectRef, OrderStatusSelectProps>((props, ref) => {
	const { data: orderStatuses, isFetching, isLoading } = useListOrderStatuses();

	const options = useMemo<SelectProps['options']>(
		() => orderStatuses?.getItems().map((item) => ({ value: item.getKey(), label: item.get<string>('name') })),
		[orderStatuses]
	);

	return (
		<Select
			ref={ref}
			{...props}
			showSearch
			loading={isFetching || isLoading}
			optionFilterProp='label'
			options={options}
		/>
	);
});
