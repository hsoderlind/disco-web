import { FC } from 'react';
import { MainContentLayoutProps } from './types';
import clsx from 'clsx';

export const MainContentLayout: FC<MainContentLayoutProps> = ({ children, renderButtonBar, noSpacing = false }) => {
	return (
		<div className='main-content-layout'>
			<div className={clsx('content', { 'content--no-spacing': noSpacing })}>{children}</div>
			{typeof renderButtonBar === 'function'
				? renderButtonBar()
				: typeof renderButtonBar !== 'undefined'
				? renderButtonBar
				: null}
		</div>
	);
};
