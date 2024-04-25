import { FC } from 'react';
import { ReactCommonProps } from '../../../types/common';
import classes from './buttonbar.module.scss';
import clsx from 'clsx';

export type ButtonBarProps = {
	children: ReactCommonProps['children'];
	size?: 'default' | 'narrow';
	buttonsPlacement?: 'start' | 'end';
};

export const ButtonBar: FC<ButtonBarProps> = ({ children, size = 'default', buttonsPlacement = 'start' }) => {
	return (
		<div
			className={clsx(classes['buttonbar'], {
				[classes['buttonbar--narrow']]: size === 'narrow',
				[classes['buttonbar--items-end']]: buttonsPlacement === 'end'
			})}>
			{children}
		</div>
	);
};
