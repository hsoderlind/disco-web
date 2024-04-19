import { FC } from 'react';
import { SidebarContentLayoutProps } from './types';
import { Affix } from 'antd';

export const SidebarContentLayout: FC<SidebarContentLayoutProps> = ({ children }) => {
	return (
		<Affix offsetTop={64} className='sidebar-content-layout'>
			{children}
		</Affix>
	);
};
