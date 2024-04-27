import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// const _notYetImplemented = (path?: string) => {
// 	return <div>not yet implemented{` ${path ? `@ ${path}` : ''}`}</div>;
// };

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<AuthLayout />}>
				<Route path='register' lazy={() => import('./pages/auth/Register')} />
				<Route path='login' lazy={() => import('./pages/auth/Login')} />
				<Route path='forgot-password' lazy={() => import('./pages/auth/ForgotPassword')} />
				<Route path='reset-password' lazy={() => import('./pages/auth/ResetPassword')} />
			</Route>
			<Route element={<MainLayout />}>
				<Route path='/' handle={{ menuKey: 'dashboard' }} lazy={() => import('./pages/Dashboard')} />
				<Route path='/:urlAlias' lazy={() => import('./pages/shop/LoadingPage')}>
					<Route index handle={{ menuKey: 'landingPage' }} lazy={() => import('./pages/shop/LandingPage')} />
					<Route path='products' handle={{ menuKey: 'products' }}>
						<Route index lazy={() => import('./pages/products')} />
						<Route path='new' lazy={() => import('./pages/products/new-product')} />
						<Route path=':id' lazy={() => import('./pages/products/edit-product')} />
					</Route>
				</Route>
			</Route>
		</Route>
	)
);

export default routes;
