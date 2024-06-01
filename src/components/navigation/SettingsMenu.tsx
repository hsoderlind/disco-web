import { FC } from 'react';
import { MenuProps, Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import { useParams } from 'react-router-dom';
import { useNavigate } from '../../hooks/useNavigate';
import { useMatches } from '../../hooks/useMatches';

const SettingsMenu: FC = () => {
	const { hasShops, selectedShop } = useShopsContext();
	const navigate = useNavigate();
	const params = useParams();
	const matches = useMatches();
	const selectedKeys = matches.filter((match) => !!match.handle?.menuKey).map((match) => match.handle?.menuKey);
	const items: MenuProps['items'] = [
		{
			icon: <SettingOutlined style={{ fontSize: '24px' }} />,
			key: 'settings',
			theme: 'light',
			children: [
				{
					label: 'Butik & bolag',
					key: 'g1',
					type: 'group',
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
						}
					]
				},
				{
					label: 'Försäljning & kassa',
					key: 'g2',
					children: [
						{
							label: 'Betalningssätt',
							key: 'payment-methods'
						},
						{
							label: 'Order total',
							key: 'orders/order-totals'
						}
					]
				},
				{
					label: 'Försäljningskanaler',
					key: 'g3',
					children: [
						{
							label: 'Discogs',
							key: 'discogs'
						}
					]
				},
				{
					type: 'divider'
				},
				{
					label: 'Prenumeration',
					key: 'g4',
					children: [
						{
							label: 'Prenumerationer',
							key: 'subscription'
						},
						{
							label: 'Fakturor',
							key: 'invoices'
						}
					]
				}
			]
		}
	];

	const onClick: MenuProps['onClick'] = (e) => {
		const uri = `/${params.urlAlias}/${e.key}`;
		navigate(uri, e.domEvent.currentTarget.innerText);
	};

	return (
		<Menu
			onClick={onClick}
			disabled={!hasShops || !selectedShop}
			items={items}
			selectedKeys={selectedKeys}
			mode='horizontal'
			theme='dark'
		/>
	);
};

export default SettingsMenu;
