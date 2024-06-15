import { forwardRef } from 'react';
import { InputNumberProps, InputNumberRef } from './types';
import { InputNumber as AntdInputNumber } from 'antd';

export const InputNumber = forwardRef<InputNumberRef, InputNumberProps>((props, ref) => {
	return <AntdInputNumber ref={ref} {...props} decimalSeparator=',' />;
});
