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
				<Route path='/:urlAlias'>
					<Route index element={<LandingPage />} handle={{ menuKey: 'landingPage' }} />
					<Route path='products' element={<OverviewPage />} handle={{ menuKey: 'products' }} />
				</Route>
			</Route>
		</Route>
	)
);

export default routes;
