import { FC } from 'react';
import { SidebarContentLayoutProps } from './types';
import { Affix } from 'antd';

export const SidebarContentLayout: FC<SidebarContentLayoutProps> = ({ children }) => {
	return (
		<div className='sidebar-content-layout'>
			<div className='inner-wrapper'>{children}</div>
		</div>
	);
};
