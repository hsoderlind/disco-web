import { FC } from 'react';
import { MainContentLayoutProps } from './types';

export const MainContentLayout: FC<MainContentLayoutProps> = ({ children, renderButtonBar }) => {
	return (
		<div className='main-content-layout'>
			<div className='content'>{children}</div>
			{typeof renderButtonBar === 'function'
				? renderButtonBar()
				: typeof renderButtonBar !== 'undefined'
				? renderButtonBar
				: null}
		</div>
	);
};
