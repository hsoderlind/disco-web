import { Menu, MenuProps, Tooltip } from 'antd';
import { SidebarProps } from './types';
import { MdViewModule } from 'react-icons/md';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { useNavigate } from '../../../../hooks/useNavigate';
import { SidebarContentLayout } from '../../../../components/layout/content-layout/SidebarContentLayout';

export const Sidebar = ({ selectedItems }: SidebarProps) => {
	const navigate = useNavigate();

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'shipping-methods':
				navigate('../', e.domEvent.currentTarget.innerText);
				break;
			case 'modules':
				navigate('./modules', e.domEvent.currentTarget.innerText);
				break;
		}
	};
	return (
		<SidebarContentLayout>
			{(shrinked) => (
				<Menu
					defaultSelectedKeys={selectedItems}
					onClick={handleClick}
					items={[
						{
							key: 'shipping-methods',
							label: 'Leveranssätt',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Leveranssätt' : undefined}>
									<MdOutlineLocalShipping
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Leveranssätt' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'modules',
							label: 'Moduler',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Moduler' : undefined}>
									<MdViewModule
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Moduler' })}
									/>
								</Tooltip>
							)
						}
					]}
				/>
			)}
		</SidebarContentLayout>
	);
};
