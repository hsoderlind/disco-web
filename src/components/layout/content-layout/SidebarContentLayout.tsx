import { FC, useState } from 'react';
import { SidebarContentLayoutProps } from './types';
import { IonIcon } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';
import clsx from 'clsx';

export const SidebarContentLayout: FC<SidebarContentLayoutProps> = ({ children, disableShrink = false }) => {
	const [shrinked, setShrinked] = useState(false);

	return (
		<div className={clsx('sidebar-content-layout', { 'sidebar-content-layout--shrinked': shrinked })}>
			{!disableShrink && (
				<div className='sidebar-shrink'>
					<IonIcon size='small' md={arrowBackOutline} onClick={() => setShrinked((prevState) => !prevState)} />
				</div>
			)}
			{typeof children === 'function' ? children(shrinked) : children}
		</div>
	);
};
