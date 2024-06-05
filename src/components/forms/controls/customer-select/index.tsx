import { forwardRef, useMemo } from 'react';
import { CustomerSelectProps, CustomerSelectRef } from './types';
import { useLoadCustomers } from '../../../../services/customer/hooks/useLoadCustomers';
import Select, { DefaultOptionType } from 'antd/es/select';

export const CustomerSelect = forwardRef<CustomerSelectRef, CustomerSelectProps>((props, ref) => {
	const { data: customers, isFetching, isLoading } = useLoadCustomers();

	const options = useMemo<DefaultOptionType[]>(
		() =>
			typeof customers !== 'undefined'
				? customers.getItems().map((model) => ({
						value: model.getKey()!,
						label: model.get<string>('name')
				  }))
				: [],
		[customers]
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
