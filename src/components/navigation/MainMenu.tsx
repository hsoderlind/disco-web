import { Menu, MenuProps } from 'antd';
import { FC } from 'react';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useMatches } from '../../hooks/useMatches';

const MainMenu: FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const matches = useMatches();
	const selectedKeys = matches.filter((match) => !!match.handle?.menuKey).map((match) => match.handle?.menuKey);

	const { hasShops, selectedShop } = useShopsContext();

	const items: MenuProps['items'] = [
		{
			label: 'Översiktspanelen',
			key: 'dashboard'
		},
		{
			label: 'Produkter',
			key: 'products',
			disabled: !hasShops || !selectedShop
		},
		{
			label: 'Kunder',
			key: 'customers',
			disabled: !hasShops || !selectedShop
		},
		{
			label: 'Försäljning',
			key: 'sales',
			disabled: !hasShops || !selectedShop
		}
	];

	const onClick: MenuProps['onClick'] = (e) => {
		let uri = '';
		switch (e.key) {
			case 'dashboard':
				uri = '/';
				break;
			case 'products':
				uri = `/${params.urlAlias}/products`;
				break;
			case 'customers':
				uri = `/${params.urlAlias}/customers`;
				break;
			case 'sales':
				uri = `/${params.urlAlias}/sales`;
				break;
		}

		navigate(uri);
	};

	return <Menu onClick={onClick} items={items} mode='horizontal' theme='dark' selectedKeys={selectedKeys} />;
};

export default MainMenu;
