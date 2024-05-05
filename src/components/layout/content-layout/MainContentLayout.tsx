import { FC } from 'react';
import { MainContentLayoutProps } from './types';
import clsx from 'clsx';
import { Tabs } from '../../tabs/Tabs';

export const MainContentLayout: FC<MainContentLayoutProps> = ({
	children,
	renderToolbarExtraContent,
	renderButtonBar,
	noSpacing = false
}) => {
	return (
		<div className='main-content-layout'>
			<Tabs renderExtraContent={renderToolbarExtraContent} />
			<div className={clsx('content', { 'content--no-spacing': noSpacing })}>{children}</div>
			{typeof renderButtonBar === 'function'
				? renderButtonBar()
				: typeof renderButtonBar !== 'undefined'
				? renderButtonBar
				: null}
		</div>
	);
};
