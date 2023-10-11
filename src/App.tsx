import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './contexts/auth/AuthProvider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
});

const App: FC = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<RouterProvider router={routes} future={{ v7_startTransition: true }} />
			</AuthProvider>
		</QueryClientProvider>
	);
};

export default App;
