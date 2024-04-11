import { FC } from 'react';
import { ReactCommonProps } from '../../types/common';
import { createPortal } from 'react-dom';

export type FloatingButtonBarProps = {
	children: ReactCommonProps['children'];
};

export const FloatingButtonBar: FC<FloatingButtonBarProps> = ({ children }) => {
	return createPortal(<div className='buttonbar'>{children}</div>, document.body);
};
