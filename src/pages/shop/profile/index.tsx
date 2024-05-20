import { Menu, Tooltip } from 'antd';
import { ContentLayout } from '../../../components/layout/content-layout/ContentLayout';
import { SidebarContentLayout } from '../../../components/layout/content-layout/SidebarContentLayout';
import { IonIcon } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { FileImageOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import { Details } from './details';
import { Logotypes } from './logotypes';

export function Component() {
	const [searchParams, setSearchParams] = useSearchParams({ section: 'details' });
	const section = searchParams.get('section');

	return (
		<ContentLayout>
			<SidebarContentLayout>
				{(shrinked) => (
					<Menu
						mode='inline'
						defaultSelectedKeys={[section!]}
						onClick={(e) => {
							searchParams.set('section', e.key);
							setSearchParams(searchParams);
						}}
						items={[
							{
								key: 'details',
								label: 'Uppgifter',
								icon: (
									<Tooltip placement='right' title={shrinked ? 'Uppgifter' : undefined}>
										<IonIcon
											size='small'
											md={personOutline}
											{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Uppgifter' })}
										/>
									</Tooltip>
								)
							},
							{
								key: 'logos',
								label: 'Logotyper',
								icon: (
									<Tooltip placement='right' title={shrinked ? 'Logotyper' : undefined}>
										<FileImageOutlined {...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Loogtyper' })} />
									</Tooltip>
								)
							}
						]}
					/>
				)}
			</SidebarContentLayout>
			{section === 'details' && <Details />}
			{section === 'logos' && <Logotypes />}
		</ContentLayout>
	);
}
