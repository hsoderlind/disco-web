import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: FC = () => {
	return (
		<div className='auth-layout'>
			<div className='panel'>
				<div className='logo'>
					<img src='/assets/logo_white.svg' alt={import.meta.env.VITE_APP_NAME} />
				</div>
				<div className='form'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
