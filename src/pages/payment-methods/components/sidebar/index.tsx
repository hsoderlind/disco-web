import { Menu, MenuProps, Tooltip } from 'antd';
import { SidebarContentLayout } from '../../../../components/layout/content-layout/SidebarContentLayout';
import { SidebarProps } from './types';
import { useNavigate } from '../../../../hooks/useNavigate';
import { MdViewModule } from 'react-icons/md';
import { MdPayments } from 'react-icons/md';

export const Sidebar = ({ selectedItems }: SidebarProps) => {
	const navigate = useNavigate();

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'payment-methods':
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
							key: 'payment-methods',
							label: 'Betalningssätt',
							icon: (
								<Tooltip placement='right' title={shrinked ? 'Betalningssätt' : undefined}>
									<MdPayments
										style={{ fontSize: '1.25rem' }}
										{...(!shrinked ? { 'aria-hidden': true } : { 'aria-label': 'Betalningssätt' })}
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
