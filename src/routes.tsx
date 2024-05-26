import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { RouteChange } from './components/tabs/RouteChange';

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
			<Route element={<RouteChange />}>
				<Route element={<MainLayout />}>
					<Route path='/' handle={{ menuKey: 'dashboard' }} lazy={() => import('./pages/Dashboard')} />
					<Route path='/:urlAlias' lazy={() => import('./pages/shop/LoadingPage')}>
						<Route index handle={{ menuKey: 'landingPage' }} lazy={() => import('./pages/shop/LandingPage')} />
						<Route path='profile' handle={{ menuKey: 'profile' }} lazy={() => import('./pages/shop/profile')} />
						<Route path='users' handle={{ menuKey: 'users' }} lazy={() => import('./pages/shop/users')} />
						<Route path='roles' handle={{ menuKey: 'users' }} lazy={() => import('./pages/shop/roles')} />
						<Route path='company' handle={{ menuKey: 'company' }} lazy={() => import('./pages/company')} />
						<Route path='products' handle={{ menuKey: 'products' }}>
							<Route index lazy={() => import('./pages/products')} />
							<Route path='new' lazy={() => import('./pages/products/new-product')} />
							<Route path=':id' lazy={() => import('./pages/products/edit-product')} />
						</Route>
						<Route path='customers' handle={{ menuKey: 'customers' }}>
							<Route index lazy={() => import('./pages/customers')} />
							<Route path='view/:id' lazy={() => import('./pages/customers/view')} />
						</Route>
						<Route path='discogs'>
							<Route path='search' lazy={() => import('./pages/discogs/search')} />
							<Route path='master/:id' lazy={() => import('./pages/discogs/master')} />
							<Route path='release/:id' lazy={() => import('./pages/discogs/release')} />
						</Route>
					</Route>
				</Route>
			</Route>
		</Route>
	)
);

export default routes;
