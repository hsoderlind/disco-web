import { FC } from 'react';
import { MainContentLayoutProps } from './types';
import clsx from 'clsx';
import { Toolbar } from '../../toolbar';
import { Tabs } from '../../tabs/Tabs';
import { DiscogsButton } from '../../../services/discogs/components/DiscogsButton';

export const MainContentLayout: FC<MainContentLayoutProps> = ({ children, renderButtonBar, noSpacing = false }) => {
	return (
		<div className='main-content-layout'>
			<Toolbar>
				<Tabs />
				<DiscogsButton />
			</Toolbar>
			<div className={clsx('content', { 'content--no-spacing': noSpacing })}>{children}</div>
			{typeof renderButtonBar === 'function'
				? renderButtonBar()
				: typeof renderButtonBar !== 'undefined'
				? renderButtonBar
				: null}
		</div>
	);
};
