import { MenuProps, Menu } from 'antd';
import { FC } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useLogout } from '../../services/auth/hooks/useLogout';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/auth/useAuthContext';

const UserMenu: FC = () => {
	const { logout } = useAuthContext();
	const navigate = useNavigate();
	const [mutationFn] = useLogout();
	const mutation = useMutation(mutationFn, {
		onSuccess: () => {
			logout();
		},
		onError: (err) => {
			console.error(err);
		}
	});

	const onClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case 'logout':
				mutation.mutate();
				navigate('/login', { replace: true });
				break;
		}
	};

	const items: MenuProps['items'] = [
		{
			// label: <Avatar size={32} icon={<UserOutlined style={{ fontSize: '24px' }} />} />,
			icon: <UserOutlined style={{ fontSize: '24px' }} />,
			key: 'user',
			theme: 'light',
			children: [
				{
					label: 'Min profil',
					key: 'profile'
				},
				{
					label: 'Logga ut',
					key: 'logout'
				}
			]
		}
	];

	return <Menu onClick={onClick} items={items} mode='horizontal' theme='dark' />;
};

export default UserMenu;
