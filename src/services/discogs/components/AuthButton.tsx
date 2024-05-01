import { useLocation } from 'react-router-dom';
import { useShopStore } from '../../shop/store';
import { Button, Tooltip } from 'antd';
import { Icon } from './Icon';

export const AuthButton = () => {
	const shopId = useShopStore((state) => state.shop.id);
	const location = useLocation();

	const redirectToAuth = () => {
		window.location.href = `${import.meta.env.VITE_API_BASE_URL}/discogs/auth/${shopId}?referer=${encodeURI(
			location.pathname
		)}`;
	};

	return (
		<Tooltip title='Autentisera till Discogs'>
			<Button type='text' icon={<Icon />} onClick={redirectToAuth} />
		</Tooltip>
	);
};
