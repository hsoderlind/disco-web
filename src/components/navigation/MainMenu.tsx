import { Menu, MenuProps } from 'antd';
import { FC } from 'react';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useMatches } from '../../hooks/useMatches';

type OnClickType = MenuProps['onClick'];

const MainMenu: FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const matches = useMatches();
	const selectedKeys = matches.filter((match) => !!match.handle?.menuKey).map((match) => match.handle?.menuKey);

	const { hasShops, selectedShop } = useShopsContext();

	const makeUri = (key: string) => {
		return `/${params.urlAlias}/${key}`;
	};

	const onClick: OnClickType = (e) => {
		let uri = '';

		if (e.key === 'dashboard') {
			uri = '/';
		} else {
			uri = makeUri(e.key);
		}

		navigate(uri);
	};

	const items: MenuProps['items'] = [
		{
			label: 'Översiktspanelen',
			key: 'dashboard'
		},
		{
			label: 'Katalog',
			key: 'catalog',
			disabled: !hasShops || !selectedShop,
			children: [
				{
					label: 'Produkter',
					key: 'products'
				},
				{
					label: 'Kategorier',
					key: 'categories'
				},
				{
					label: 'Attribut & varianter',
					key: 'attributes'
				},
				{
					label: 'Tillverkare',
					key: 'manufacturers'
				},
				{
					label: 'Leverantörer',
					key: 'suppliers'
				}
			]
		},
		{
			label: 'Lager',
			key: 'stock',
			disabled: !hasShops || !selectedShop
		},
		{
			label: 'Kunder',
			key: 'customers-main',
			disabled: !hasShops || !selectedShop,
			children: [
				{
					label: 'Kunder',
					key: 'customers'
				},
				{
					label: 'Kundgrupper',
					key: 'customer-groups'
				}
			]
		},
		{
			label: 'Försäljning',
			key: 'sales',
			disabled: !hasShops || !selectedShop,
			children: [
				{
					label: 'Nyinkomna beställningar',
					key: 'sales?status=new'
				},
				{
					label: 'Beställningar under process',
					key: 'sales?status=processing'
				},
				{
					label: 'Levererade beställningar',
					key: 'sales?status=delivered'
				},
				{
					label: 'Historiska beställningar',
					key: 'sales?status=historic'
				}
			]
		}
	];

	return <Menu onClick={onClick} items={items} mode='horizontal' theme='dark' selectedKeys={selectedKeys} />;
};

export default MainMenu;
