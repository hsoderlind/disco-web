import { FC } from 'react';
import { ContentLayoutProps } from './types';

export const ContentLayout: FC<ContentLayoutProps> = ({ children }: ContentLayoutProps) => {
	return <div className='content-layout'>{children}</div>;
};
