import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './contexts/auth/AuthProvider';
import { App as AntdApp, ConfigProvider, notification, theme } from 'antd';
import locale from 'antd/locale/sv_SE';
import app from './lib/application-builder/ApplicationBuilder';
import useSystemTheme from './hooks/useSystemTheme';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const App: FC = () => {
	const [notificationApi, contextHolder] = notification.useNotification({
		placement: 'bottomRight',
		stack: {
			threshold: 3
		},
		duration: 10
	});
	app.setNotificationApi(notificationApi);

	const systemTheme = useSystemTheme('light');

	return (
		<>
			{contextHolder}
			<QueryClientProvider client={queryClient}>
				<ConfigProvider
					theme={{
						cssVar: true,
						algorithm: systemTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
					}}
					locale={locale}>
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
