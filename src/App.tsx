import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './contexts/auth/AuthProvider';
import { App as AntdApp, ConfigProvider, notification } from 'antd';
import locale from 'antd/locale/sv_SE';
import app from './lib/application-builder/ApplicationBuilder';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const App: FC = () => {
	const [notificationApi, contextHolder] = notification.useNotification({
		placement: 'bottomLeft',
		stack: {
			threshold: 3
		},
		duration: 10
	});
	app.setNotificationApi(notificationApi);

	return (
		<>
			{contextHolder}
			<QueryClientProvider client={queryClient}>
				<ConfigProvider theme={{ cssVar: true }} locale={locale}>
					<AntdApp>
						<AuthProvider>
							<RouterProvider router={routes} future={{ v7_startTransition: true }} />
						</AuthProvider>
					</AntdApp>
				</ConfigProvider>
			</QueryClientProvider>
		</>
	);
};

export default App;
