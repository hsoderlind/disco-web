import { FC } from 'react';
import { MenuProps, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from '../../hooks/useNavigate';

const SettingsMenu: FC = () => {
	const { hasShops, selectedShop } = useShopsContext();
	const params = useParams();
	const navigate = useNavigate();
	const items: MenuProps['items'] = [
		{
			icon: <SettingOutlined style={{ fontSize: '24px' }} />,
			key: 'settings',
			theme: 'light',
			children: [
				{
					label: 'Butiksprofil',
					key: 'profile'
				},
				{
					label: 'Företagsuppgifter',
					key: 'company'
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
					label: 'Discogs',
					key: 'discogs'
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

	const onClick: MenuProps['onClick'] = (e) => {
		const uri = `/${params.urlAlias}/${e.key}`;
		navigate(uri, e.domEvent.currentTarget.innerText);
	};

	return <Menu onClick={onClick} disabled={!hasShops || !selectedShop} items={items} mode='horizontal' theme='dark' />;
};

export default SettingsMenu;
