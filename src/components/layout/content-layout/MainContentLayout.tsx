import { FC } from 'react';
import { MainContentLayoutProps } from './types';

export const MainContentLayout: FC<MainContentLayoutProps> = ({ children }) => {
	return <div className='main-content-layout'>{children}</div>;
};
