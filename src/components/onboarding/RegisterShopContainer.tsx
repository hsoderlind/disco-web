import { FC, useState } from 'react';
import { useShopsContext } from '../../contexts/shops/useShopsContext';
import RegisterShopModal from './RegisterShopModal';
import Shop from '../../services/shop/Shop';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useFetchAllUserShops } from '../../services/shop/hooks/useFetchAllUserShops';

const RegisterShopContainer: FC = () => {
	const [open, setOpen] = useState(true);
	const { hasShops, isSuccess, isLoading } = useShopsContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [queryKey] = useFetchAllUserShops();

	const onClose = () => {
		setOpen(false);
	};

	const onAfterCreate = (shop: Shop) => {
		setOpen(false);
		queryClient.refetchQueries({ queryKey });
		navigate(shop.get<string>('url_alias')!);
	};

	if (isLoading) {
		return null;
	}

	if (isSuccess && hasShops) {
		return null;
	}

	return <RegisterShopModal open={open} onClose={onClose} onAfterCreate={onAfterCreate} />;
};

export default RegisterShopContainer;
