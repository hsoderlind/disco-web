import { Children, FC, LabelHTMLAttributes, cloneElement, isValidElement } from 'react';
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
			{Children.map(
				children,
				//@ts-expect-error ID may not be a valid HTML attribute
				(child) => isValidElement(child) && cloneElement(child, { id: htmlFor })
			)}
		</div>
	);
};
