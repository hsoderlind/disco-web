import { FC } from 'react';
import { ReactCommonProps } from '../../types/common';
import classes from './floating-buttonbar.module.scss';

export type FloatingButtonBarProps = {
	children: ReactCommonProps['children'];
};

export const FloatingButtonBar: FC<FloatingButtonBarProps> = ({ children }) => {
	return <div className={classes['buttonbar']}>{children}</div>;
};
