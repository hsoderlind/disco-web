import { FC } from 'react';
import { SidebarContentLayoutProps } from './types';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import clsx from 'clsx';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export const SidebarContentLayout: FC<SidebarContentLayoutProps> = ({ children, enableShrink = true }) => {
	const [sidebarState, setShrinked] = useLocalStorage<'expanded' | 'collapsed'>('sidebar', 'expanded');
	const shrinked = sidebarState === 'collapsed';

	return (
		<div className={clsx('sidebar-content-layout', { 'sidebar-content-layout--shrinked': shrinked })}>
			{enableShrink && (
				<div className='sidebar-shrink'>
					<IonIcon
						size='small'
						md={arrowBackOutline}
						onClick={() => setShrinked(shrinked ? 'expanded' : 'collapsed')}
					/>
				</div>
			)}
			{typeof children === 'function' ? children(shrinked) : children}
		</div>
	);
};
