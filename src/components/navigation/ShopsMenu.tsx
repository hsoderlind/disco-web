import { FC, useState } from 'react';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import RegisterShopModalForm from '../modals/RegisterShopModalForm';

const ShopsMenu: FC = () => {
	const [registerShopModalOpen, setRegisterShopModalOpen] = useState(false);
	const { shops, hasShops, selectedShop, setSelectedShop } = useShopsContext();
	const navigate = useNavigate();
	const items: MenuProps['items'] = hasShops
		? shops!.map((shop) => ({
				label: shop.get<string>('name')!,
				key: shop.get<string>('url_alias')!
		  }))
		: [];

	items!.push({
		label: <Button type='primary'>Registrera ny butik</Button>,
		key: 'new'
	});

	const onClick: MenuProps['onClick'] = (item) => {
		if (item.key === 'new') {
			openRegisterShopModal();
			return;
		}

		const shop = shops?.find((entry) => entry.get<string>('url_alias') === item.key);
		setSelectedShop(shop!);
		navigate(shop!.get<string>('url_alias')!);
	};

	const openRegisterShopModal = () => {
		setRegisterShopModalOpen(true);
	};

	const closeRegisterShopModal = () => {
		setRegisterShopModalOpen(false);
	};

	return (
		<>
			<Dropdown menu={{ items, onClick }} placement='bottom' arrow={{ pointAtCenter: true }}>
				<Button>{selectedShop?.get<string>('name') ?? 'Välj butik'}</Button>
			</Dropdown>
			<RegisterShopModalForm open={registerShopModalOpen} onClose={closeRegisterShopModal} />
		</>
	);
};

export default ShopsMenu;
