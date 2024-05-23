import { FC } from 'react';
import { MainContentLayoutProps } from './types';
import clsx from 'clsx';
import { Tabs } from '../../tabs/Tabs';
import { Typography } from 'antd';

export const MainContentLayout: FC<MainContentLayoutProps> = ({
	children,
	className,
	renderToolbarExtraContent,
	renderButtonBar,
	noSpacing = false,
	title
}) => {
	return (
		<div className='main-content-layout'>
			<Tabs renderExtraContent={renderToolbarExtraContent} />
			<div className={clsx('content', className, { 'content--no-spacing': noSpacing })}>
				{title && (
					<Typography.Title level={2} className={clsx({ 'pt-5': noSpacing, 'px-5': noSpacing })}>
						{title}
					</Typography.Title>
				)}
				{children}
			</div>
			{typeof renderButtonBar === 'function'
				? renderButtonBar()
				: typeof renderButtonBar !== 'undefined'
				? renderButtonBar
				: null}
		</div>
	);
};
