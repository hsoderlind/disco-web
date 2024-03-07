import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import MainLayout from './layouts/MainLayout';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/shop/LandingPage';
import { OverviewPage } from './pages/products/OverviewPage';
import { LoadingPage } from './pages/shop/LoadingPage';
import { NewProductPage } from './pages/products/NewProductPage';

// const _notYetImplemented = (path?: string) => {
// 	return <div>not yet implemented{` ${path ? `@ ${path}` : ''}`}</div>;
// };

const routes = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<AuthLayout />}>
				<Route path='register' element={<Register />} />
				<Route path='login' element={<Login />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route path='reset-password' element={<ResetPassword />} />
			</Route>
			<Route element={<MainLayout />}>
				<Route path='/' element={<Dashboard />} handle={{ menuKey: 'dashboard' }} />
				<Route path='/:urlAlias' element={<LoadingPage />}>
					<Route index element={<LandingPage />} handle={{ menuKey: 'landingPage' }} />
					<Route path='products' handle={{ menuKey: 'products' }}>
						<Route index element={<OverviewPage />} />
						<Route path='new' element={<NewProductPage />} />
					</Route>
				</Route>
			</Route>
		</Route>
	)
);

export default routes;
