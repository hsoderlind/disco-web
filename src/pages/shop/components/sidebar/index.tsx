import { HiOutlineUsers } from 'react-icons/hi2';
import { SidebarContentLayout } from '../../../../components/layout/content-layout/SidebarContentLayout';
import { GrGroup } from 'react-icons/gr';
import { SiOpenaccess } from 'react-icons/si';
import { Menu, MenuProps, Tooltip } from 'antd';
import { SidebarProps } from './types';
import { useNavigate } from '../../../../hooks/useNavigate';

export const Sidebar = ({ selectedItems }: SidebarProps) => {
	const navigate = useNavigate();

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'users':
				navigate('../users', e.domEvent.currentTarget.innerText);
				break;
			case 'roles':
				navigate('../roles', e.domEvent.currentTarget.innerText);
				break;
			case 'permissions':
				navigate('../permissions', e.domEvent.currentTarget.innerText);
				break;
		}
	};

	return (
		<SidebarContentLayout>
			{(shrinked) => (
				<Menu
					mode='inline'
					defaultSelectedKeys={selectedItems}
					onClick={handleClick}
					items={[
						{
							key: 'users',
							label: 'Användare',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Användare' : undefined}>
									<HiOutlineUsers
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Användare' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'roles',
							label: 'Roller',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Roller' : undefined}>
									<GrGroup
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Roller' })}
									/>
								</Tooltip>
							)
						},
						{
							key: 'permissions',
							label: 'Behörighet',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Behörighet' : undefined}>
									<SiOpenaccess
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Behörighet' })}
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
