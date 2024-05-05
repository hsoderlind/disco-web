import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './contexts/auth/AuthProvider';
import { App as AntdApp, ConfigProvider, message, notification, theme } from 'antd';
import locale from 'antd/locale/sv_SE';
import app from './lib/application-builder/ApplicationBuilder';
import useSystemTheme from './hooks/useSystemTheme';

const App: FC = () => {
	const [notificationApi, contextHolder] = notification.useNotification({
		placement: 'bottomRight',
		stack: {
			threshold: 3
		},
		duration: 10
	});
	app.setNotificationApi(notificationApi);

	const [messageApi, messageContextHolder] = message.useMessage({
		duration: 5
	});
	app.setMessageApi(messageApi);

	const systemTheme = useSystemTheme('light');

	return (
		<>
			<QueryClientProvider client={app.queryClient}>
				<ConfigProvider
					theme={{
						cssVar: true,
						algorithm: systemTheme === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
						components: {
							Menu: {
								activeBarBorderWidth: 0
							},
							Tabs: {
								horizontalMargin: '0'
							}
						}
					}}
					locale={locale}>
					{contextHolder}
					{messageContextHolder}
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
