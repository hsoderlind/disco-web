import { FC } from 'react';
import { MenuProps, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useShopsContext } from '../../contexts/shops/useShopsContext';

const SettingsMenu: FC = () => {
	const { hasShops, selectedShop } = useShopsContext();
	const items: MenuProps['items'] = [
		{
			icon: <SettingOutlined style={{ fontSize: '24px' }} />,
			key: 'settings',
			theme: 'light',
			children: [
				{
					label: 'Butiksprofil',
					key: 'shop-profile'
				},
				{
					label: 'Användare',
					key: 'users'
				},
				{
					label: 'Betalningssätt',
					key: 'payment-methods'
				},
				{
					type: 'divider'
				},
				{
					label: 'Prenumeration',
					key: 'subscription'
				},
				{
					label: 'Fakturor',
					key: 'invoices'
				}
			]
		}
	];

	return <Menu disabled={!hasShops || !selectedShop} items={items} mode='horizontal' theme='dark' />;
};

export default SettingsMenu;
