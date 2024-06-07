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

		navigate(uri, { state: { title: e.domEvent.currentTarget.innerText } });
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
				// {
				// 	label: 'Produktgrupper',
				// 	key: 'categories'
				// },
				// {
				// 	label: 'Attribut & varianter',
				// 	key: 'attributes'
				// },
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
			key: 'orders',
			disabled: !hasShops || !selectedShop,
			children: [
				{
					label: 'Beställningar',
					key: 'orders'
				},
				{
					label: 'Ny beställning',
					key: 'orders/create'
				},
				{
					label: 'Reservationer',
					key: 'orders/reservation'
				}
				// {
				// 	label: 'Nyinkomna beställningar',
				// 	key: 'orders?status=new'
				// },
				// {
				// 	label: 'Beställningar under process',
				// 	key: 'order?sstatus=processing'
				// },
				// {
				// 	label: 'Levererade beställningar',
				// 	key: 'orders?status=delivered'
				// },
				// {
				// 	label: 'Historiska beställningar',
				// 	key: 'orders?status=historic'
				// }
			]
		},
		{
			label: 'Kassa',
			key: 'checkout',
			disabled: !hasShops || !selectedShop
		}
	];

	return <Menu onClick={onClick} items={items} mode='horizontal' theme='dark' selectedKeys={selectedKeys} />;
};

export default MainMenu;
