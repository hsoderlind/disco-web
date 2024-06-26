import { FC } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import MainMenu from '../components/navigation/MainMenu';
import UserMenu from '../components/navigation/UserMenu';
import SettingsMenu from '../components/navigation/SettingsMenu';
import ShopsProvider from '../contexts/shops/ShopsProvider';
import ShopsMenu from '../components/navigation/ShopsMenu';
import { PostItButton } from '../components/postit/post-it-button';
import { PostItProvider } from '../components/postit/post-it-provider';
import { NotesContainer } from '../components/postit/notes-container';

const MainLayout: FC = () => {
	return (
		<ShopsProvider>
			<PostItProvider>
				<Layout className='main-layout'>
					<Layout.Header>
						<div className='flex flex-fill-1'>
							<div className='mr-4'>
								<ShopsMenu />
							</div>
							<div className='flex-fill-1'>
								<MainMenu />
							</div>
							<div>
								<SettingsMenu />
							</div>
							<div>
								<UserMenu />
							</div>
							<div>
								<PostItButton />
							</div>
						</div>
					</Layout.Header>
					<Layout.Content>
						<Outlet />
					</Layout.Content>
				</Layout>
				<NotesContainer />
			</PostItProvider>
		</ShopsProvider>
	);
};

export default MainLayout;
