import { forwardRef, useMemo } from 'react';
import { CurrencySelectProps, SelectRef } from './types';
import currencyCodes from 'currency-codes';
import { Select, SelectProps } from 'antd';

export const CurrencySelect = forwardRef<SelectRef, CurrencySelectProps>((props: CurrencySelectProps, ref) => {
	const options: SelectProps['options'] = useMemo(
		() =>
			currencyCodes.codes().map((code) => ({
				value: code,
				label: `${code} - ${currencyCodes.code(code)?.currency}`
			})),
		[]
	);

	return <Select ref={ref} {...props} showSearch optionFilterProp='label' options={options} />;
});
