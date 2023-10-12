import { Menu, MenuProps } from 'antd';
import { FC } from 'react';
import { useShopsContext } from '../../contexts/shops/useShopsContext';

const MainMenu: FC = () => {
	const { hasShops } = useShopsContext();

	const items: MenuProps['items'] = [
		{
			label: 'Översiktspanelen',
			key: 'dashboard'
		},
		{
			label: 'Produkter',
			key: 'products'
		},
		{
			label: 'Kunder',
			key: 'customers'
		},
		{
			label: 'Försäljning',
			key: 'sales'
		}
	];

	const onClick: MenuProps['onClick'] = (e) => {
		console.log(e);
	};

	return (
		<Menu
			disabled={!hasShops}
			onClick={onClick}
			items={items}
			mode='horizontal'
			theme='dark'
			defaultSelectedKeys={['dashboard']}
		/>
	);
};

export default MainMenu;
