import { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainMenu from '../components/navigation/MainMenu';
import UserMenu from '../components/navigation/UserMenu';

const MainLayout: FC = () => {
	return (
		<Layout className='main-layout'>
			<Layout.Header>
				<div className='flex flex-fill-1'>
					<div className='flex-fill-1'>
						<MainMenu />
					</div>
					<div>
						<UserMenu />
					</div>
				</div>
			</Layout.Header>
			<Layout.Content>
				<Outlet />
			</Layout.Content>
			<Layout.Footer></Layout.Footer>
		</Layout>
	);
};

export default MainLayout;
