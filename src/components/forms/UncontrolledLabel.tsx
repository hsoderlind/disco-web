import { FC, LabelHTMLAttributes } from 'react';
import { ReactCommonProps } from '../../types/common';

export type UncontrolledLabelProps = {
	htmlFor?: LabelHTMLAttributes<HTMLLabelElement>['htmlFor'];
	children: ReactCommonProps['children'];
	label: string;
};

export const UncontrolledLabel: FC<UncontrolledLabelProps> = ({ htmlFor, children, label }) => {
	return (
		<div className='ant-row ant-form-item-row'>
			<div className='ant-col ant-form-item-label'>
				<label htmlFor={htmlFor} title={label}>
					{label}
				</label>
			</div>
			{children}
		</div>
	);
};
