import { forwardRef, useMemo } from 'react';
import { CountrySelectProps, SelectRef } from './types';
import { Select } from 'antd';
import { countries } from 'countries-list';

export const CountrySelect = forwardRef<SelectRef, CountrySelectProps>((props: CountrySelectProps, ref) => {
	const options = useMemo(
		() =>
			Object.entries(countries).map(([code, data]) => ({
				value: code,
				label: `${code} - ${data.name}`
			})),
		[]
	);

	return <Select ref={ref} {...props} showSearch optionFilterProp='label' options={options} />;
});
