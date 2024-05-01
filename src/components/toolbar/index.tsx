import { FC } from 'react';
import { ToolbarProps } from './types';
import classes from './toolbar.module.scss';

export const Toolbar: FC<ToolbarProps> = ({ children }) => {
	return <div className={classes['toolbar']}>{children}</div>;
};
